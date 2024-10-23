import express from 'express';
import arloRoutes from './routes/arloRoutes';
import Logger from './utils/logger';
import config from './config/config';

const app = express();

app.use(express.json());
app.use('/webhook', arloRoutes); // Use arloRoutes for /webhook path

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => {
    Logger.info(`Server running on port ${config.port}`);
  });
}

export default app;
