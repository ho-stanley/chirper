import { Text, Textarea } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';
import { NewCommentInputs } from '../types/comment';

type CommentBoxInputs = {
  register: UseFormRegister<NewCommentInputs>;
  errors: FieldErrorsImpl<NewCommentInputs>;
};

export default function CommentBox({ register, errors }: CommentBoxInputs) {
  const { data: session } = useSession();

  return (
    <>
      <Textarea
        required
        fullWidth
        minRows={1}
        maxRows={3}
        placeholder={session?.user ? 'Write a comment' : 'Sign in to comment'}
        disabled={!session?.user}
        aria-label="Comment box"
        aria-invalid={!!errors.body?.message}
        status={errors.body?.message ? 'error' : 'default'}
        {...register('body')}
      />
      {errors.body?.message && <Text role="alert">{errors.body.message}</Text>}
    </>
  );
}
