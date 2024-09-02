# 📝 Todo List Application

This README will guide you through setting up, working with, and testing the TODO List application.

## Table of Contents

1. [⚙️ Check your installation](#️-check-your-installation)
2. [🖼️ Viewing the Todo List UI](#️-viewing-the-todo-list-ui)
3. [📂 Locating Files to Edit](#-locating-files-to-edit)
4. [💻 Working on this assignment](#-working-on-this-assignment)
5. [🔄 Resetting the Database](#-resetting-the-database)
6. [🔍 Checking Database State with sqlite3](#-checking-database-state-with-sqlite3)
7. [🏗️ Creating Database Tables](#️-creating-database-tables)
8. [✅ Acceptance Criteria for Query Outputs](#-acceptance-criteria-for-query-outputs)
   - [dbHelperFunction.js](#dbhelperfunctionjs)
   - [aggregates.js](#aggregatesjs)
9. [🧪 Verifying Query Implementations Using the UI](#-verifying-query-implementations-using-the-ui)
10. [📝 Additional Notes](#-additional-notes)

## ⚙️ Check your installation

1. Check you have node installed in your project:

```terminal
node -v
```

2. Check you have sqlite3 installed in your project:

```terminal
sqlite3 --version
```

## 🖼️ Viewing the Todo List UI

1. Start the todo application frontend by running:

```terminal
npm run listen
```

2. Open a web browser and go to `http://localhost:3000` to view the TODO list UI.

## 📂 Locating Files to Edit

The files you'll need to edit are inside the `db` folder:

1. `setup.js`: This file contains code to create tables and insert data.

1. `helpers.js`: This file contains helper functions for database operations.

1. `aggregates.js`: This file contains functions for aggregating data from the database.

## 💻 Working on this assignment

We want to reassure you that your primary focus should be on writing effective SQL queries. Here's what you need to know:

### What You Need to Do:

- Your main task is to write SQL queries within the backticks (` `) in the `aggregates.js`, `helpers.js` and `setup.js` files inside the `db` folder.
- Focus on crafting correct SQL statements to retrieve or manipulate the data as required by each function.

### What You Don't Need to Worry About:

- You don't need to implement any JavaScript logic outside of these SQL queries.
- The surrounding JavaScript code, including function structures and database connections, is already set up for you.
- You don't need to modify how the results are returned or how the functions are called.

### Example:

Here's a simplified example of what you'll be working with:

```javascript
async function returnAllTodos() {
  const result = await this.db.all(`
  -- Your SQL query goes here..
  `);
  return result;
}
```

Your job is to replace the comment and sample query with the appropriate SQL to fulfill the function's purpose.

### Tips:

- Pay attention to the function names and descriptions to understand what data needs to be retrieved or what operation needs to be performed.
- Use the database schema provided earlier in this README as a reference for table and column names.
- Test your queries thoroughly using the UI and sqlite3 command-line tool as described in other sections.

Remember, the goal is to develop your SQL skills. The JavaScript environment is there to support your learning, not to complicate it. If you have any questions about the JavaScript aspects, feel free to ask, but your primary focus should be on writing effective SQL queries.

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

These scripts are defined in the `package.json` file and provide an easy way to manage the database state during development and testing.

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

## 🏗️ Creating Database Tables

You will need to create the following tables in your database. You can edit `db/setup.js` to write SQL queries for creating database tables.

### `users`

- `email_address`: A unique identifier for each user (primary key)
- `first_name`: The user's first name
- `last_name`: The user's last name
- `notification_ind`: A single character indicating the user's notification preferences

### `todos`

- `id`: A unique identifier for each todo, automatically incremented
- `email_address`: The email address of the user who owns this todo (foreign key referencing the users table)
- `title`: The title of the todo
- `content`: The content or description of the todo
- `priority`: A single character indicating the priority of the todo (can be one of `'U'`, `'H'`, `'M'` or `'L'`)
- `created_at`: A timestamp of when the todo was created (defaults to the current timestamp)

To execute these SQL commands:

1. Open the SQLite prompt as described in the "Checking Database State with sqlite3" section.
2. Copy and paste each CREATE TABLE command into the prompt and press Enter.
3. Verify the table creation by using the `.tables` command to list all tables, and `.schema table_name` to view the structure of a specific table.

Note: The existing scripts in the project may already handle table creation. Use these commands if you need to manually recreate the tables or if you're setting up a new database instance.

## ✅ Acceptance Criteria for query outputs

### `db/helpers.js`

When implementing the required functions in `db/helpers.js`, ensure that your function outputs match the following criteria exactly:

1.  `returnAllTodos()`:

- Returns an array of all todo objects from the database:

```javascript
[
  { id: 1, email_address: "user@example.com", priority: "H", title: "Todo title", content: "Todo content", created_at: null, is_complete: 0 },
  // ... more todos
];
```

1.  `returnAllUsers()`:

- Returns an array of all user objects from the database:

```javascript
[
  { email_address: "user@example.com", first_name: "User", last_name: "Name", notification_ind: null },
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

````javascript
      { id: 1, email_address: 'user@example.com', priority: 'H', title: 'Todo title', content: 'Todo content', created_dt: null, is_complete: 0 }
```

1.  `returnTodoByEmail(emailAddress)`:

    - Returns an array of todo objects for the given email address:

```javascript
[
  { id: 1, email_address: "user@example.com", priority: "H", title: "Todo title", content: "Todo content", archive_ind: null, created_dt: null, is_complete: 0 },
  // ... more todos for this email
];
````

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

````javascript
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

````

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
