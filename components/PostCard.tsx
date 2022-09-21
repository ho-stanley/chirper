import { Card, Text } from '@nextui-org/react';
import { Post } from '../typings/post';

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  const { authorName, createdAt, title, body } = post;

  return (
    <Card isPressable>
      <Card.Header>
        <Text b>{authorName}</Text>
        <Text css={{ ml: 'auto' }}>{createdAt}</Text>
      </Card.Header>
      <Card.Divider />
      <Card.Body>
        <Text b>{title}</Text>
        <Text>{body}</Text>
      </Card.Body>
    </Card>
  );
}
