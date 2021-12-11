import { user, userDB } from "../protocols/user";
import { v4 as  uuid } from "uuid";
import * as userRepository from '../repositories/userRepository';
import { session } from "../protocols/session";

export async function registerUser(user : user) {

    const existUser: userDB = await userRepository.findUserByName(user);

    if (existUser) {
        return false;
    }

    const result: userDB = await userRepository.registerUser(user);

    if (!result) {
        return null;
    }

    const session: session = { id: result.id, token: uuid(), name: result.name };

    const token = await userRepository.createSession(session);

    if (!token) {
        return null;
    }

    return token;
}