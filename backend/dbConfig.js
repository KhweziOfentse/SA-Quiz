import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '',
    database: 'quizdb'
})

pool
    .connect()
    .then(() => {
        console.log('It is connected to the database.');
    })
    .catch((err) => {
        console.log(`Database connection error: ${err}`);
    })

export default {pool};