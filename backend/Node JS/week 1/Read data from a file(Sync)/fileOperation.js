const fs = require('fs')

// To read file content using blocking code.

console.log('Starting to read')
//readFileSync--> it synchronous file read
//buffer--> jab file recieving from operationg system and sending is differ in speed then buffer takes place 
// it is blocking code , agar file bahut bara hua to last wala console.log() ko wait karna hoga jb tk pura read na kar le
const buffer = fs.readFileSync('data.txt', { encoding: 'utf8' })
console.log(buffer)

//                   OR

//const buffer = fs.readFileSync('data.txt')
//console.log(buffer.toString())
console.log('This is another operation being performed')
