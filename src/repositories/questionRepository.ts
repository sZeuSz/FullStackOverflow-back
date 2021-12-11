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
    console.log(result.rows);
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
        SELECT *
            FROM questions
                WHERE id = $1;
    `, [id]);

    return result.rows[0];
}

export async function findQuestionByIdWithAnswer(id: string): Promise<questionBD> {
    const result = await connection.query(`
    SELECT question, student, class, tags, answered, "submitAt", answers."answeredAt", answers."answeredBy", answers.answer
        FROM questions
                JOIN answers
                    ON questions.id = answers.question_id
        WHERE questions.id = $1
    `, [id])
    
    console.log("resultBaixo", result.rows);
    return result.rows[0];
}