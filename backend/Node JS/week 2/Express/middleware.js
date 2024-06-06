const express = require('express');

// Create a server.

const server = express();

// Handle default request.

//two method for implementing the middleware

//1. Method

server.get('/',

//first middleware
//it wil execute both first and second middleware
(req, res,next) => {
    console.log('first middleware hit');
    next()
},

//it will execute first middleware and then exit, it will not execute the second middleware
//(req, res) => {
//    send.log('first middleware hit');
//},

//it will execute first middle ware and waiting.....not executed the second middle ware
//(req, res) => {
//    send.log('first middleware hit');
//},


//second middleware
(req, res) => {
    res.send('Hello World! This is Express server');
  }
);


//2. Method
//first midlleware

// server.get('/', (req, res,next) => {
//   console.log('first middleware hit');
//   next();
// });

//second middleware

// server.get('/', (req, res) => {
//   res.send('Hello World! This is Express server');
// });

// Assign port.
server.listen(3200, () => {
  console.log('Server is listening on 3200');
});