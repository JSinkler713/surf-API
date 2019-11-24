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

//write route to see a specific beach by name
app.get('/api/beaches/:id', (req, res) => {
  const beachId = req.params.id;
  const getByName = `SELECT * FROM beaches WHERE beaches.oid = ? `
  database.all(getByName, [beachId], (error, rows)=> {
    if (error) {
      console.log("Couldn't get by name", error);
      res.sendStatus(500);
    }
    else {
      console.log("Here it is");
      res.status(200).json(rows);
    }
  });
});

//write route to update a specific beach
app.put('/api/beaches/:id', (req, res) => {
  const beachId = req.params.id;
  const queryHelp = Object.keys(req.body).map(element => `${ element.toUpperCase() } = ?`);
  const updateBeachStatement = `UPDATE beaches SET ${queryHelp.join(', ')} WHERE beaches.oid = ?`;
  //add values from req.body and beachId to array for db run
  const queryValue = [...Object.values(req.body), beachId];

  database.run(updateBeachStatement, queryValue, function(error, result) {
    if (error) {
      console.log("error, could not update book", error);
      res.sendStatus(500);
    }
    else {
      console.log(`updated beach with id ${beachId} successfully`)
      res.sendStatus(200);
    }
  });
});

//write route to delete a specific beach
app.delete('/api/beaches/:id', (req, res) => {
  const deleteStatement = `DELETE FROM beaches WHERE beaches.oid = ?`
  let beachId = req.params.id;

  database.run(deleteStatement, beachId, (error) => {
    if(error) {
      console.log("couldn't delete beach", error);
      res.sendStatus(500);
    }
    else {
      console.log("Success deleting beach");
      res.sendStatus(200);
    }
  });
});






app.listen(9000);
