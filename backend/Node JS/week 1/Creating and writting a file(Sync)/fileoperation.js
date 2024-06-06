const fs = require('fs')

// Creating and Writing a file.
//try and catch is used here because some the file in operating sytem is not allowed to read and write 
//so,it will show an error thats why try and catch is used
//it will create an emplyee.txt file in the same folder
try {
    fs.writeFileSync('employee.txt', 'Name: John Doe, Age: 40, Position: Manager')
  } catch (err) {
    console.log(err)
  }
  
  // Append another employee data(to update the file inforamation)
  fs.appendFileSync('employee.txt', 'Name: David Doe, Age: 55, Position: COO')
  
  // Deleting a file
  //here try and catch is used beacuse it may be that 'employee.txt' is not present at that time it will show an error
  try {
    fs.unlinkSync('employee.txt')
  } catch (err) {
    console.log("File doesn't exist")
  }
  
  console.log('This is another operation being performed')