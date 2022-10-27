import axios from 'axios';
import { Credentials } from '../../types/auth/credentials';
import { SignInResponse } from '../../types/auth/signin-response';
import { API_URL } from '../config';

export const signIn = (data: Credentials) =>
  axios
    .post<SignInResponse>(`${API_URL}/auth/login`, data)
    .then((res) => res.data);
