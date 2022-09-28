import axios from 'axios';
import { useSession } from 'next-auth/react';
import { API_URL } from '../utils/config';

/**
 * This hook is useful if you need to make requests
 * requiring an access token. The authorization token is
 * already included in the header if user is signed in.
 *
 * Base URL is set to environment variable {NEXT_PUBLIC_API_URL}.
 */
export default function useAxios() {
  const { data: session } = useSession();

  return axios.create({
    baseURL: API_URL,
    headers: {
      authorization: `Bearer ${session?.user.accessToken}` || '',
    },
  });
}
