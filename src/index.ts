import express, { Application } from 'express';
import routers from './route';
import { config } from './config';
const { PORT } = config;
import { connectDB } from './config/database';
const app: Application = express();

Promise.all([connectDB])
  .then(() => {
    //Express middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    //Routers
    app.use('/', routers);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Unable to build server : ${error.message}`);
  });
