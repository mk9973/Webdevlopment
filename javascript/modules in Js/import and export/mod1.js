//Named export and import can access as many ement as we want

//Method 1
//import { add ,obj} from ./mod2.js';
// console.log(obj);
// console.log(add(2, 3));


//Method 2
//import * as something from './mod2.js';
//console.log (something);
//console.log(something. obj);
//console.log(something.add(2, 3));


//Method 3
//import {obj as obj1 } from './mod2.js';
//console.log(obj1);



//Default named export and import can access only one element 

//Method 1
//import x from './mod2.js';
//console.log(x);


//both default and named import ar together

import x, {obj as obj1 } from './mod2.js';
console.log(x);
console.log(obj1);

