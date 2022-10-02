import { Container } from '@nextui-org/react';
import { ReactNode } from 'react';

type FormContainerProps = {
  children: ReactNode;
};

/**
 * This is used to contain and center form pages.
 */
export default function FormContainer({ children }: FormContainerProps) {
  return (
    <Container
      gap={1}
      display="flex"
      direction="column"
      alignContent="center"
      css={{ mb: '$4' }}
    >
      {children}
    </Container>
  );
}
