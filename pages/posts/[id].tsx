import { Card, Container, Spacer, Text } from '@nextui-org/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR, { SWRConfig } from 'swr';
import CommentCard from '../../components/CommentCard';
import CommentsContainer from '../../components/CommentsContainer';
import ErrorIndicator from '../../components/ErrorIndicator';
import LoadingIndicator from '../../components/LoadingIndicator';
import PostCard from '../../components/PostCard';
import { Post as PostType } from '../../typings/post';
import { API_URL } from '../../utils/config';
import { fetcher } from '../../utils/http/axios-http';
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
  const { data: post, error } = useSWR<PostType>(
    `${URL}/${id}?comments=true`,
    fetcher
  );

  if (error) return <ErrorIndicator />;
  if (!post) return <LoadingIndicator />;

  return (
    <>
      <Head>
        <title>Chirper - Post</title>
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
        <Text
          h4
          css={{
            pt: '$4',
          }}
        >
          Comments
        </Text>
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
