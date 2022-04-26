import express from 'express';
//import { setupMiddlewares } from './';
import { setupRoutes } from './';
// import { datePrototypeConfig } from './';
import { config } from 'dotenv';
config();

// datePrototypeConfig();

const app = express();

//setupMiddlewares(app);

setupRoutes(app);

export { app };
