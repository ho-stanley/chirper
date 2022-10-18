import { Container, Text } from '@nextui-org/react';
import Link from 'next/link';
import { NextPageWithLayout } from '../../_app';

const SuccessPage: NextPageWithLayout = () => (
  <Container gap={1} css={{ mb: '$4' }}>
    <Text h2 color="success">
      Success
    </Text>
    <Text blockquote>
      You&apos;ve successfully signed up! Click <Link href="/signin">here</Link>{' '}
      to sign in.
    </Text>
  </Container>
);

export default SuccessPage;
