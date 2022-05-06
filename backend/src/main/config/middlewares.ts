import { Express } from 'express';
import { bodyParser, contentType, cors, xPoweredBy } from '../middlewares';

export function setupMiddlewares(app: Express): void {
  app.use(bodyParser);
  //app.use(cors());
  app.use(contentType);
  //app.use(xPoweredBy);
}
