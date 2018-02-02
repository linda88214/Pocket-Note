# Pocket Note

### A. What is this app about? 

Modern people are increasingly using cell phones rather than notebooks and pencils. People are playing games, read books, listen to songs and take notes on smartphones. On my app call "Pocket Note",  users can check the current weather in the app and take note. And all that data can be saved and the user can check when the user wants to open it later.
A user must sign in to run the app since the notes are only for that specified user. 


### B. What features does it include? 

##### Login Page 
- User ID input
- User Password input
- Login button
- Sign up button

##### Sign up Page 
- User First Name input
- User email address input
- User password input
- Submit button
- Back to login button 

##### Main Page 
- Today's Date
- List of Notes
- Edit button 
- Delete button with alert to confirm 
- create new button
- log out button

##### Create New Page 
- Today's Date 
- Today's Weather city input
- Weather result 
- Text area
- Submit Button


### C. Were there any particular pain points or unsolved problems you had to manage? (e.g. technological, timing, content, etc.)

###### Pain Points 

I had syntax error on every CRUD. 
I was struggling with delete also. I didn’t know what was the problem when I was getting id = null. 
First, I checked if the delete button was getting clicked by console logging it and it wasn’t. Figured that the script file was not connected to the html file. 
Second, it was console logging the ‘clicked’ when I click the button, but the comments were not getting deleted. It was getting id = null. 
So I console logged the req.params.id on model and it was not getting the id number from there. 
I was confused why it wasn’t getting the id number and found out that the syntax on controller and model has to be matched. 
On controller, it was “/weathercomments/:weatherCommentsId and on model, it was req.params.id. 
When I changed the syntax on controller to “/weathercomments/:id matching with the model’s req.params.id it was deleting the comments. 


### D. NPM Packages used
[Morgan](https://www.npmjs.com/package/morgan)
[Express](https://www.npmjs.com/package/express)
[Mustache-Express](https://www.npmjs.com/package/mustache-express)
[Body-parser](https://www.npmjs.com/package/body-parser)
[Cookie-parser](https://www.npmjs.com/package/cookie-parser)
[Express-session](https://www.npmjs.com/package/express-session)
[Pg-promise](https://www.npmjs.com/package/pg-promise)
[Moment.js](https://www.npmjs.com/package/moment)


### E. Technology I intend to use 
HTML, CSS, JavaScript, jQuery, Node.js, PSQL, Ajax/Axios, Pg-promise, Express, Mustache 


### F. Link to app
[POCKET NOTE](https://pocket-note.herokuapp.com/login)