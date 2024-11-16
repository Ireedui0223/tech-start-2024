import { Request, Response, Router } from 'express';
import { TUserCreate, TUserLogin } from '../types/user.type';
import {
  createUser,
  getUser,
  login,
  verifyToken
} from '../controller/user.controller';

const router: Router = Router();

router.post(
  '/createUser',
  async (req: Request<{}, {}, TUserCreate, {}>, res: Response) => {
    try {
      const param = req.body;
      const user = await createUser(param);
      res.json({
        success: true,
        message: 'Successfully added user',
        user
      });
    } catch (error) {
      res.json({
        success: false,
        message: error.message
      });
    }
  }
);

router.post(
  '/login',
  async (req: Request<{}, {}, TUserLogin, {}>, res: Response) => {
    try {
      const param = req.body;
      const { token, user } = await login(param);
      res.json({
        success: true,
        message: 'Successfully logged in',
        user,
        token
      });
    } catch (error) {
      res.json({
        success: false,
        message: error.message
      });
    }
  }
);

router.get(
  '/getUser',
  async (req: Request<{}, {}, {}, { id: string }>, res: Response) => {
    try {
      const param = req.query;
      const header = req.headers;
      const authorization = header.authorization;
      console.log(authorization, 'authorization');
      if (!authorization) {
        throw new Error('Нэвтрэх хэрэгтэй');
      }
      console.log(header, 'header');
      res.json({
        success: true,
        message: 'Successfully fetched user',
        user: await getUser(param)
      });
    } catch (error) {
      res.json({
        success: false,
        message: error.message
      });
    }
  }
);

router.get('/currentUser', async (req: Request, res: Response) => {
  try {
    const header = req.headers;
    const authorization = header.authorization;
    console.log(authorization, 'authorization');
    if (!authorization) {
      throw new Error('Нэвтрэх хэрэгтэй');
    }
    res.json({
      success: true,
      message: 'Successfully fetched user',
      user: await verifyToken(authorization)
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
});

export default router;
