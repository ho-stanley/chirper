import { styled } from '@nextui-org/react';

const PostsGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$10',

  '@sm': {
    gridTemplateColumns: '1fr 1fr',
    gap: '$10',
  },
});

export default PostsGrid;
