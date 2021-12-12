import { Response, Request, response } from "express";
import { session } from "../protocols/session";
import { user } from "../protocols/user";
import userSignUpScheam from "../schemas/userSchemas";
import * as userService from "../services/userService";

export async function userSignUp(req: Request, res: Response) {
    const { name } = req.body;
    const classe = req.body.class;
    const userObject: user = { name, class: classe };
    try {

        const { error } = userSignUpScheam.validate({ name, class: classe })
        
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        
        const result: null | false | session = await userService.registerUser(userObject);

        if (result === false) {
            return res.status(409).send({message: 'usuário já existe'})
        }

        if (!result) {
            return res.status(400).send({message: 'Erro ao criar usuário, tente de nuevo'})
        }

        return res.status(201).send(result);
    } catch (error) {
        return res.sendStatus(500);
    }
}

export async function rankingUsers(req: Request, res: Response) {

    try {
        const result = await userService.getUsersTopTen();

        if (!result) {
            return res.status(400).send({ message: 'Não há usuários cadastrados ainda' });
        }

    return res.status(200).send(result);
    } catch (error) {
        return res.sendStatus(500);
    }
}
