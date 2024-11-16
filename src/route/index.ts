import { Router } from 'express';

import userRouter from './user.route';
import postRouter from './post.route';

const router: Router = Router();

router.use('/', userRouter);
router.use('/', postRouter);

export default router;
