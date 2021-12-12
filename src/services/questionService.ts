import { answerDB } from "../protocols/answer";
import { answeredDB, question, questionBD } from "../protocols/question";
import { session } from "../protocols/session";
import * as questionRepository from '../repositories/questionRepository';
import * as userRepository from '../repositories/userRepository';

export async function addQuestion(question: question) {
    
    const result = await questionRepository.addQuestion(question);

    return result;
}

export async function findQuestionById(id: string): Promise<questionBD | null> {
    
    const answer: answeredDB = await questionRepository.findAnsweredById(id);

    let result: questionBD | null;

    if (!answer?.answered) {
        result = await questionRepository.findQuestionById(id);
    }
    else {
        result = await questionRepository.findQuestionByIdWithAnswer(id);
    }

    if (!result) {
        return null;
    }
    
    return result;
}

export async function answerQuestionById(id: string, answer: string, token: string) {

    const user: session = await questionRepository.findUserByToken(token);
    
    const answered: questionBD = await questionRepository.CheckAnsweredQuestion(id);

    if (!user || answered) {
        return null;
    }

    const question: questionBD = await questionRepository.UpdateQuestionById(id);

    if (!question) {
        return null;
    }
    console.log(user.user_id)

    const answerObject: answerDB = { id, answer, name: user.name, user_id: user.user_id }
    const result: answerDB = await questionRepository.answerQuestionById(answerObject);

    const amountAnswers = await userRepository.updateUsersCountAnswers(user.user_id);

    return amountAnswers;
}

export async function findQuestionsNotAnswered() {

    const result: questionBD[] = await questionRepository.findQuestionsNotAnswered();

    if (!result) {
        return null;
    }

    return result; 
}

export async function putQuestionUpVote(id: string) {

    const result: questionBD = await questionRepository.putQuestionUpVote(id);

    if (!result) {
        return null;
    }

    return result;
}

export async function putQuestionDownVote(id: string) {

    const result: questionBD = await questionRepository.putQuestionDownVote(id);

    if (!result) {
        return null;
    }

    return result;
}

