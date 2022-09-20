import { styled } from '@nextui-org/react';

const Box = styled('div', {
  margin: 'auto',
  width: '100%',

  '@sm': {
    width: '65%',
  },
  '@md': {
    width: '50%',
  },
});

export default Box;
