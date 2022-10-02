import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { ResponseError } from '../types/response-error';
import { SignupData, SignupResponse } from '../types/signup';
import { API_URL } from '../utils/config';

export default function useSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<SignupResponse | null>(null);
  const [error, setError] = useState('');

  const signup = (signupData: SignupData) => {
    setIsLoading(true);
    axios
      .post<SignupResponse>(`${API_URL}/users`, signupData)
      .then((res) => setUserData(res.data))
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
    data: userData,
    loading: isLoading,
    error,
    signup,
  };
}
