
//Postman is an API platform that helps users build and use APIs. It offers a variety of tools that help with the API lifecycle, including:
//Design, Testing, Documentation, Mocking, Discovery, Workspaces, and Governance.
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method == 'POST') {
    //'req.body'-->undefined (because data ek baar me transfer nii hota h chucnk by chunk hota h)
    console.log(req.body);
    // expecting data from client
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    //jab pura data received ho jayega tab 're.on' execute hoga
    req.on('end', () => {
      console.log(body);
      res.end('Data is received');
    });
  }else{
    console.log('Function ends here');
    res.end('Welcome to node js');
  }   
});

server.listen(3200)

console.log('Server is listening on 3200')
