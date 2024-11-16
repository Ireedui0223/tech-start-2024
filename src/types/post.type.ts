export type TPost = {
  id: string;
  userId: string;
  title: string;
};

export type TPostCreate = Omit<TPost, 'id'>;
