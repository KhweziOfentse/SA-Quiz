import http from 'http';
import app from './routers.js';

const server = http.createServer({app});
const PORT = 8080;

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})