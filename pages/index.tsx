import React from 'react';
import Head from 'next/head';
import { Container, Text } from '@nextui-org/react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { NextPageWithLayout } from './_app';
import PostCard from '../components/PostCard';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorIndicator from '../components/ErrorIndicator';
import PostsContainer from '../components/PostsContainer';
import { fetchPosts, usePosts } from '../hooks/queries';

function RecentPosts() {
  const { data: posts, isLoading, isError } = usePosts(10);

  if (isLoading) return <LoadingIndicator />;
  if (isError) return <ErrorIndicator />;

  return (
    <Container gap={1} css={{ mb: '$4' }}>
      <Text h2>Recent posts</Text>
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
  );
}

const Page: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Chirper - Home</title>
    </Head>
    <RecentPosts />
  </>
);

export const getServerSideProps: GetServerSideProps = async () => {
  const limit = 10;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['posts', limit], () => fetchPosts(limit));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Page;
