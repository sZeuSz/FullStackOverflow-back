import express from 'express';
import * as questionsController from './controllers/questionController'
import * as usersController from './controllers/userController';
// import cors from "cors";
const app = express();
// app.use(cors());
app.use(express.json());

app.post('/questions', questionsController.postQuestion);
app.get('/questions', questionsController.getQuestions);
app.post('/questions/:id', questionsController.postAnswer);
app.get('/questions/:id', questionsController.getQuestionById);
app.post('/users', usersController.userSignUp);
app.put('/questions/:id/up-vote', questionsController.questionUpVote);
app.put('/questions/:id/down-vote', questionsController.questionDownVote);
app.get('/ranking', usersController.rankingUsers);
export default app;