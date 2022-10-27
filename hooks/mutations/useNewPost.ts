import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { NewPostData, NewPostResponse } from '../../types/post';
import { ResponseError } from '../../types/response-error';
import useAxios from '../useAxios';

function useNewPost() {
  const http = useAxios();
  const [errorMessage, setErrorMessage] = useState('');
  const newPostMutation = useMutation(
    async (newPost: NewPostData) => {
      const { data } = await http.post<NewPostResponse>('/posts', newPost);
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
    newPostMutation,
  };
}

export { useNewPost };
