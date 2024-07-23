import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const PORT: string | number = process.env.PORT || 3000;
const MONGO_DB_URI: string =
  process.env.MONGO_DB_URI || 'mongodb://localhost:27017/daily-trends';

mongoose
  .connect(MONGO_DB_URI)
  .then(() => console.log('DB is connected'))
  .catch((err) => console.error(err));

app.use(express.json());

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});
