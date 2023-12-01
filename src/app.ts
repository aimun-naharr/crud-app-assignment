import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import userRouter from './modules/user/user.route';
import { errorMiddleware } from './modules/middleware/error';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/users', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// using error middleware
app.use(errorMiddleware);

export default app;
