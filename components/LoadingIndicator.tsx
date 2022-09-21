import { Container, Loading, Row } from '@nextui-org/react';

export default function LoadingIndicator() {
  return (
    <Container gap={1}>
      <Row justify="center">
        <Loading />
      </Row>
    </Container>
  );
}
