import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { ResponseError } from '../../types/response-error';
import { NewUserData, User } from '../../types/user';
import useAxios from '../useAxios';

function useNewUser() {
  const http = useAxios();
  const [errorMessage, setErrorMessage] = useState('');
  const newUserMutation = useMutation(
    async (newUser: NewUserData) => {
      const { data } = await http.post<User>('/admin/users', newUser);
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
    newUserMutation,
  };
}

export { useNewUser };
