import connection from "../database/database";
import { session } from "../protocols/session";
import { updateCount, user, userDB } from "../protocols/user";

export async function findUserByName(user: user): Promise<userDB> {
    const result = await connection.query(`
        SELECT *
            FROM users
                WHERE name = $1
    `, [user.name]);

    return result.rows[0];
}

export async function registerUser(user: user): Promise<userDB> {
    const result = await connection.query(`
        INSERT INTO users
            (name, class)
                VALUES
                    ($1, $2)
                RETURNING *
    `, [user.name, user.class]);

    return result.rows[0];
}

export async function createSession(session: session): Promise<session> {
    
    const result = await connection.query(`
        INSERT INTO sessions
            (token, name, user_id)
                VALUES
                    ($1, $2, $3)
                        RETURNING token
    `, [session.token, session.name, session.id]);
    
    return result.rows[0];
}

export async function getUsersTopTen() : Promise<userDB[]> {
    
    const result = await connection.query(`
        SELECT name, answers, points
            FROM users
                ORDER BY points DESC
                    LIMIT 10;
    `);

    return result.rows;
}

export async function updateUsersCountAnswers(id : string | undefined, votes: number) : Promise<updateCount> {
    
    const result = await connection.query(`
        UPDATE users
            SET answers = answers + 1, points = points + (1 * $1)
                WHERE id = $2
                    RETURNING answers, id;
    `,[votes, id]);

    return result.rows[0];  
}