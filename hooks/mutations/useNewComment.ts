import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { NewCommentData, NewCommentResponse } from '../../types/comment';
import { ResponseError } from '../../types/response-error';
import useAxios from '../useAxios';

interface NewCommentVariables {
  newComment: NewCommentData;
  postId: string;
}

function useNewComment() {
  const http = useAxios();
  const [errorMessage, setErrorMessage] = useState('');
  const newCommentMutation = useMutation(
    async ({ newComment, postId = '' }: NewCommentVariables) => {
      const { data } = await http.post<NewCommentResponse>(
        `/posts/${postId}/comments`,
        newComment
      );
      return data;
    },
    {
      onMutate: () => {
        setErrorMessage('');
      },
      onError: (e: AxiosError) => {
        if (e.response) {
          const error = e.response.data as ResponseError;
          setErrorMessage(error.message);
        } else {
          setErrorMessage(e.message);
        }
      },
    }
  );

  return {
    errorMessage,
    newCommentMutation,
  };
}

export { useNewComment };
