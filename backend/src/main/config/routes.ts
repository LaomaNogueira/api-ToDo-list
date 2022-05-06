import {
  userRouter,
  taskRouter
} from '../routes';
import { Express, Request, response, Response, Router } from 'express';

export function setupRoutes(app: Express): void {
  const router = Router();

  app.use('/api/v1', router);

  router.use('/task/', taskRouter);
  router.use('/user/', userRouter);
}
