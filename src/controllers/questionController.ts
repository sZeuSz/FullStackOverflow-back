import questionSchema from "../schemas/questionSchemas";
import { Request, Response } from "express";
import { question, questionBD } from "../protocols/question";
import * as questionService from '../services/questionService';
import { answerDB } from "../protocols/answer";

export async function postQuestion(req: Request, res: Response) {

    try {
        
    const questionObject : question = req.body;

    const { error } = questionSchema.validate(questionObject);
    
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    
    const result = await questionService.addQuestion(questionObject);
    
    return res.status(201).send(result);
    
    } catch (error) {
        return res.sendStatus(500);
    }
}

export async function getQuestionById(req: Request, res: Response) {
    const { id } = req.params;
    
    try {
        if (!id) {
            return res.status(400).send({ message: 'id não precisa ser definino nos parametros da rota' })
        }

        const result:null | false | questionBD = await questionService.findQuestionById(id);

        if (!result) {
            return res.status(404).send({message: 'Infelizmente não foi possível encontrar a questão com esse id :('})
        }

        return res.status(200).send(result);
    } catch (error) {
        return res.sendStatus(500);
    }
}

export async function getQuestions(req: Request, res: Response) {
    try {

        const result = await questionService.findQuestionsNotAnswered();
        
        if (!result) {
            return res.status(400).send({message: 'Desculpe, nenhuma questão foi encontrada'})
        }
        return res.status(200).send(result);
    } catch (error) {
        return res.sendStatus(500);
    }
}

export async function postAnswer(req: Request, res: Response) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const { id } = req.params;
    const { answer } = req.body;
    
    try {
        if (!id || !answer || !answer.trim().length) {
            return res.status(400).send({ message: 'Os parametros precisam ser definido nos parametros da rota' });
        }
        if (!token) {
            return res.status(401).send({ message: 'Não autorizado' });
        }

        const result: answerDB | null = await questionService.answerQuestionById(id, answer, token);

        if (!result) {
            return res.status(400).send({message : 'Questão com id não encontrada ou usuário não autorizado ou a Questão já foi respondida :('})
        }

        return res.status(201).send({message: 'Pergunta respondida com sucesso! :D'})
    } catch (error) {
        return res.sendStatus(500);
    }
}

