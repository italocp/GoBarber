import 'reflect-metadata';

import express, { json, Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';
import './database';

const app = express();
app.use(json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, _req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      massage: err.massage,
    });
  }
  return res.status(500).json({
    status: 'error',
    massage: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('🚀Server started as port 3333🚀');
});
