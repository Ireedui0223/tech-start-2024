import { DataTypes, Model, Sequelize } from 'sequelize';
import { TPost } from '../types/post.type';
import { UserModel } from './user.model';

export class PostModel extends Model implements TPost {
  public id!: string;
  public title!: string;
  public userId!: string;

  static associate(): void {
    this.belongsTo(UserModel, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      },
      as: 'user'
    });
  }
}

export const createPostModel = (sequelize: Sequelize) => {
  PostModel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          len: {
            args: [3, 200],
            msg: 'Title must be at least 3 characters in length'
          }
        }
      }
    },
    {
      sequelize,
      modelName: 'PostModel',
      tableName: 'Posts',
      timestamps: true
    }
  );
};
