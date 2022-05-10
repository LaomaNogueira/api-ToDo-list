import { Express } from 'express';
import { bodyParser, contentType } from '../middlewares';

export function setupMiddlewares(app: Express): void {
  app.use(bodyParser);
  app.use(contentType);
}
