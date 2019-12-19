// Require statements
let express = require('express');
let database = require('./database.js');
let app = express();

//Middleware
app.use(express.json());


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//check basic get request
app.get('/', (req, res)=> {
  res.send('use /api/beaches to access all beaches');
});



//write route to add to table beaches
app.post('/api/beaches', (req, res) => {
  const createNewBeachStatement = `INSERT INTO beaches VALUES (?, ?)`;
  let beachName = req.body.name;
  let reqBody = [req.body.name, req.body.description];
  // get array for second database update
  let boardTypeIDs = req.body.boardTypeIds
  console.log(boardTypeIDs);


  database.run(createNewBeachStatement, reqBody, function(error) {
    if (error) {
      console.log("error making new beach", error);
      res.sendStatus(500);
    }
    else {
      console.log(`you added a new beach`)
      const createNewJoinRow = `INSERT INTO beaches_boardTypes VALUES (?, ?)`;
      for (let boardTypeId of boardTypeIDs) {
        console.log(boardTypeId);
        database.run(createNewJoinRow, [this.lastID, boardTypeId], (error) => {
          if (error) {
            console.log("error making new beach", error);
            res.sendStatus(500);
          }
          else {
            console.log(`you added to the JOIN table`)
          }
        });
      }
      console.log(this.lastID);
      //res.sendStatus(200);
      res.json(this.lastID);
    }
  });
});









