import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { User } from '../../types/user';
import { API_URL } from '../../utils/config';

async function fetchUsers() {
  const { data } = await axios.get<User[]>(`${API_URL}/users`);
  return data;
}

function useUsers() {
  return useQuery(['users'], fetchUsers);
}

export { useUsers, fetchUsers };
