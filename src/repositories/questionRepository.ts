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

export async function UpdateQuestionById(id: string): Promise<questionBD> {

    const result = await connection.query(`
        UPDATE questions set answered = true
                WHERE id = $1
                    RETURNING *
    `, [id]);
    return result.rows[0];
}

export async function findAnsweredById(id: string) : Promise<answeredDB> {
    
    const result = await connection.query(`
        SELECT answered
            FROM questions
                WHERE id = $1;
    `, [id]);
    return result.rows[0];
}

export async function findQuestionById(id: string): Promise<questionBD> {
    const result = await connection.query(`
        SELECT question, student, class, tags, answered, TO_CHAR("submitAt", 'yyyy-mm-dd HH24:MI ')
            FROM questions
                WHERE id = $1;
    `, [id]);

    return result.rows[0];
}

export async function findQuestionByIdWithAnswer(id: string): Promise<questionBD> {
    const result = await connection.query(`
    SELECT question, student, class, tags, answered, TO_CHAR("submitAt", 'yyyy-mm-dd HH24:MI ') AS "submitAt", TO_CHAR(answers."answeredAt", 'yyyy-mm-dd HH24:MI ') AS "answeredAt" , answers."answeredBy", answers.answer
        FROM questions
                JOIN answers
                    ON questions.id = answers.question_id
        WHERE questions.id = $1
    `, [id])
    
    return result.rows[0];
}

export async function findQuestionsNotAnswered(): Promise<questionBD[]> {
    
    const result = await connection.query(`
        SELECT *
            FROM questions
                WHERE answered = false;
    `);

    return result.rows;
}

export async function answerQuestionById(answer: answerDB) : Promise<answerDB> {
    const result = await connection.query(`
        INSERT INTO answers
            ("answeredAt", "answeredBy", answer, question_id, user_id)
                values
                    (NOW(), $1, $2, $3, $4)
                        RETURNING id;
    `, [answer.name, answer.answer, answer.id, answer.user_id]);
    
    return result.rows[0];
}

export async function findUserByToken(token: string): Promise<session> {

    const result = await connection.query(`
        SELECT *
            FROM sessions
                WHERE token = $1;
    `, [token]);
    return result.rows[0];
}

export async function CheckAnsweredQuestion(id: string): Promise<questionBD> {
    
    const result = await connection.query(`
        SELECT *
            FROM questions
                WHERE id = $1 AND answered = true
    `, [id])
    
    return result.rows[0];
}

export async function putQuestionUpVote(id: string): Promise<questionBD> {
    
    const result = await connection.query(`
        UPDATE questions
            SET votes = votes + 1
                WHERE id = $1
                    RETURNING votes, id;
    `, [id]);

    return result.rows[0];
}

export async function putQuestionDownVote(id: string): Promise<questionBD> {
    
    const result = await connection.query(`
        UPDATE questions
            SET votes = votes - 1
                WHERE id = $1
                    RETURNING votes, id;
    `, [id]);

    return result.rows[0];
}
