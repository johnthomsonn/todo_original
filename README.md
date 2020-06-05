# todo
Todo list created with Node js and React. This project has all intended functionality, only optimisations/refactoring to do. It allows users to create a profile and then create multiple todo lists. Development build can be started using ```npm run dev``` this will satrt the express serve ron port 5000 and React on port 3000.

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
``` DELETE /users/:username/lists/:listname/items ``` => deletes the array of items that is passed to it    
``` DELETE /users/:username/lists/:listname/items/:itemId ``` => deletes the item with :itemId and returns a success message  
``` GET /users/:username/lists/:listname/items/:itemId/check ``` => sets completed to true and returns the updated item  
``` GET /users/:username/lists/:listname/items/:itemId/uncheck ``` => sets completed to false and returns the updated item
``` GET /users/:username/lists/:listname/items/:itemId/toggle ``` => toggles the checked/unchecked state of the item  
