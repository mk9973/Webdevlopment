const express = require('express')

// Create a server.

const server = express()

// Handle default request.

server.get('/', (req, res, next) => {
  console.log('first middleware hit')
  next()
})

// GET request
//here we USE Http Header --> 'Content-Type' for response to client
server.get('/', (req, res) => {
  res.set('Content-Type', 'text/plain')
  res.send('Hello world! This is Express server')
})

//here we use status code --> '201' -->it means created Successfully! for response to client
server.post('/', (req, res) => {
  res.status(201).send('Post request received')
})

server.put('/', (req, res) => {
  res.send('Put request received')
})

server.delete('/', (req, res) => {
  res.send('Delete request received')
})

// Assign port
server.listen(3100, () => {
  console.log(`Server running at http://localhost:3100`)
})

