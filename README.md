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


| №      | URI             | HTTP Method |         Result           |
| :----- |:---------------:| :----------:|:------------------------:|
| 1      | /api/login      |  POST       | User authorization.      |
| 2      | /api/register   |  POST       | Add details of new user. |
| 3      | /api/me         |  GET        | Get current user.        |
| 4      | /api/items      |  GET        | Get items list.          |
| 5      | /api/items/id   |  GET        | Get item by ID           |
| 6      | /api/items/id   |  PUT        | Update item              |
| 7      | /api/login      |  DELETE     | Delete item              |
| 8      | /api/items      |  POST       | Create item.             |
| 9      | /api/items/id/images  | POST  | Upload item image.       |



## Examples endpoints: 
  Below are examples of endpoints, server requests, and returned models.
MySQL was used as a database 

  
###  1.	Login user  
  #### Request:
  ##### POST /api/login
  ```bash
     Body: {
      "email": "email@example.com", 
      "password": "qwerty"
     }
```
  #### Responses
  ```bash
     Status code: 200,OK
     Body: {
      Headers: {"token": "3f5uh2...."}
     }
``` 
  ###  2.	Register 
  #### Request:
  ##### POST /api/register 
  ```bash
     Body: {
        "phone": "+380xxxxxxxxx", // optional
        "name": "Alex", 
        "email": "admin@gmail.com", 
        "password":"qwerty",
    }
    
    
    422, Unprocessable Entity
    Body: 
      [
        {
        "field":"password",
        "message":"Wrong email or password"
        },
      ]


```
  #### Responses
  ```bash
     Status code: 200,OK
     Body: {
         {"token": "3f5uh2...."}
     }
     
     
     422, Unprocessable Entity
     Body:
      [
        {
        "field":"current_password",
          "message":"Wrong current password"
        },
        ...
      ]
``` 
  
  ###  3.	Get current user 
  #### Request:
  ##### GET /api/me 
  ```bash
     Headers: {"token": "3f5uh2...."}

```
  #### Responses
  ```bash
     Status code: 200,OK
     Headers: {
         "id": 1,
         "phone": “+380xxxxxxxxx”, 
         "name": "Volodymyr",
         "email": “admin@gmail.com”
      }
      
      
      401, Unauthorized
      Body: empty

``` 
  
  ###  4.	Get items list 
  ##### GET /api/items 
  #### Responses
  ```bash
     Status code: 200,OK
     [ 
        { "id": 1, 
          "created_at": "timestamp in seconds",  
          "title": "Notebook", 
           "price": 5500.00, 
            "image": "http://example.com/images//*.jpg", 
            "user_id": 12, 
            "user": { 
                      "id": 12, 
                      "phone": "+380xxxxxxxxx", 
                      "name": "Alex", 
                      "email": "alex@mail.com" 
             } 
       }
  
      ]
``` 
  
  ###  5.	Get current user    
  ##### GET /api/items/id
  #### Responses
  ```bash
     Status code: 200,OK
      { "id": 1, 
          "created_at": "timestamp in seconds",  
          "title": "Notebook", 
           "price": 5500.00, 
            "image": "http://example.com/images//*.jpg", 
            "user_id": 12, 
            "user": { 
                      "id": 12, 
                      "phone": "+380xxxxxxxxx", 
                      "name": "Alex", 
                      "email": "alex@mail.com" 
            } 
      }
      
      
    404, Not found
    Body: empty

``` 
  
  
  ###  6.	Update item
  #### Request:
  ##### PUT /api/items/<id>
  ```bash
     Headers: {"Authorization": "3f5uh2...."}
     Body: {
      "title": "Notebook2", //optional
      "price": 5501.00, //optional
    }

```
  #### Responses
  ```bash
     Status code: 200,OK
     Body: {
              "id": 1,
              "created_at": <timestamp in seconds>, 
              "title": "Notebook2", 
              "price": 5501.00,
              "image": "http://example.com/images/**/*.jpg",
              "user_id": 12,
              "user": {
                        "id": 12,
                        "phone": "+380xxxxxxxxx",
                        "name": "Alex",
                        "email": "alex@mail.com"
                     } 
            }
  
  
      422, Unprocessable Entity
        [
          {
          "field":"title",
          "message":"Title should contain at least 3 characters"
          }
        ]

      404, Not found
      Body: empty

      403, Forbidden
      Body: empty

      401, Unauthorized
      Body: empty
``` 
  
  
   ###  7.	Delete item
  #### Request:
  ##### DELETE /api/items/<id> 
  ```bash
     Headers: {"Authorization": "3f5uh2...."}
```
  #### Responses
  ```bash
     Status code: 200,OK
     Body: empty
  
  
      404, Not found 
      Body: empty

      403, Forbidden
      Body: empty

      401, Unauthorized
      Body: empty


``` 
  
  ###  8.	Create item
  #### Request:
  ##### POST /api/items 
  ```bash
    Headers: {"Authorization": "3f5uh2...."}
    Body: {
        "title": "Notebook", //required
        "price": 5500.00, //required
      }

```
  #### Responses
  ```bash
     Status code: 200,OK
     Body: {
              "id": 1,
              "created_at": <timestamp in seconds>, 
              "title": "Notebook", 
              "price": 5501.00,
              "image": "http://example.com/images/**/*.jpg",
              "user_id": 12,
              "user": {
                        "id": 12,
                        "phone": "+380xxxxxxxxx",
                        "name": "Volodymyr",
                        "email": "Volodymyr@gmail.com"
                     } 
            }
  
  
      422, Unprocessable Entity
        [
            {
            "field":"title",
            "message":"Title is required"
            },
        ...
       ]

     401, Unauthorized
     Body: empty

``` 
  
  
  
  
  ###  9.	Upload item image
  #### Request:
  ##### POST /api/items/<id>/images 
  ```bash
    Headers:{
            "Authorization": "3f5....."
            "Content-Type": "multipart/form-data"
    }
    Body: file=<file>
```
  #### Responses
  ```bash
     Status code: 200,OK
     Body: {
        "id": 1,
        "created_at": <timestamp ineconds>, 
        "title": "Notebook",
        "price": 5500.00,
        "image': "http://example.com/images/**/*.jpg", 
        "user_id": 12,
        "user": {
                "id": 12,
                "phone": "+380xxxxxxxxx',
                "name": "Volodymyr",
                "email": "Volodymyr@gmail.com"
         }
      }
  
  
    422, Unprocessable Entity
      [
        {
        "field":"image",
        "message":"The file {file} is too big. "
        },
        ...
      ]
    404, Not found
    Body: empty

    403, Forbidden
    Body: empty

    401, Unauthorized
    Body: empty

``` 
  
  
  
  
  
  
  
  
  
  
  
  
