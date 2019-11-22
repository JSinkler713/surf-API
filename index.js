// Require statements
let express = require('express');
let database = require('./database.js');
let app = express();

//Middleware
app.use(express.json());

//check basic get request
app.get('/', (req, res)=> {
  res.send('use /api/beaches to access all beaches');
});


app.listen(9000);
