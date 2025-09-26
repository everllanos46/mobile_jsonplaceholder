import { useQuery } from '@tanstack/react-query';
import { api } from '../api';

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: api.getUsers,
  });
}

export function useUser(id: number) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => api.getUser(id),
  });
}
