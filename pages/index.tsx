import React, { ReactElement } from 'react';
import Head from 'next/head';
import { Container, Spacer, Text } from '@nextui-org/react';
import { GetServerSideProps } from 'next';
import useSWR, { SWRConfig } from 'swr';
import Link from 'next/link';
import Layout from '../components/Layout';
import type { NextPageWithLayout } from './_app';
import PostCard from '../components/PostCard';
import { Post } from '../typings/post';
import { API_URL } from '../utils/config';
import { fetcher } from '../utils/http/axios-http';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorIndicator from '../components/ErrorIndicator';
import PostsGrid from '../components/PostsGrid';

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
    <Container gap={1}>
      <Text h2>Recent posts</Text>
      <PostsGrid>
        {posts.map((post, index) => (
          <Link href={`/posts/${post.id}`} key={post.id}>
            <div>
              <PostCard post={post} />
              {index !== posts.length - 1 && <Spacer y={1} />}
            </div>
          </Link>
        ))}
      </PostsGrid>
    </Container>
  );
}

const Page: NextPageWithLayout<PageProps> = ({ fallback }) => (
  <SWRConfig value={{ fallback }}>
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

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Head>
        <title>Chirper - Home</title>
      </Head>
      <Layout>{page}</Layout>
    </>
  );
};

export default Page;
