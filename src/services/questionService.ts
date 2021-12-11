import { answerDB } from "../protocols/answer";
import { answeredDB, question, questionBD } from "../protocols/question";
import { session } from "../protocols/session";
import * as questionRepository from '../repositories/questionRepository';

export async function addQuestion(question: question) {
    
    const result = await questionRepository.addQuestion(question);

    return result;
}
