import { Sequelize } from 'sequelize';
import { config } from '.';
import { setupModel } from '../model';

const { DATABASE_NAME, DATABASE_PASSWORD, DATABASE_USERNAME } = config;

const sequelize: Sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  database: DATABASE_NAME,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  logging: false
});

export const connectDB = new Promise((resolve, reject) => {
  sequelize
    .authenticate()
    .then(() => {
      console.log('Data base synced');
      setupModel(sequelize);
      sequelize.sync({
        alter: true,
        force: false,
        logging: false
      });
      resolve('Database synced');
    })
    .catch((error) => {
      reject(new Error(`Unable to sync database : ${error.message}`));
    });
});

export default sequelize;
