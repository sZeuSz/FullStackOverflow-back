import express from 'express';
import * as questionsController from './controllers/questionController'
import * as usersController from './controllers/userController';
import questionRouter from './routers/questionRouter';
import userRouter from './routers/userRouter';

const app = express();

app.use(express.json());
app.use(questionRouter);
app.use(userRouter);

export default app;