//write route to see all beaches
app.get('/api/beaches', (req, res) => {
  const getAllBeaches = 'SELECT beaches.oid, * FROM beaches';

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
  const getByName = `SELECT beaches.oid, * FROM beaches WHERE beaches.oid = ? `
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


/////////////////
// BoardTypes Table
//////////////////
// Only two routes to see types and add type
app.get('/api/boardtypes', (req, res) => {
  const getStatement = `SELECT * FROM boardTypes`
  
  database.all(getStatement, (error, rows) => {
    if(error) {
      console.log("couldn't get board types");
      res.sendStatus(500);
    }
    else {
      res.status(200).json(rows);
    }
  });
});
//get a specific boardtype
app.get('/api/boardtypes/:id', (req, res) => {
  const boardTypeId = req.params.id
  const getStatement = `SELECT *, rowId AS OID FROM boardTypes WHERE boardtypes.oid = ${boardTypeId}`
  database.all(getStatement, (error, row) => {
    if(error) {
      console.log("couldn't get board types", error);
      res.sendStatus(500);
    }
    else {
      res.status(200).json(row);
    }
  });
})
//post a boardtype
app.post('/api/boardtypes', (req, res) => {
  let createNewBoardTypeStatement = `INSERT INTO boardTypes VALUES (?, ?)`;
  let reqBody = [req.body.name, req.body.description];

  database.all(createNewBoardTypeStatement, reqBody, (error, row)=> {
    if(error) res.sendStatus(500);
    else res.status(200).json(row);
  });
});

//update a boardtype
app.put('/api/boardtypes/:id', (req, res) => {
  const boardtypesId = req.params.id;
  const queryHelp = Object.keys(req.body).map(element => `${ element.toUpperCase() } = ?`);
  const updateBoardtypesStatement = `UPDATE boardtypes SET ${queryHelp.join(', ')} WHERE boardtypes.oid = ?`;
  //add values from req.body and beachId to array for db run
  const queryValue = [...Object.values(req.body), boardtypesId];

	database.run(updateBoardtypesStatement, queryValue, function(error, result) {
    if (error) {
      console.log("error, could not update book", error);
      res.sendStatus(500);
    }
    else {
      console.log(`updated boardtypes with id ${boardtypesId} successfully`)
      res.sendStatus(200);
    }
  });
});

//delete a boardtype

app.delete('/api/boardtypes/:id', (req, res) => {
  const deleteStatement = `DELETE FROM boardtypes WHERE boardtypes.oid = ?`
  let boardtypesId = req.params.id;

  database.run(deleteStatement, boardtypesId, (error) => {
    if(error) {
      console.log("couldn't delete boardtype", error);
      res.sendStatus(500);
    }
    else {
      console.log("Success deleting boardtype");
      res.sendStatus(200);
    }
  });
});











/////////////////
// Boards Routes
////////////////

//create a new board
app.post('/api/boards', (req, res) => {
  let createNewBoard = 'INSERT INTO boards VALUES (?, ?, ?)'
  let reqBody = [req.body.name, req.body.description, req.body.boardType_id];
  database.run(createNewBoard, reqBody, (error)=> {
    if(error) {
      console.log("couldn't create new board", error);
      res.sendStatus(500);
    }
    else {
      console.log(`New board ${req.body.name}, has been inserted`);
      res.sendStatus(200);
    }
  });
});

// get all boards
app.get('/api/boards', (req, res) => {
  let getAllBoards = 'SELECT * FROM boards';
  database.all(getAllBoards, (error, results) => {
    if(error) {
      console.log("couldn't get boards", error);
      res.sendStatus(500);
    }
    else {
      console.log("here are the beaches");
      res.status(200).json(results);
    }
  });
}); 

//get a specific board
app.get('/api/boards/:id', (req, res) => {
  const boardId = req.params.id;
  let getAllBoards = 'SELECT * FROM boards WHERE boards.oid = ?';
  database.all(getAllBoards, boardId, (error, result) => {
    if(error) {
      console.log("couldn't get boards", error);
      res.sendStatus(500);
    }
    else {
      console.log("here are the beaches");
      res.status(200).json(result);
    }
  });
}); 

//update a board
app.put('/api/boards/:id', (req, res) => {
  const boardsId = req.params.id;
  const queryHelp = Object.keys(req.body).map(element => `${ element.toUpperCase() } = ?`);
  const updateBoardsStatement = `UPDATE boards SET ${queryHelp.join(', ')} WHERE boards.oid = ?`;
  //add values from req.body and beachId to array for db run
  const queryValue = [...Object.values(req.body), boardsId];

	database.run(updateBoardsStatement, queryValue, function(error, result) {
    if (error) {
      console.log("error, could not update book", error);
      res.sendStatus(500);
    }
    else {
      console.log(`updated boards with id ${boardsId} successfully`)
      res.sendStatus(200);
    }
  });
});

//delete a board
app.delete('/api/boards/:id', (req, res) => {
  const deleteStatement = `DELETE FROM boards WHERE boards.oid = ?`
  let boardsId = req.params.id;

  database.run(deleteStatement, boardsId, (error) => {
    if(error) {
      console.log("couldn't delete board", error);
      res.sendStatus(500);
    }
    else {
      console.log("Success deleting board");
      res.sendStatus(200);
    }
  });
});



////////////////
// JOIN table Requests
///////////////////

app.get('/api/beaches_boardTypes', (req, res) => {
  let getAllBoards = 'SELECT * FROM beaches_boardTypes';
  database.all(getAllBoards, (error, results) => {
    if(error) {
      console.log("couldn't get JOIN table", error);
      res.sendStatus(500);
    }
    else {
      console.log("here are the beaches_boardTypes");
      res.status(200).json(results);
    }
  });
}); 

app.post('/api/beaches_boardTypes', (req, res) => {
  let createNewBoard = 'INSERT INTO beaches_boardTypes VALUES (?, ?)'
  let reqBody = [req.body.beaches_id, req.body.boardTypes_id];
  database.run(createNewBoard, reqBody, (error)=> {
    if(error) {
      console.log("couldn't create new beaches to boardtype relationship", error);
      res.sendStatus(500);
    }
    else {
      console.log(`New beaches to boardTypes relationship has been inserted`);
      res.sendStatus(200);
    }
  });
});

/////////////
// Routes with JOINs
//////////
//Route to get all boards for a specific beach








app.get('/api/beaches/:id/boards', (req, res) => {
  let beachesId = parseInt(req.params.id);
  let requestStatement = `
SELECT beaches.name AS Beach, boards.name AS BoardName, boards.description
FROM beaches JOIN beaches_boardTypes ON
beaches.oid = beaches_boardTypes.beaches_id
JOIN boards ON
beaches_boardTypes.boardTypes_id = boards.boardType_id
WHERE beaches.oid = (?)
`
  database.all(requestStatement, [beachesId], (error, results) => {
    if(error) {
      console.log("couldn't get any boards for that beach", error);
      res.sendStatus(500);
    }
    else {
      console.log("success");
      res.status(200).json(results);
    }
  });
});
// Other way around, given a specific board, get all beaches to surf at with it
app.get('/api/boards/:id/beaches', (req, res) => {
  let boardId = parseInt(req.params.id);
  let requestStatement = `
SELECT boards.name AS BoardName, boards.description, boardTypes.name AS BoardType, beaches.name AS Beach
FROM beaches JOIN beaches_boardTypes ON
beaches.oid = beaches_boardTypes.beaches_id
JOIN boardTypes ON
boardTypes.oid = beaches_boardTypes.boardTypes_id
JOIN boards ON
beaches_boardTypes.boardTypes_id = boards.boardType_id
WHERE boards.oid = (?)
`
  database.all(requestStatement, [boardId], (error, results) => {
    if(error) {
      console.log("couldn't get any boards for that beach", error);
      res.sendStatus(500);
    }
    else {
      console.log("success");
      res.status(200).json(results);
    }
  });
});


//get all boardtypes for a specificbeach
app.get('/api/beaches/:id/boardtypes', (req, res) => {
  let beachesId = parseInt(req.params.id);
  let requestStatement = `
SELECT beaches.name AS Beach, boardTypes.name AS BoardTypeName, boardTypes.oid
FROM beaches JOIN beaches_boardTypes ON
beaches.oid = beaches_boardTypes.beaches_id
JOIN boardTypes ON
beaches_boardTypes.boardTypes_id = boardTypes.oid
WHERE beaches.oid = (?)
`
  database.all(requestStatement, [beachesId], (error, results) => {
    if(error) {
      console.log("couldn't get any boards for that beach", error);
      res.sendStatus(500);
    }
    else {
      console.log("success");
      res.status(200).json(results);
    }
  });
});





app.listen(9000);
