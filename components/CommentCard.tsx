import { Card, Text } from '@nextui-org/react';
import { format } from 'date-fns';
import { Comment } from '../types/comment';

type CommentCardProps = {
  comment: Comment;
};

export default function CommentCard({ comment }: CommentCardProps) {
  const { authorName, body, createdAt } = comment;

  return (
    <Card variant="flat">
      <Card.Header>
        <Text b>{authorName}</Text>
        <Text css={{ ml: 'auto' }}>
          {format(new Date(createdAt), 'yyyy-MM-dd HH:mm:ss')}
        </Text>
      </Card.Header>
      <Card.Divider />
      <Card.Body>
        <Text>{body}</Text>
      </Card.Body>
    </Card>
  );
}
