import { TPost } from './post.type';

export type TUser = {
  id: string;
  name: string;
  phoneNumber: string;
  password: string;

  posts?: Array<TPost>;
};

export type TUserCreate = Omit<TUser, 'id' | 'posts'>;

export type TUpdateUser = {
  id: string;
} & Partial<TUserCreate>;

export type TUserSearch = {
  id: string;
  name: string;
};

export type TUserLogin = {
  phoneNumber: string;
  password: string;
};
