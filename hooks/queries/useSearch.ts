import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Post } from '../../types/post';
import { API_URL } from '../../utils/config';

async function searchPosts(keyword: string) {
  const { data } = await axios.get<Post[]>(
    `${API_URL}/posts?keyword=${keyword}`
  );
  return data;
}

function useSearch(keyword: string) {
  return useQuery(['search', keyword], () => searchPosts(keyword), {
    enabled: keyword !== '',
  });
}

export { useSearch };
