import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { ResponseError } from '../../types/response-error';
import { User } from '../../types/user';
import useAxios from '../useAxios';

function useDeleteUser() {
  const http = useAxios();
  const [errorMessage, setErrorMessage] = useState('');
  const deleteUserMutation = useMutation(
    async (username: string) => {
      const { data } = await http.delete<User>(`/users/${username}`);
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
    deleteUserMutation,
  };
}

export { useDeleteUser };
