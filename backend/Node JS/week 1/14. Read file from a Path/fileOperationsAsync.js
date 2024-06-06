const fs = require('fs');
const path = require('path');

// Reading data

//to find the path of the given file

//it find the relative  path of the file
const filePath = path.join('src','home','data.txt')

//it find the absolute path of the given file
const filePathResolved = path.resolve('src','home','data.txt');

//these will print the path
console.log(filePath);
console.log(filePathResolved);

//it will print the file extension here you can use  the absolute or the relative path
console.log(path.extname(filePathResolved));

//here you can use  the absolute or the relative path
fs.readFile(filePath,(err, data)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(data.toString());
    }
});



