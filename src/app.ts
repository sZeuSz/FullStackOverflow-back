import express from 'express';
import * as questionsController from './controllers/questionController'
// import * as usersController from './controllers/userController';
// import cors from "cors";
import { Request, Response } from 'express';
const app = express();
// app.use(cors());
app.use(express.json());
app.post('/questions', questionsController.postQuestion);


export default app;