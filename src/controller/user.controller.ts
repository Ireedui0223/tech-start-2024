import { PostModel } from '../model/post.model';
import { UserModel } from '../model/user.model';
import { TUser, TUserCreate, TUserLogin } from '../types/user.type';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config';
const { JWT_SECRET } = config;

export const createUser = async (doc: TUserCreate): Promise<TUser> => {
  const { name, password, phoneNumber } = doc;
  if (!name) {
    throw new Error('Name is required');
  }
  if (!password) {
    throw new Error('Password is required');
  }
  if (!phoneNumber) {
    throw new Error('phoneNumber is required');
  }
  console.log('iim id tai hun user nemlee');
  const existedUser = await UserModel.findOne({
    where: {
      phoneNumber
    }
  });
  if (existedUser) {
    throw new Error('User already exists from controller');
  }

  return await UserModel.create(doc);
};

export const getUser = async (doc: { id: string }): Promise<TUser> => {
  const { id } = doc;
  const user = await UserModel.findByPk(id, {
    include: [
      {
        model: PostModel,
        as: 'posts'
      }
    ]
  });
  if (!user) {
    throw new Error('User not found');
  }
  (user.posts || []).map((post) => {
    console.log(post.title);
  });
  return user;
};

export const login = async (
  doc: TUserLogin
): Promise<{ user: TUser; token: string }> => {
  const { password, phoneNumber } = doc;
  if (!password) {
    throw new Error('Password is required');
  }
  if (!phoneNumber) {
    throw new Error('phoneNumber is required');
  }

  const user = await UserModel.scope('withPassword').findOne({
    where: { phoneNumber }
  });
  if (!user) {
    throw new Error('User not found');
  }
  const isCorrect = await bcrypt.compare(password, user.password);
  if (!isCorrect) {
    throw new Error('Password is incorrect');
  }
  const token = await jwt.sign({ id: user.id }, JWT_SECRET);
  return { user, token };
};

export const verifyToken = async (token: string): Promise<TUser> => {
  const { id }: { id: string } = jwt.verify(token, JWT_SECRET);
  const user = await UserModel.findByPk(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};
