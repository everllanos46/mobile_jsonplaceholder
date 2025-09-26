import { Comentary } from "../lib/Comentary";
import { Post } from "../lib/Post";
import { User } from "../lib/User";

export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'https://jsonplaceholder.typicode.com';


async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export const api = {
  getUsers: () => request<User[]>('/users'),

  getUser: (id: number) => request<User>(`/users/${id}`),

  getPosts: () => request<Post[]>('/posts'),

  getPostsByUser: (userId: number) =>
    request<Post[]>(`/posts?userId=${userId}`),

  getPost: (id: number) => request<Post>(`/posts/${id}`),

  getComments: (postId: number) =>
    request<Comentary[]>(`/posts/${postId}/comments`),
};