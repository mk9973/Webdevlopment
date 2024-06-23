const fs = require('fs')


//It is Aynchronous operation, In this operation last wala console.log() pehle print hoga read,write,delete ke liye wait ni karega
// Reading data
fs.readFile('data.txt', (err, data) => {
  if (err) {
    console.log(err)
  } else {
    console.log(data.toString())
  }
})

// create file
//err---->error if error detected error will print
fs.writeFile('employee.txt', 'New Employee', (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('File is written')
  }
})

fs.appendFile('employee.txt', '\n Another Employee', (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('File is updated')
  }
})

//Delete File
// fs.unlink('employee.txt', (err) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log('File is deleted')
//   }
// })

console.log('This is another operation')