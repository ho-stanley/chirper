import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Card,
  Container,
  Loading,
  Spacer,
  Text,
} from '@nextui-org/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useSWR, { SWRConfig, useSWRConfig } from 'swr';
import CommentBox from '../../components/CommentBox';
import CommentCard from '../../components/CommentCard';
import CommentsContainer from '../../components/CommentsContainer';
import ErrorIndicator from '../../components/ErrorIndicator';
import LoadingIndicator from '../../components/LoadingIndicator';
import NotFoundIndicator from '../../components/NotFoundIndicator';
import PostCard from '../../components/PostCard';
import useNewComment from '../../hooks/useNewComment';
import { NewCommentInputs } from '../../types/comment';
import { Post as PostType } from '../../types/post';
import { API_URL } from '../../utils/config';
import { fetcher } from '../../utils/http/axios-http';
import { newCommentSchema } from '../../utils/validation-schema';
import { NextPageWithLayout } from '../_app';

const URL = `${API_URL}/posts`;
type PostProps = {
  fallback: {
    [key: string]: PostType;
  };
};

function Post() {
  const router = useRouter();
  const { id } = router.query;
  const { mutate } = useSWRConfig();
  const {
    data: post,
    error: postError,
    isValidating,
  } = useSWR<PostType>(`${URL}/${id}?comments=true`, fetcher);
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<NewCommentInputs>({ resolver: zodResolver(newCommentSchema) });
  const {
    data: commentData,
    error: commentError,
    loading: commentLoading,
    newComment,
  } = useNewComment();

  // Refetch comments after a new comment was posted
  useEffect(() => {
    if (commentData) mutate(`${URL}/${id}?comments=true`);
  }, [mutate, id, commentData]);

  if (postError) return <ErrorIndicator />;
  if (!post && isValidating) return <LoadingIndicator />;
  if (!post) return <NotFoundIndicator />;

  const onSubmit: SubmitHandler<NewCommentInputs> = (newCommentData) => {
    newComment(newCommentData, id?.toString());
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
        {commentError && (
          <Text blockquote color="error">
            {commentError}
          </Text>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <CommentBox register={register} errors={errors} />
          <Spacer y={0.25} />
          <Button
            type="submit"
            auto
            css={{ ml: 'auto' }}
            disabled={commentLoading}
          >
            {commentLoading ? (
              <Loading color="currentColor" />
            ) : (
              <span>Reply</span>
            )}
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
}

const PostPage: NextPageWithLayout<PostProps> = ({ fallback }) => (
  <SWRConfig value={{ fallback }}>
    <Post />
  </SWRConfig>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { id } = context.query;
    const postUrl = `${URL}/${id}?comments=true`;
    const post = await fetcher<PostType>(postUrl);

    return {
      props: {
        fallback: {
          [postUrl]: post,
        },
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default PostPage;
