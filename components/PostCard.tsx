import { Card, Text } from '@nextui-org/react';
import { format } from 'date-fns';
import { Post } from '../typings/post';

type PostCardProps = {
  post: Post;
  isPressable?: boolean;
};

export default function PostCard({ post, isPressable = false }: PostCardProps) {
  const { authorName, createdAt, title, body } = post;

  return (
    <Card isPressable={isPressable}>
      <Card.Header>
        <Text b>{authorName}</Text>
        <Text css={{ ml: 'auto' }}>
          {format(new Date(createdAt), 'yyyy-MM-dd HH:mm:ss')}
        </Text>
      </Card.Header>
      <Card.Divider />
      <Card.Body>
        <Text b>{title}</Text>
        <Text>{body}</Text>
      </Card.Body>
    </Card>
  );
}
