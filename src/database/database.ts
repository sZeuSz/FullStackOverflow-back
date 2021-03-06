import pg from 'pg';

const { Pool } = pg;

const databaseConfig = ({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

const connection = new Pool(databaseConfig);

export default connection;