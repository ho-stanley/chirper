import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Post } from '../../types/post';
import { API_URL } from '../../utils/config';

async function fetchPost(postId: string) {
  const { data } = await axios.get<Post | null>(
    `${API_URL}/posts/${postId}?comments=true`
  );
  return data;
}

function usePost(postId: string) {
  return useQuery(['post', postId], () => fetchPost(postId));
}

export { usePost, fetchPost };
