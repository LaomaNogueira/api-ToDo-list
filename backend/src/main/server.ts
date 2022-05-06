import 'reflect-metadata';
import { app } from './config/app';
import '../infra/database';

app.listen(process.env.NODE_PORT, async () => {
  console.log(`Server running at http://localhost:${process.env.NODE_PORT}`);
});
