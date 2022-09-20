import { ReactElement } from 'react';
import Head from 'next/head';
import { Text } from '@nextui-org/react';
import Layout from '../components/Layout';
import type { NextPageWithLayout } from './_app';

const Page: NextPageWithLayout = () => (
  <div>
    <Text h1>Home</Text>
  </div>
);

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
