# RESTful-API-Node
Using Hapi.js and Node.js, we can implement a complete REST-style API for user interaction. The REST architecture assumes the use of the following HTTP request methods or types to communicate with the server: 
HTTP methods
###
Following four HTTP methods are commonly used in REST based architecture.

GET − This is used to provide a read only access to a resource.

PUT − This is used to create a new resource.

DELETE − This is used to remove a resource.

POST − This is used to update a existing resource or create a new resource.

### Main functionality: 
-	Check in
- Authorization
- Getting the data of the current user
- Creation / deletion of goods by an authorized user
- Changing product data by an authorized user
- Uploading product image 


Based on this information we are going to provide following RESTful APIs.


| №      | URI             | HTTP Method |  Request                                                 |  Responses                               |          Result          |
| :----- |:---------------:| :----------:| :-----------------------------------------------------:  | :--------------------------------------: |:------------------------:|
| 1      | /api/login      |  POST       | Body: {"email": "email@gmail.com", "password": "qwerty"} | Status code: 200, {"token": "3f5uh2...."}| Add details of new user. |
| 2      |          |   |
| 3      |     |    |
| 4      |       |    |



