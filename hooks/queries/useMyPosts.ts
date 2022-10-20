import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Post } from '../../types/post';
import { API_URL } from '../../utils/config';

async function fetchMyPosts(userId: string) {
  const { data } = await axios.get<Post[]>(`${API_URL}/posts?userId=${userId}`);
  return data;
}

function useMyPosts(userId: string | undefined) {
  return useQuery(['myPosts', userId], () => fetchMyPosts(userId || ''), {
    enabled: !!userId,
  });
}

export { useMyPosts, fetchMyPosts };
