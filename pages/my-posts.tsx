import { Container, Text } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import ErrorIndicator from '../components/ErrorIndicator';
import LoadingIndicator from '../components/LoadingIndicator';
import PostCard from '../components/PostCard';
import PostsContainer from '../components/PostsContainer';
import { useMyPosts } from '../hooks/queries';
import { NextPageWithLayout } from './_app';

const MyPostsPage: NextPageWithLayout = () => {
  const { data: session } = useSession();
  const {
    data: posts,
    isLoading,
    isError,
  } = useMyPosts(session?.user.id || '');

  if (isLoading) return <LoadingIndicator />;
  if (isError) return <ErrorIndicator />;

  return (
    <>
      <Head>
        <title>Chirper - My posts</title>
      </Head>
      <Container gap={1} css={{ mb: '$4' }}>
        <Text h2>My posts</Text>
        <PostsContainer>
          {posts.map((post) => (
            <Link href={`/posts/${post.id}`} key={post.id}>
              <div>
                <PostCard post={post} isPressable />
              </div>
            </Link>
          ))}
        </PostsContainer>
      </Container>
    </>
  );
};

export default MyPostsPage;
