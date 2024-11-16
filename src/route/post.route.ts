import { Request, Response, Router } from 'express';
import { TPostCreate } from '../types/post.type';
import { createPost } from '../controller/post.controller';

const router: Router = Router();

router.post(
  '/createPost',
  async (req: Request<{}, {}, TPostCreate>, res: Response) => {
    try {
      const param = req.body;
      res.json({
        success: true,
        message: 'Successfully added post',
        post: await createPost(param)
      });
    } catch (error) {
      res.json({
        success: false,
        message: error.message
      });
    }
  }
);

export default router;
