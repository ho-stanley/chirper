import Head from 'next/head';
import { NextPageWithLayout } from './_app';

const FallbackPage: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Chirper - Offline</title>
    </Head>
    <h2>
      Could not connect to Chirper, please check your connection or try again
      later.
    </h2>
  </>
);

export default FallbackPage;
