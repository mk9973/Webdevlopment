const express = require('express')

// Create a server.

const server = express()

// Handle default request.

server.get('/', (req, res, next) => {
  console.log('first middleware hit')
  next()
})

//Here we are implementing the CRUD operations
//create-->POST
//read-->GET
//update-->PUT
//delete-->DELETE

//To check all request we have to use POSTMAN
// GET request
server.get('/', (req, res) => {
  res.send('Hello world! This is Express server')
})

//POST request
server.post('/', (req, res) => {
  res.send('Post request received')
})

//PUT request
server.put('/', (req, res) => {
  res.send('Put request received')
})

//DELETE requset
server.delete('/', (req, res) => {
  res.send('Delete request received')
})

// Assign port
server.listen(3100, () => {
  console.log(`Server running at http://localhost:3100`)
})
