import { answerDB } from "../protocols/answer";
import { answeredDB, question, questionBD } from "../protocols/question";
import { session } from "../protocols/session";
import * as questionRepository from '../repositories/questionRepository';

export async function addQuestion(question: question) {
    
    const result = await questionRepository.addQuestion(question);

    return result;
}

export async function findQuestionById(id: string): Promise<questionBD | null> {
    
    const answer: answeredDB = await questionRepository.findAnsweredById(id);

    let result: questionBD | null;

    if (!answer?.answered) {
        console.log('bebe')
        result = await questionRepository.findQuestionById(id);
    }
    else {
        console.log('aqui');
        result = await questionRepository.findQuestionByIdWithAnswer(id);
    }

    if (!result) {
        return null;
    }
    
    return result;
}