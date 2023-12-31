// Import required modules
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

//Create an Express app
const app = express();
const port = 3000;

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

//Define Routes
app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Hello World from ExpressJS!'
  })
});

//Start the Server
app.listen(port, () => {
  console.log(`Server is running on http:/localhost:${port}`)
});