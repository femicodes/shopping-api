const http = require('http');
const app = require('./app');

const port = process.env.PORT || 8700;
const server = http.createServer(app);
server.listen(port);
console.log(`server started on port ${port}`);