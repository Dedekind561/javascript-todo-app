# 📝 Todo List Application

This README will guide you through the two-part assignment for the TODO List application.

## Table of Contents

1. [📋 Assignment Overview](#-assignment-overview)
2. [⚙️ Check your installation](#️-check-your-installation)
3. [🏗️ Part 1: SQL Query Development](#️-part-1-sql-query-development)
   - [Database Schema](#database-schema)
   - [Required SQL Queries](#required-sql-queries)
   - [Testing SQL Queries](#testing-sql-queries)
4. [🖼️ Part 2: Integration with Todo List UI](#️-part-2-integration-with-todo-list-ui)
   - [Viewing the Todo List UI](#viewing-the-todo-list-ui)
   - [Locating Files to Edit](#locating-files-to-edit)
   - [Integrating SQL Queries](#integrating-sql-queries)
5. [🔄 Resetting the Database](#-resetting-the-database)
6. [🔍 Checking Database State with sqlite3](#-checking-database-state-with-sqlite3)
7. [✅ Acceptance Criteria for Query Outputs](#-acceptance-criteria-for-query-outputs)
8. [🧪 Verifying Query Implementations Using the UI](#-verifying-query-implementations-using-the-ui)
9. [📝 Additional Notes](#-additional-notes)

## 📋 Assignment Overview

This assignment is divided into two parts:

1. **Part 1: SQL Query Development**

   - Create SQL commands to set up database tables
   - Write SQL queries to retrieve and manipulate data according to the business requirements
   - Test the SQL queries using sqlite3

2. **Part 2: Integration with Todo List UI**
   - Integrate the SQL queries from Part 1 into the provided Todo application
   - Implement the queries in the appropriate JavaScript files
   - Test the integration using the Todo List UI

## ⚙️ Check your installation

1. Check you have sqlite3 installed in your project:

```terminal
sqlite3 --version
```

1. Check you have node installed in your project:

```terminal
node -v
```

## 🏗️ Part 1: SQL Query Development

In this part, you will focus on writing SQL queries to set up the database and retrieve data according to the application requirements.

### Database Schema

Create the following tables in your database:

#### `users` table

- `email_address`: VARCHAR, Primary Key
- `first_name`: VARCHAR
- `last_name`: VARCHAR
- `notification_ind`: CHAR(1)

#### `todos` table

- `id`: INTEGER, Primary Key, Auto-increment
- `email_address`: VARCHAR, Foreign Key referencing users(email_address)
- `title`: VARCHAR
- `content`: VARCHAR
- `priority`: CHAR(1)
- `created_dt`: TIMESTAMP
- `is_complete`: INTEGER (0 or 1)

### Required SQL Queries

Write SQL queries for the following operations:

# 📝 Todo List Application

[Previous content remains unchanged]

### Required SQL Queries

Write SQL queries for the following operations. For each query, the expected output format is described:

1. Create the `users` and `todos` tables

   - Output: No result set, but the tables should be created in the database

1. Insert a new user

   - Output: No result set, but the user should be added to the `users` table

1. Insert a new todo for a user

   - Output: No result set, but the todo should be added to the `todos` table

1. Update a todo

   - Output: No result set, but the specified todo should be updated in the `todos` table

1. Select todos by user

   - Output: A result set with columns:
     ```
     id | title | content | priority | created_dt | is_complete
     ```

1. Select a todo by ID

   - Output: A single row result set with columns:
     ```
     id | email_address | title | content | priority | created_dt | is_complete
     ```

1. Remove a user and their todos

   - Output: No result set, but the user and their associated todos should be removed from the database

1. Count the total number of users

   - Output: A single row, single column result set:
     ```
     total_users
     ```

1. Count the total number of todos

   - Output: A single row, single column result set:
     ```
     total_todos
     ```

1. List the number of todos per user

   - Output: A result set with columns:
     ```
     email_address | todo_count
     ```

1. List the number of todos by priority for each user

   - Output: A result set with columns:
     ```
     email_address | urgent_count | high_count | medium_count | low_count
     ```

1. Find the user with the most todos

   - Output: A single row result set with columns:
     ```
     email_address | todo_count
     ```

1. Find the user with the least todos

   - Output: A single row result set with columns:
     ```
     email_address | todo_count
     ```

1. Calculate the average number of todos per user
   - Output: A single row, single column result set:
     ```
     average_todos
     ```

When testing these queries, make sure the output matches the described format. This will ensure that the queries will integrate smoothly with the Todo List application in Part 2 of the assignment.

[Rest of the content remains unchanged]

### Testing SQL Queries

To test your SQL queries:

1. Open a terminal and start the sqlite3 command-line tool:
   ```
   sqlite3 todo.sqlite
   ```
2. Run your SQL queries in the sqlite3 prompt
3. Verify the output matches the expected results

## 🖼️ Part 2: Integration with Todo List UI

In this part, you will integrate the SQL queries you developed in Part 1 into the Todo List application.

### Viewing the Todo List UI

1. Start the todo application frontend by running:

```terminal
npm run listen
```

2. Open a web browser and go to `http://localhost:3000` to view the TODO list UI.

### Locating Files to Edit

The files you'll need to edit are inside the `db` folder:

1. `setup.js`: This file contains code to create tables and insert data.
2. `helpers.js`: This file contains helper functions for database operations.
3. `aggregates.js`: This file contains functions for aggregating data from the database.

### Integrating SQL Queries

In each of the files mentioned above, you'll find functions where you need to insert your SQL queries. For example:

```javascript
async function returnAllTodos() {
  const result = await this.db.all(`
    -- Your SQL query goes here
  `);
  return result;
}
```

Replace the comment with the appropriate SQL query you developed in Part 1.

## 🔄 Resetting the Database

To reset the database to its initial state, use the following npm scripts:

1. To tear down the existing database:

   ```terminal
   npm run teardown:db
   ```

2. To initialize a new database with sample data:

   ```bash
   npm run init:db
   ```

3. To perform both operations in sequence (tear down and then initialize):
   ```bash
   npm run check
   ```

## 🔍 Checking Database State with sqlite3

You can use the sqlite3 command-line tool to directly interact with the database and check its state:

1. Open a terminal.
2. Run the following command to open the SQLite prompt:
   ```
   sqlite3 todo.sqlite
   ```
3. Once in the SQLite prompt, you can run SQL queries to inspect the database. For example:
   - To see all tables: `.tables`
   - To see the schema of a specific table: `.schema table_name`
   - To query data: `SELECT * FROM table_name;`
4. To exit the SQLite prompt, type `.quit` and press Enter.

## ✅ Acceptance Criteria for query outputs

### `db/helpers.js`

When implementing the required functions in `db/helpers.js`, ensure that your function outputs match the following criteria exactly:

1.  `returnAllTodos()`:

- Returns an array of all todo objects from the database:

```javascript
[
  {
    id: 1,
    email_address: "user@example.com",
    priority: "H",
    title: "Todo title",
    content: "Todo content",
    created_at: null,
    is_complete: 0,
  },
  // ... more todos
];
```

1.  `returnAllUsers()`:

- Returns an array of all user objects from the database:

```javascript
[
  {
    email_address: "user@example.com",
    first_name: "User",
    last_name: "Name",
    notification_ind: null,
  },
  // ... more users
];
```

1.  `returnUsersAndTodos()`:

    - Returns an array of objects, each representing a user with their todos:

```js
[
  {
    id: 1,
    first_name: "Steve",
    content: "Do homework",
    title: "Homework",
    email_address: "steve@ada.ac.uk",
    is_complete: 1,
  },
  // .
  // .
  // .
];
// ... more todos with user names
```

1.  `insertUser({ emailAddress, firstName, lastName, notificationInd })`:

    - Inserts a new user into the database.
    - Returns the result of the database operation (implementation-specific).

1.  `insertTodo({ emailAddress, title, content, priority })`:

    - Inserts a new todo into the database.
    - Returns the result of the database operation (implementation-specific).

1.  `updateTodo({ title, content, priority, todoId, isComplete })`:

    - Updates an existing todo in the database.
    - Returns the result of the database operation (implementation-specific).

1.  `returnTodoById(todoId)`:

    - Returns a single todo object matching the given ID:

```javascript
{
  id: 1,
  email_address: "user@example.com",
  priority: "H",
  title: "Todo title",
  content: "Todo content",
  created_dt: null,
  is_complete: 0,
};
```

1.  `returnTodoByEmail(emailAddress)`:

    - Returns an array of todo objects for the given email address:

```javascript
[
  {
    id: 1,
    email_address: "user@example.com",
    priority: "H",
    title: "Todo title",
    content: "Todo content",
    archive_ind: null,
    created_dt: null,
    is_complete: 0,
  },
  // ... more todos for this email
];
```

1.  `removeUser(emailAddress)`:
    - Removes a user and their associated todos from the database.
    - Returns the result of the database operation (implementation-specific).

### `db/aggregates.js`

When implementing the required queries in `aggregates.js`, ensure that your function outputs match the following criteria exactly:

1. `totalUsers()`:

   - Returns a single integer representing the total number of users.

2. `totalTodos()`:

   - Returns a single integer representing the total number of todos.

3. `todosPerUser()`:

   - Returns an array of objects, each with the following structure:

```javascript
{ email: 'user@example.com', total_todos: 5 }
```

4. `todosPerPriority()`:

   - Returns an array of objects, each with the following structure:

```javascript
{
   email_address: 'user@example.com',
   urgent: 1,
   high_priority: 2,
   medium_priority: 3,
   low_priority: 1
}
```

5. `emailOfMaxTodos()`:

   - Returns a single object with the following structure:

```javascript
     { email: 'user@example.com', max_todos: 10 }
```

6. `emailOfMinTodos()`:
   - Returns a single object with the following structure:

```javascript

{ email: 'user@example.com', min_todos: 2 }
```

Note: this function can return a `min_todos` of `0` if there are no todos associated with a given user. If there are multiple users with the same minimum then it should return the first user

## 🧪 Verifying query implementations Using the UI

To ensure your query implementations in `aggregates.js` and `helpers.js` are working correctly, you can interact with the application's user interface. This hands-on approach will help you verify that data is being persisted and retrieved correctly.

1. Start the application:

```terminal

npm run listen

```

2. Open your web browser and navigate to `http://localhost:3000`.

3. Use the following UI features to test your implementations:

a. User Signup:

- Click on "User Signup" and fill out the form with a new user's details.
- After submission, check if the new user appears on the main page with an empty todo list.
- This tests the `insertUser` function in `dbHelperFunction.js`.

b. Add Todo:

- Click on "Add Todo" and create a new todo for an existing user.
- Verify that the new todo appears in the user's list on the main page.
- This tests the `insertTodo` function in `dbHelperFunction.js`.

c. Edit Todo:

- Click the edit icon (pencil) next to an existing todo.
- Modify the todo and save the changes.
- Check if the updates are reflected on the main page.
- This tests the `updateTodo` function in `dbHelperFunction.js`.

d. Remove User:

- Click on "Remove User" and enter an email address to remove.
- Verify that the user and their todos disappear from the main page.
- This tests the `removeUser` function in `dbHelperFunction.js`.

e. View Stats Dashboard:

- Click on "View stats dashboard" to see aggregated data.
- Check if the statistics match your expectations based on the current data.
- This tests various functions in `aggregates.js`, including `totalUsers`, `totalTodos`, `todosPerUser`, and `todosPerPriority`.

4. After each operation, you can use the sqlite3 command-line tool (as described in the "Checking Database State with sqlite3" section) to directly verify the database state.

5. If you notice any discrepancies between the UI, the database state, and your expected results, review and debug your query implementations.

Remember to test edge cases, such as:

- Adding todos for users with no existing todos
- Removing the last todo for a user
- Adding and removing users with various numbers of todos

By systematically testing each feature in the UI and cross-referencing with direct database queries, you can ensure that your implementations are correct and robust.

## 📝 Additional Notes

- Make sure to run `npm run listen` after resetting the database to see the changes reflected in the UI.
- If you encounter any issues, ensure that all dependencies are correctly installed and that you're in the correct directory when running the commands.
- Regularly check your query outputs against the provided acceptance criteria to ensure accuracy.
- When implementing database operations, pay attention to error handling and edge cases to make your code more robust.

Happy coding and testing!
