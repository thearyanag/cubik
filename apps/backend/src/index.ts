import cors from 'cors';
import express, { Express } from 'express';
import logger from './middleware/logger';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import { tokenRouter , uploadRouter } from 'routes';


config();

const PORT = process.env.PORT || 8000;
const basePath = '/api/v1';

const app: Express = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use(basePath + '/token', tokenRouter);
app.use(basePath + '/upload', uploadRouter);

const server = app.listen(PORT, () => {
  logger.log('info', `Server is running on Port:${PORT}`);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received.');
  logger.info('Closing server.');
  server.close((err) => {
    logger.info('Server closed.');
    // eslint-disable-next-line no-process-exit
    process.exit(err ? 1 : 0);
  });
});
