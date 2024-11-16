import { DataTypes, Model, Sequelize } from 'sequelize';
import { TUser } from '../types/user.type';
import { PostModel } from './post.model';
import { TPost } from '../types/post.type';

import bcrypt from 'bcrypt';
import { config } from '../config';
const { HASH_SALT } = config;

export class UserModel extends Model implements TUser {
  public id!: string;
  public name!: string;
  public password!: string;
  public phoneNumber!: string;

  public posts?: TPost[];
  static associate(): void {
    this.hasMany(PostModel, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      },
      as: 'posts'
    });
  }
}

export const createUserModel = (sequelize: Sequelize) => {
  UserModel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          len: {
            args: [3, 200],
            msg: 'Name must be at least 3 characters in length'
          }
        }
      },
      phoneNumber: {
        type: DataTypes.STRING(8),
        allowNull: false,
        validate: {
          len: {
            args: [8, 8],
            msg: 'Phone number has to be 8 characters'
          }
        },
        unique: {
          name: 'phoneNumber',
          msg: 'Phone number already exists'
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [8, 200],
            msg: 'Password must be at least 8 characters in length'
          }
        }
      }
    },
    {
      sequelize,
      defaultScope: {
        attributes: {
          exclude: ['password']
        }
      },
      scopes: {
        withPassword: {
          attributes: {
            exclude: []
          }
        }
      },
      modelName: 'UserModel',
      tableName: 'Users',
      timestamps: true
    }
  );
  UserModel.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, HASH_SALT);
    user.password = hashedPassword;
  });
};
