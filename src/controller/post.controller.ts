import { PostModel } from '../model/post.model';
import { TPost, TPostCreate } from '../types/post.type';

export const createPost = async (doc: TPostCreate): Promise<TPost> => {
  const { title, userId } = doc;
  if (!title) {
    throw new Error('Title is required');
  }
  if (!userId) {
    throw new Error('userId is required');
  }
  return await PostModel.create(doc);
};
