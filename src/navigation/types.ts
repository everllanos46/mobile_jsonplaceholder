export type PostsStackParamList = {
  PostsList: undefined;
  PostDetail: { id: number };
};

export type UsersStackParamList = {
  UsersList: undefined;
  UserDetail: { id: number };
  PostDetail: { id: number };
};