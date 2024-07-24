import express, { Application } from 'express';
import dotenv from 'dotenv';
import { loadControllers, scopePerRequest } from 'awilix-express';
import { container } from './container';
import connectDB from './database';

dotenv.config();

const app: Application = express();
const PORT: string | number = process.env.PORT || 3000;

app.use(express.json());

app.use(scopePerRequest(container));

app.use(loadControllers('controllers/*.controller.ts', { cwd: __dirname }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
