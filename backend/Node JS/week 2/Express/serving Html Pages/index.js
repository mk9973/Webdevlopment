const express = require('express');

//server
const server = express();


//first middleware
server.get('/', (req, res) => {
   return res.send('Welcome to Express');
});

//second middleware
//my all static files are in public folder which can be accessed directly.
//but you can access bt --> http://localhost:3300/index.html if you want to run default then make it first middleware
server.use(express.static('public'));

server.listen(3300);
console.log('Server is listening on port 3300');

