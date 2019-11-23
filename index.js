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

//write first route to look at table beaches



//write route to add to table beaches
app.post('/api/beaches', (req, res) => {
  let createNewBeachStatement = `INSERT INTO beaches VALUES (?, ?)`;
  let reqBody = [req.body.name, req.body.description];
  
  database.run(createNewBeachStatement, reqBody, (error, result) => {
    if (error) {
      console.log("error making new beach", error);
      res.sendStatus(500);
    }
    else {
      console.log(`you added a new beach, ${req.body.name}`)
      res.status(200).json(result);
    }
  });
});

//write route to see all beaches
app.get('/api/beaches', (req, res) => {
  const getAllBeaches = 'SELECT * FROM beaches';

  database.all(getAllBeaches, (error, rows)=> {
    if (error) {
      console.log("cant get all beaches", error);
      res.sendStatus(500);
    }
    else {
      console.log("success getting all beaches");
      res.status(200).json(rows);
    }
  });
});



app.listen(9000);
