import { Router } from "express";
import * as questionsController from '../controllers/questionController';

const router = new (Router as any)();

router.post('/questions', questionsController.postQuestion)
router.get('/questions', questionsController.getQuestions);
router.post('/questions/:id', questionsController.postAnswer);
router.get('/questions/:id', questionsController.getQuestionById);
router.put('/questions/:id/up-vote', questionsController.questionUpVote);
router.put('/questions/:id/down-vote', questionsController.questionDownVote);

export default router;