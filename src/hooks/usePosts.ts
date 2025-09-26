import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import { Post } from '../lib/Post';
import { Comentary } from '../lib/Comentary';

export function useAllPosts() {
  return useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: api.getPosts,
  });
}

export function usePostsByUser(userId: number) {
  return useQuery<Post[]>({
    queryKey: ['postsUser', userId],
    queryFn: () => api.getPostsByUser(userId),
  });
}

export function usePost(id: number) {
  return useQuery<Post>({
    queryKey: ['post', id],
    queryFn: () => api.getPost(id),
  });
}

export function useComments(postId: number) {
  return useQuery<Comentary[]>({
    queryKey: ['comments', postId],
    queryFn: () => api.getComments(postId),
  });
}
