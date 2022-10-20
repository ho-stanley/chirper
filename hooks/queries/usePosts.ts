import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Post } from '../../types/post';
import { API_URL } from '../../utils/config';

async function fetchPosts(limit = 10) {
  const { data } = await axios.get<Post[]>(`${API_URL}/posts?limit=${limit}`);
  return data;
}

function usePosts(limit: number) {
  return useQuery(['posts', limit], () => fetchPosts(limit));
}

export { usePosts, fetchPosts };
