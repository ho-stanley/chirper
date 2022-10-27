import { Container, Row, Text } from '@nextui-org/react';

export default function NotFoundIndicator() {
  return (
    <Container gap={1}>
      <Row justify="center">
        <Text h4>Page could not be found.</Text>
      </Row>
    </Container>
  );
}
