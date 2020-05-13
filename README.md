# todo
Todo list created with Node js and React. It is a learning curve and so there is a mixture
of methods. Some using async/await and others using callback functions.

## API endpoints

``` GET /users ``` => returns an array of all users.  
``` DELETE /users/:username ``` => deletes the user with the given :username  and returns a message and deleted user  

``` POST /auth/signup ``` => signs up/creates a new user and returns auth token/cookie and user  
``` POST /auth/signin ``` => signs in a user and returns auth token/cookie and user    
``` GET /auth/signout ``` => signs the user out    


``` GET /users/:username/lists ``` => returns an array of all lists associated with the given :username  
``` POST /users/:username/lists ``` => attemps to create a new list to associate with the given :username    
``` GET /users/:username/lists/:listname ``` => returns the specific list object given by :listname  (including name, items,_id)  
``` DELETE /users/:username/lists/:listname ``` => deletes the given :listName and returns the deleted list

``` GET /users/:username/lists/:listname/items ``` => returns all the items in the given list :listname (excluding name and _id)    
``` POST /users/:username/lists/:listname/items ``` => creates a new item and adds it to :listname then returns the items in :listname  
``` DELETE /users/:username/lists/:listname/items/:itemId ``` => deletes the item with :itemId and returns a success message

### Backend todo list
- [x] sign up/create user  
  - [x] validation on signup

- [x] sign in    
  - [x] sign in validation  

- [x] sign out  

- [x] delete account

- [x] make todo lists  
  - [x] view specific list  
  - [x] remove todo lists

- [x] make todo items  
  - [x] check / uncheck items off  
   - [x] remove items  
