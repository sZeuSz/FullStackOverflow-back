import '../setup/setup'
import connection from '../database/database';
import { answeredDB, question, questionBD } from '../protocols/question';
import { answerDB } from '../protocols/answer';
import { session } from '../protocols/session';
export async function addQuestion(question: question) {
    const result = await connection.query(`
    INSERT INTO questions
        (question, student, class, tags, "submitAt")
            VALUES
                ($1, $2, $3, $4, NOW()) RETURNING id
    `, [question.question, question.student, question.class, question.tags]);

    return result.rows[0];
}