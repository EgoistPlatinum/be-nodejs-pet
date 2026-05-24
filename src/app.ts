import express from 'express';
import cors from 'cors';

import router from './routes';
import { errorHandler } from './middlewares/error-handler';
import { initRedis } from './redis/redis-client';

const app = express();

app.use(cors());

app.use(router);

app.use(errorHandler);

const run = async () => {
  try {
    await initRedis();

    app.listen(8080, () => {
      console.log('Start');
    });
  } catch (error) {
    console.error('Error on server init', error);
  }
};

run();
