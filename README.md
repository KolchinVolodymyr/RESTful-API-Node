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
| 1      | /api/login      |  POST       | Body: {"email": "email@gmail.com", "password": "qwerty"} | Status code: 200, {"token": "3f5uh2...."}| User authorization. |
| 2      | /api/register   |  POST       | Body: { "phone": "+380**", // optional "email": "email@gmail.com", "name": "Volodymyr", "password": "qwerty"} | Status code: 200, {"token": "3f5uh2...."}| Add details of new user. |
| 3      | /api/me         |  GET        | Headers: {"token": "3f5uh2...."}                         | Status code: 200, Body:{"id": 1, "email": "email@gmail.com", "name": "Volodymyr"}| Get current user. |
| 4      | /api/items      |  GET        |   | Status code: 200, [{ "id": 1, "created_at": "timestamp in seconds",  "title": "Notebook", "price": 5500.00, "image": "http://example.com/images//*.jpg", "user_id": 12, "user": { "id": 12, "phone": "+380xxxxxxxxx", "name": "Alex", "email": "alex@mail.com" } }] |Get items list.      |
| 5      | /api/items/id   |  GET        |   | Status code: 200, { "id": 1, "created_at": "timestamp in seconds",  "title": "Notebook", "price": 5500.00, "image": "http://example.com/images//*.jpg", "user_id": 12, "user": { "id": 12, "phone": "+380xxxxxxxxx", "name": "Alex", "email": "alex@mail.com" } } | Get item by ID      |
| 6      | /api/items/id   |  PUT        |Headers: {"token": "3f5uh2...."}   Body: {"title": "Notebook2 PRO", "price": 12345} | Status code: 200, Body { "id": 1, "created_at": "timestamp in seconds",  "title": "Notebook2 PRO", "price": 12345, "image": "http://example.com/images//*.jpg", "user_id": 12, "user": { "id": 12, "phone": "+380xxxxxxxxx", "name": "Alex", "email": "alex@mail.com" } }| Update item |
| 7      | /api/login      |  DELETE      | Headers: {"token": "3f5uh2...."}  | Status code: 200, Body: empty| Delete item |
| 8      | /api/items      |  POST       | Body: {"title": "Notebook2", "price": 12333}, Headers: {"token": "3f5uh2...."} | Status code: 200,{ "id": 1, "created_at": "timestamp in seconds",  "title": "Notebook2", "price": 12333, "image": "http://example.com/images//*.jpg", "user_id": 12, "user": { "id": 12, "phone": "+380xxxxxxxxx", "name": "Alex", "email": "alex@mail.com" } }  | Create item. |
| 9      | /api/items/id/images      |  POST       | Headers: { "Authorization": "3f5uh29fh3kjhpx7tyuioiugfvdfr9j8wi6onjf8", "Content-Type": "multipart/form-data" } Body: file=<file> | Status code: 200, Body { "id": 1, "created_at": "timestamp in seconds",  "title": "Notebook2 PRO", "price": 12345, "image": "http://example.com/images//*.jpg", "user_id": 12, "user": { "id": 12, "phone": "+380xxxxxxxxx", "name": "Alex", "email": "alex@mail.com" } }|Upload item image. |



### Examples endpoints: 
  Below are examples of endpoints, server requests, and returned models.
MySQL was used as a database 

  
####  1.	Login user 
  
  #### Request:
  
  
  
  
  
  
  
  
  
  
  
  
  
