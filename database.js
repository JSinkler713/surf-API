let sqlite3 = require('sqlite3');
let database = new sqlite3.Database('./database.db');


/////////////////
// Create BEACHES table
////////////////////

const createTableBeachesQuery = "CREATE TABLE IF NOT EXISTS beaches (name TEXT, description TEXT)";

database.run(createTableBeachesQuery, (error) => {
  if (error) console.log("Create Beaches table failed.", error);
  else console.log("Success created Beaches Table");
});


/////////////////
// Create BOARDTYPES table
/////////////////
const createTableBoardTypesQuery = "CREATE TABLE IF NOT EXISTS boardTypes (name TEXT, description TEXT)";

database.run(createTableBoardTypesQuery, (error) => {
  if (error) console.log("couldn't create BoardTypes table", error);
  else console.log("created boardTypes table");
}); 
/////////////////
// Create boards table
//////////////////
 const createTableBoardsQuery = "CREATE TABLE IF NOT EXISTS boards (name TEXT, description TEXT, boardType_id INTEGER)"    ;
  
  database.run(createTableBoardsQuery, (error) => {
  if (error) console.log("couldn't create Boards table", error);
  else console.log("created boards table");
}); 

module.exports = database;
