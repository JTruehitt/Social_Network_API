import express from 'express';
const router = express.Router();
import userRouter from './user-routes.js';
import thoughtRouter from './thought-routes.js';

router.use('/users', userRouter);
router.use('/thoughts', thoughtRouter);

export default router;