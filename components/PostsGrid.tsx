import { styled } from '@nextui-org/react';

const PostsGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',

  '@sm': {
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: '$10',
  },
});

export default PostsGrid;
