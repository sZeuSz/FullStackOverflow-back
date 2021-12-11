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
    
    console.log(result);
    return res.status(201).send(result);
    
    } catch (error) {
        console.log(error);
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
        console.log(error);
        return res.sendStatus(500);
    }
}