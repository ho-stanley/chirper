import { AxiosError } from 'axios';
import { useState } from 'react';
import { NewPostData, NewPostResponse } from '../types/post';
import { ResponseError } from '../types/response-error';
import useAxios from './useAxios';

export default function useNewPost() {
  const instance = useAxios();
  const [isLoading, setIsLoading] = useState(false);
  const [postData, setPostData] = useState<NewPostResponse | null>(null);
  const [error, setError] = useState('');

  const newPost = (newPostData: NewPostData) => {
    setPostData(null);
    setIsLoading(true);
    instance
      .post<NewPostResponse>('/posts', newPostData)
      .then((res) => {
        setError('');
        setPostData(res.data);
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
    data: postData,
    loading: isLoading,
    error,
    newPost,
  };
}
