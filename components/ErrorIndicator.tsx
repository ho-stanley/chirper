import { Container, Row, Text } from '@nextui-org/react';

export default function ErrorIndicator() {
  return (
    <Container gap={1}>
      <Row justify="center">
        <Text h4>An error has occurred</Text>
      </Row>
    </Container>
  );
}
