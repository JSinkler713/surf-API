const db = require ('./database.js');

const beaches_list = [
    {
        "name": "OB",
        "description": "A heavy NorCal beachbreak where the paddle out can be one of the hardest in the world."
    },
    {
        "name": "Cron",
        "description": "Close to shore beachbreak located in Northern California. Dumpy shorepound, good on a South Swell."
    },
    {
        "name": "Byron Bay",
        "description": "Beach in Australia, baby waves, lots of cruise time."
    }
];

const boardTypes_list = [
    {
        "name": "shortboard",
        "description": "Used to rid waves ranging from 3 feet to up to 12 feet. Usually around the height of the rider, give or take a few inches in either direction."
    },
    {
        "name": "longboard",
        "description": "Generally used to ride small waves ranging from 1 to 5 feet. They range in height, but average around 9 feet tall."
    },
    {
        "name": "fish",
        "description": "Generally used to ride small to medium waves ranging from 3 to 8 feet. They often have twin fins or the current popular set up is with quad fins."
    },
    {
        "name": "gun",
        "description": "Used to ride big waves. These are the type of boards used to ride waves like Mavericks"
    }
];

const boards_list = [
    {
	"name": "Stewart Cruiser",
	"description": "Classic longboard cruiser. Catches everything. 9'6",
	"boardType_id": 2
    },
    {
	"name": "LOST Short Round",
	"description": "Small wave shortboard. Grovel around in the shorebreak.",
	"boardType_id": 1
    }
];

db.serialize(()=> {
  const deleteBeaches = 'DELETE FROM beaches';
  const insertIntoBeaches = 'INSERT INTO beaches (name, description) VALUES (?, ?)';

  db.run(deleteBeaches, error => {
    if (error) console.log(new Error('Could not delete beaches'), error);
    else console.log("couldn't delete beaches");
  });
   beaches_list.forEach(beach => {
    db.run(insertIntoBeaches, [beach.name, beach.description], error => {
      if (error) console.log(new Error('Could not add beaches'), error);
      else {
        console.log(`${beach.name} successfully added to the database!`);
      }
    });
  });

  const deleteBoardTypes = 'DELETE FROM boardTypes';
  const insertIntoBoardTypes = 'INSERT INTO boardTypes (name, description) VALUES (?, ?)';
  db.run(deleteBoardTypes, error => {
    if (error) console.log(new Error('Could not delete boardTypes'), error);
    else { console.log("deleted boardtypes")}
  });
  boardTypes_list.forEach(boardType => {
    db.run(insertIntoBoardTypes, [boardType.name, boardType.description], error => {
      if (error) console.log(new Error('Could not add boardtypes'), error);
      else {
        console.log(`${boardType.name} successfully added to the database!`);
      }
    });
  })
  const deleteBoards = 'DELETE FROM boards';
  const insertIntoBoards = 'INSERT INTO boards (name, description, boardType_id) VALUES (?, ?, ?)';
  db.run(deleteBoards, error => {
    if (error) console.log(new Error('Could not delete boards'), error);
    else console.log("deleted boards"); 
  }); 
  boards_list.forEach(board => {
    db.run(insertIntoBoards, [board.name, board.description, board.boardType_id], error => {
      if (error) console.log(new Error('Could not add board'), error);
      else {
        console.log(`${board.name} successfully added to the database!`); 
      }
    }); 
  });
});


