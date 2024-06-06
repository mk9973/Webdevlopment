
//Defination:A reusable code that can be used in different parts of an application.
//Two types of module
// 1. Common JS Module
// 2. ES6 Module.


//Now we are implementing common Js Module

//exports.sum= (x,y)=>{
//    return x+y;
//};
//       OR
module.exports.sum= (x,y)=>{
    return x+y;
};

function div(x,y){
    return x/y;
}

console.log('Loading arithmetic');

//--> You can also export the functions
// exports = function(x,y){
//   return x+y;
// }

