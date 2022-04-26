import {
  userRouter,
  taskRouter
} from '../routes';
import { Express, Request, response, Response, Router } from 'express';

export function setupRoutes(app: Express): void {
  const router = Router();
  app.use('/api/v1', router);

  router.use('/healthz', (_request: Request, response: Response) => {
    try {
      return response.status(200).send({ status: 'up' });
    } catch (error: any) {
      return response.status(error.status).send(error);
    }
  });

  router.get('/teste', (request: Request, response: Response) => {
      return response.send(200);
    });
  router.use('/task/', taskRouter);
  router.use('/user/', userRouter);
}
