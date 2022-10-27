import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { ResponseError } from '../../types/response-error';
import { SignupData, SignupResponse } from '../../types/signup';
import { API_URL } from '../../utils/config';

async function signupUser(signupData: SignupData) {
  const { data } = await axios.post<SignupResponse>(
    `${API_URL}/users`,
    signupData
  );
  return data;
}

function useSignup() {
  const [errorMessage, setErrorMessage] = useState('');
  const signupMutation = useMutation(
    (newSignup: SignupData) => signupUser(newSignup),
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
    signupMutation,
  };
}

export { useSignup, signupUser };
