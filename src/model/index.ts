import { createPostModel, PostModel } from './post.model';
import { UserModel, createUserModel } from './user.model';

export const setupModel = async (sequelize): Promise<void> => {
  createUserModel(sequelize);
  createPostModel(sequelize);

  UserModel.associate();
  PostModel.associate();
};
