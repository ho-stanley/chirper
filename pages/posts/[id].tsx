import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, Container, Spacer, Text } from '@nextui-org/react';
import { dehydrate, QueryClient, useQueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import CommentBox from '../../components/CommentBox';
import CommentCard from '../../components/CommentCard';
import CommentsContainer from '../../components/CommentsContainer';
import ErrorIndicator from '../../components/ErrorIndicator';
import LoadingIndicator from '../../components/LoadingIndicator';
import NotFoundIndicator from '../../components/NotFoundIndicator';
import PostCard from '../../components/PostCard';
import { useNewComment } from '../../hooks/mutations';
import { fetchPost, usePost } from '../../hooks/queries';
import { NewCommentInputs } from '../../types/comment';
import { newCommentSchema } from '../../utils/validation-schema';
import { NextPageWithLayout } from '../_app';

const PostPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const postId = id!.toString();
  const {
    data: post,
    isLoading: postIsLoading,
    isError: postIsError,
  } = usePost(postId);
  const {
    errorMessage: commentErrorMsg,
    newCommentMutation: { isLoading: commentIsLoading, mutate },
  } = useNewComment();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<NewCommentInputs>({ resolver: zodResolver(newCommentSchema) });
  const queryClient = useQueryClient();

  if (postIsLoading) return <LoadingIndicator />;
  if (!post) return <NotFoundIndicator />;
  if (postIsError) return <ErrorIndicator />;

  const onSubmit: SubmitHandler<NewCommentInputs> = (newCommentData) => {
    mutate(
      { newComment: newCommentData, postId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['post', postId]);
        },
      }
    );
    resetField('body');
  };

  return (
    <>
      <Head>
        <title>Chirper - {post.title}</title>
      </Head>
      <Container
        gap={1}
        css={{
          mb: '$4',
          '@sm': {
            maxWidth: '50%',
          },
        }}
      >
        <Spacer y={1} />
        <PostCard post={post} />
        <Spacer y={0.5} />
        {commentErrorMsg && (
          <Text blockquote color="error">
            {commentErrorMsg}
          </Text>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <CommentBox register={register} errors={errors} />
          <Spacer y={0.25} />
          <Button
            type="submit"
            auto
            css={{ ml: 'auto' }}
            disabled={commentIsLoading}
          >
            Reply
          </Button>
        </form>
        <Text h4>Comments</Text>
        {post.comments!.length > 0 ? (
          <CommentsContainer>
            {post.comments?.map((comment) => (
              <CommentCard comment={comment} key={comment.id} />
            ))}
          </CommentsContainer>
        ) : (
          <Card variant="flat">
            <Card.Body>No comments</Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const postId = id!.toString();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['post', postId], () => fetchPost(postId));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default PostPage;
