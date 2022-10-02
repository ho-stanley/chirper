/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { Credentials } from '../../types/auth/credentials';
import { SignInResponse } from '../../types/auth/signin-response';
import { API_URL } from '../config';

export const fetcher = <T>(url: string) =>
  axios.get<T>(url).then((res) => res.data);

/**
 * POST requests do not use SWR because it doesn't support
 * one-off request such as POST at the moment.
 */

export const signIn = (data: Credentials) =>
  axios
    .post<SignInResponse>(`${API_URL}/auth/login`, data)
    .then((res) => res.data);
