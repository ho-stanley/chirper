import { Container, Row, Text } from '@nextui-org/react';

export default function NotFoundIndicator() {
  return (
    <Container gap={1}>
      <Row justify="center">
        <Text h4>It seems this page isn&apos;t available...</Text>
      </Row>
    </Container>
  );
}
