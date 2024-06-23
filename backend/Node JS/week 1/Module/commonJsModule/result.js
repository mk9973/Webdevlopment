// call arithmetic functions, get result and print result on terminal.

// how to import a module
const arithmeticModule = require("./arithmetic");

// we can also check that import of a module is working or not you can add 'console.log('yes')' in
//arithmetic.js file then if we run result.js file then 'yes' will print in terminal
// but if we use two times import module then only 1 time 'yes' will be printed because
// when 'arithmeticModule1' imported the arithmetic.js file at that time file saved in caches
// and if 'arithmeticModule2' try to re import the arithmetic.js file then it uses the caches saved file from previous imported file
//const arithmeticModule1 = require("./arithmetic");
//const arithmeticModule2 = require("./arithmetic");

// call sum function
const result = arithmeticModule.sum(10, 20);
//for access function which export from arithmetic file
//const result = arithmeticModule(10, 20);
console.log(result); 