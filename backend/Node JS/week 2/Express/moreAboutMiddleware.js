const express = require('express');

const server = express();

function firstMiddleware(req,res,next)
{
    console.log("This is First Middleware");
    next();
}

function secondMiddleware(req,res,next)
{
    console.log("This is Second Middleware");
    next();
}


//handling the array of middleware
// '/' --> default request  (it will run when)-->http://localhost:3200/
// '/send' --> send request   (it will run when)-->http://localhost:3200/send  otherwise it will give 'Cannot GET /' error
// so for any request we can handdle by using 'globalMiddleware'
//this is going to be execute for all request
function globalMiddleware(req,res,next)
{
  console.log('this is Global Middleware');
  next();
}

server.use(globalMiddleware);

//route-level middleware going to be executed for send requests
server.get('/send', [firstMiddleware,secondMiddleware],(req, res) => {
   res.send('Hello World! This is Express server');
 });

 server.listen(3200, () => {
    console.log('Server is listening on 3200');
  });
