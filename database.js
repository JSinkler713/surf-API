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

const createTableBoardTypesQuery = "CREATE TABLE IF NOT EXISTS boardTypes (name TEXT, description TEXT)";

database.run(createTableBoardTypesQuery, (error) => {
  if (error) console.log("couldn't create BoardTypes table", error);
  else console.log("created boardTypes table");
}); 


module.exports = database;
