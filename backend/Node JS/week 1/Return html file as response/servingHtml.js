const http = require('http');
//import "file system" for display the html file
const fs=require('fs');

const server = http.createServer((req,res)=>{
    const data = fs.readFileSync('index.html').toString();
    res.end(data);
});

server.listen(9972);
console.log('Server is listening on port 3100');