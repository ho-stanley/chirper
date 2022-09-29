import { AxiosError } from 'axios';
import { useState } from 'react';
import { NewCommentData, NewCommentResponse } from '../types/comment';
import { ResponseError } from '../types/response-error';
import useAxios from './useAxios';

export default function useNewComment() {
  const instance = useAxios();
  const [isLoading, setIsLoading] = useState(false);
  const [commentData, setCommentData] = useState<NewCommentResponse | null>(
    null
  );
  const [error, setError] = useState('');

  const newComment = (newCommentData: NewCommentData, postId: string = '') => {
    setCommentData(null);
    setIsLoading(true);
    instance
      .post<NewCommentResponse>(`/posts/${postId}/comments`, newCommentData)
      .then((res) => {
        setError('');
        setCommentData(res.data);
      })
      .catch((e: AxiosError) => {
        if (e.response) {
          const errorData = e.response.data as ResponseError;
          setError(errorData.message);
        } else if (e.request) {
          setError('No response from server');
        } else {
          setError('Unexpected error');
        }
      })
      .finally(() => setIsLoading(false));
  };

  return {
    data: commentData,
    loading: isLoading,
    error,
    newComment,
  };
}
