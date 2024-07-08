import express from 'express';
import bodyParser from 'body-parser';
import pool from './config/database';
import authRoutes from './routes/authRoutes';
import categoryRoutes from './routes/categoryRoutes';
import postRoutes from './routes/postRoutes';
import dotenv from 'dotenv';
import logger from './config/logger';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/posts', postRoutes);

app.listen(3000, () => {
  logger.info('Server is running on port 3000');
});
