## Surf API

![image of Entity Relationship Diagram](https://github.com/JSinkler713/surf-API/blob/master/SurfAPI.pdf)

### Tables in the SurfAPI database

Beaches | beaches_boardTypes | boardTypes | boards
------- | ---------------- | ---------- | ---------:
name  | beaches_id | name | name
description  | boardTypes_id | description  | description
(empty)    | (empty)    | (empty)     | boardTypes_id


###Overview of operations avaliable
The Beaches, boardTypes, and boards tables all have full CRUD operation availabe. The beaches_boardTypes JOIN table is only updated when new beaches are created. In order to pass in data as part of the request, the user should use JSON in the request body. The only other way to pass in data with a request is through an id in the route target. Example where the board that we want to get has id 3.
```
 http:localhost3000/api/boards/3
```

### Route targets and example responses
To get all beaches send a GET request to
```
request: GET
target:	/api/beaches
```
Response:
```
    {
        "name": "OB",
        "description": "A heavy NorCal beachbreak where the paddle out can be one of the hardest in the world."
    },
    {
        "name": "Cron",
        "description": "Close to shore beachbreak located in Northern California. Dumpy shorepound, good on a South Swell."
    },
	 .....full list of beaches
```

To get a specific beach pass in the beach ID like follows
```
request: GET	
target: /api/beaches/3   (where 3 is the beachid)
```
This should return an array containing the data as a JSON object
```
[
    {
        "name": "Byron Bay",
        "description": "Beach in Australia, baby waves, lots of cruise time."
    }
]
```
To delete a beach select the same target but using a DELETE request
```
request: DELETE	
target: /api/beaches/3
```
To update a beach select a target by id and pass in the column wanted to change. In the following, I change the beach name
```
JSON BODY
{
   "name": "Bye Ron Bay"
}
request:PUT
target: /api/beaches/3
```
#### associating a beach to boardTypes while creating a new beach
Not every surf spot supports all boards. For this reason, when updating a beach it is advised to pass in which boardtypes will work well as the new beach. To create a new beach with an association already, your json body that you pass in as a request will need to have an array of boardtype_ids it is accociated with.

To create a new beach that is accommodating to longboards(1) and fish(3) boardtypes I would send a request as follows

```
JSON BODY
{
	"name": "The best shortboard and fish beach",
	"description": "Beach covered in tomatoes",
	"boardTypeIds": [1, 3]
}
request: POST
target: /api/beaches
```
### Useful Routes
Some useful routes to figure out which board you want to bring to the beach. Or likewise which beach you want to go to to surf a particular board are as follows

To get all boards good for beach number 3(Byron Bay)
```
request:GET
target:api/beaches/3/boards

RESPONSE:
    {
        "Beach": "Byron Bay",
        "BoardName": "Big Red",
        "description": "Longboard. 10 ft. It's a log."
    },
    {
        "Beach": "Byron Bay",
        "BoardName": "Stewart Cruiser",
        "description": "Classic longboard cruiser. Catches everything. 9'6"
    },
```
To get all beaches good for board number 1 (Stewart Cruiser)
```
request:GET
target:api/boards/1/beaches

RESPONSE:
    {
        "BoardName": "Stewart Cruiser",
        "description": "Classic longboard cruiser. Catches everything. 9'6",
        "BoardType": "longboard",
        "Beach": "Byron Bay"
    },
    {
        "BoardName": "Stewart Cruiser",
        "description": "Classic longboard cruiser. Catches everything. 9'6",
        "BoardType": "longboard",
        "Beach": "Bolinas"
    },
