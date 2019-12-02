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
	http:localhost/api/beaches
```
To get a specific beach pass in the beach ID like follows
```
	http:localhost/api/beaches/3
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
