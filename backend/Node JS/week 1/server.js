//Create a new server using NodeJS

//step 1. --> Import http library/module

const http=require('http');

//step 2.  --> Create Server

const server= http.createServer((req,res)=>
{
    //here comes the request
    
  if (req.url == '/product') {
    //  res.end('This is Product Page'); it  respond ends but function are working thats why when we resent the request again then it shows error 
   //so 'return res.end('This is Product Page');' then it ends the function so it will not show any error
   //or res.write('Welcome to my application'); ,if 'res.write' use the it will not end the response nor function then you can
   //again send the request and  it will not show any error
   res.write('Welcome to my application');
   // res.end('This is Product Page');
  } else if (req.url == '/user') {
    res.write('This is User page');
  }
  //you have to add one more res.end() without conditional statement otherwise it shows error
   res.end("This is my New Server creating using NodeJS");
});

//step 3. --> Specify a Server Listen to a client's requests
//listen: The listen() method start the server and listens for incoming connection on the specified port
server.listen(9973, ()=>
{
    console.log("Server is Listening on Port 9973");
});

