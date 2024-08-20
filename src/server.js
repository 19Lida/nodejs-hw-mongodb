import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';
import { ENV_VARS } from './constans/index.js';
import { env } from './utils/env.js';
// import contactRouter from './routers/contacts.js';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const PORT = Number(env(ENV_VARS.PORT, '3000'));
export const setupServer = () => {
  const app = express();
  app.use(cors());
  app.use(cookieParser());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use(router);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  //   app.use('/contacts', contactRouter);
  //   app.use('*', notFoundHandler);

  //   app.use(errorHandler);

  //   app.listen(PORT, () => {
  //     console.log(`Server is running on port ${PORT}`);
  //   });
};
