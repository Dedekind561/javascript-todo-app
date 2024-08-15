# Welcome to the Todo app

The purpose of this exercise is to test your knowledge of SQL and your ability to use it with your programming language.

## Let's get started
In JavaScript when we first open our app we will have to install the libraries it uses. In the terminal type ```npm i```

To start the app we need to first run the file _dbSetup_. This will setup the database _todo.db_ and (once you've wrote the code to do so) will create the user and todo tables.

In the terminal type the following command:

For JavaScript:
```node dbSetup.js```

If you ever want to do a hard reset of your app where you will delete all the tables and data in them you need to delete _todo.db_ and rerun the commands above. This will be useful if for example you've made an error when creating your tables. **Note if you do this it will delete any data you've added to your database.**

## Running your app
To run your app, type ``` node index.js ``` for JavaScript in the terminal. You should then get a pop up that asks if you want to Open in Browser. Select this option and your app should open in the browser.

Now it's set up for you to use the app. When you make changes to the app ppress CTRL+C in the terminal then rerun your app. In your tab that is running your app, refresh the page. Your changes should now be working on your app.

## About the app
This app has a few pieces of basic functionality:
 - Creating a user
 - Creating a todo
 - Viewing a users todos
 - Editing a todo
 - Deleting a user

The basic functionality should work in a logical way. For example you shouldn't be able to have todos for a user that doesn't exist and each email should only exist once.

## Tasks to complete
For all the tasks you **must** use the function names, table names and column names specified. Your app may not work and you will be marked down if you do not.

### In dbSetup.js:

This file is all about setting up your database and the tables in it. It will be run when you start or do a hard reset of your app. Make sure your table names and field names are exactly the same and are in the same order. This is important for the application to run correctly.

Create a table called ```user```. It should have the fields:
- ```email_address``` - varchar and primary key
- ```first_name``` - varchar
- ```last_name```  - varchar
- ```notification_ind``` - char of length 1

Create a table called ```todo```. It should have the fields:
- ```todo_id``` - integer and primary key, this should auto increment when new todos are added
- ```email_address``` - varchar
- ```title``` - varchar
- ```content``` - varchar
- ```priority``` - char of length 1
- ```archive_ind``` -  char of length 1 with a default value of 0
- ```created_dt``` - timestamp that defaults to the current_timestamp


## In _dbHelperFunction_:

This file contains all the queries that will make your app run. The queries you write will help with functionality such as adding users and returning lists of todos for the app to use. Pay attention to whether the function needs to return something and if it does, what it returns.

Finish the implementation of the following functions with the specified functionality:

### _insert_user / insertUser:_
- Insert a user into the user table

### _insert_todo / insertTodo:_
- Insert a todo into the todo table a new user should have an auto incremented and unique todo_id

### _update_todo / updateTodo:_
- Update the title, content and priority of a todo for a given todo_id

### _return_todos_by_email / returnTodosByEmail:_
- Return all the todos for a given email address. This should return a list of todos

### _return_todo_by_todo_id / returnTodoByTodoId:_
- Return the todo for a given todo_id. This should only return one todo as a list of length one

### _remove_user / removeUser:_
- Delete a user based on their email address

## In _aggregates_:

In this file you will write queries that will collect data about the use of the app.

**_In JavaScript_** - each function has been set up with a sample query in it. The functions will return a Promise. Replace the sample query with the query you want the function to return.

If you want to view the results of these functions open your application up in a new tab and add _/view_aggs_ to the address bar.

Finish the implementation of the following functions:

- _total_users_ - How many users are there?
- _total_todos_ - How many todos are there?
- _todos_per_user_ - What is the mean number of todos per user?
- _todos_per_priority_ - How many todos are there for each priority?
- _max_todos_ - What is the maximum number of todos any email had associated with it?
- _email_of_max_todos_ - Which email address(es) had the most todos associated with it?
- _min_todos_ - What is the minimum number of todos any email had associated with it?
- _email_of_min_todos_ - Which email address(es) had the fewest todos associated with it?


## Things to think about:
 - You are not required to answer all parts of the assignment but the more you do the more marks you will get.
 - It's an idea to start off by writing all your SQL statements in an SQL file. It will be much easier to test them all in there then it will to test them in the app.
 - You can submit just an SQL file if you are unable to integrate the queries into the app. Some of the marks are for the integration but it is still possible to get a merit in this case. If you submit this way make sure your SQL file is well commented with explanations as to how this query would work in the app.
