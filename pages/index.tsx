import React from 'react';
import Head from 'next/head';
import { Container, Text } from '@nextui-org/react';
import { GetServerSideProps } from 'next';
import useSWR, { SWRConfig } from 'swr';
import Link from 'next/link';
import type { NextPageWithLayout } from './_app';
import PostCard from '../components/PostCard';
import { Post } from '../typings/post';
import { API_URL } from '../utils/config';
import { fetcher } from '../utils/http/axios-http';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorIndicator from '../components/ErrorIndicator';
import PostsContainer from '../components/PostsContainer';

const COUNT = 10;
const URL = `${API_URL}/posts?limit=${COUNT}`;
type PageProps = {
  fallback: {
    [key: string]: Post[];
  };
};

function RecentPosts() {
  const { data: posts, error } = useSWR<Post[]>(URL, fetcher);

  if (error) return <ErrorIndicator />;
  if (!posts) return <LoadingIndicator />;

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

const Page: NextPageWithLayout<PageProps> = ({ fallback }) => (
  <SWRConfig value={{ fallback }}>
    <Head>
      <title>Chirper - Home</title>
    </Head>
    <RecentPosts />
  </SWRConfig>
);

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await fetcher<Post[]>(URL);

  return {
    props: {
      fallback: {
        [URL]: posts,
      },
    },
  };
};

export default Page;
