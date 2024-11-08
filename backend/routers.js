import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import pool from './dbConfig.js';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (res, req) => {
    req.send('Hello world');
})

export default {app};
