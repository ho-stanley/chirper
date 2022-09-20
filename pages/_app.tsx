/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable comma-dangle */
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';

export type NextPageWithLayout = NextPage & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  return getLayout(
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}
