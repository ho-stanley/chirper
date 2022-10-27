import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { ResponseError } from '../../types/response-error';
import Role from '../../types/role.enum';
import { User } from '../../types/user';
import useAxios from '../useAxios';

interface RoleChangeVariables {
  username: string;
  role: Role;
}

function useRoleChange() {
  const http = useAxios();
  const [errorMessage, setErrorMessage] = useState('');
  const roleChangeMutation = useMutation(
    async ({ username, role }: RoleChangeVariables) => {
      const { data } = await http.patch<User>(`/users/${username}/role`, {
        role,
      });
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
    roleChangeMutation,
  };
}

export { useRoleChange };
