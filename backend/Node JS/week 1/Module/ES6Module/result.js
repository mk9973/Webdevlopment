// How to import a ES6 module ?

//this import "*" denotes that it imported all files which exported from arithmatic.mjs
//But those fuction or variables used in result file  wahi import hota, mtlb ki agar use karna chahenge to 
//thik warna chhor denge jisses storage bachta h
import * as arithmaticModule from './arithmatic.js';
console.log(arithmaticModule.sum(10, 20));
// console.log(arithmaticModule.num);


//            OR


// import {sum} from './arithmatic.mjs';
// this import is used for import the specific fn or variables
// aur ha same name hona chahiye jo import kar rhe h agar 'sum' h arithmatic file me to result me bhi 'sum' hona chahiye function ka naam
//console.log(sum(10, 20));
