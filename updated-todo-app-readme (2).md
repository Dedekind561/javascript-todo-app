# 📝 TODO List Application

This README will guide you through setting up, working with, and testing the TODO List application.

## Table of Contents

1. [⚙️ Check your installation](#️-check-your-installation)
2. [🖼️ Viewing the Todo List UI](#️-viewing-the-todo-list-ui)
3. [📂 Locating Files to Edit](#-locating-files-to-edit)
4. [💻 Working on this assignment](#-working-on-this-assignment)
5. [🔄 Resetting the Database](#-resetting-the-database)
6. [🔍 Checking Database State with sqlite3](#-checking-database-state-with-sqlite3)
7. [✅ Acceptance Criteria for Query Outputs](#-acceptance-criteria-for-query-outputs)
   - [aggregates.js](#aggregatesjs)
   - [dbHelperFunction.js](#dbhelperfunctionjs)
8. [🧪 Verifying Query Implementations Using the UI](#-verifying-query-implementations-using-the-ui)
9. [📝 Additional Notes](#-additional-notes)

## ⚙️ Check your installation

1. Check you have node installed in your project

```terminal
node -v
```

2. Check you have sqlite3 installed in your project:

```terminal
sqlite3 --version
```

## 🖼️ Viewing the TODO List UI

1. Start the todo application frontend by running:

```terminal
npm run listen
```

2. Open a web browser and go to `http://localhost:3000` to view the TODO list UI.

## 📂 Locating Files to Edit

The files you'll need to edit are:

1. `dbSetup.js`: This file contains code to create tables and insert data.

   - Location: Root directory of the project

2. `dbHelperFunction.js`: This file contains helper functions for database operations.

   - Location: Root directory of the project

3. `aggregates.js`: This file contains functions for aggregating data from the database.
   - Location: Root directory of the project

## 💻 Working on this assignment

[Content for this section remains unchanged]

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

[Content for this section remains unchanged]

## ✅ Acceptance Criteria for Query Outputs

[Content for this section remains unchanged]

## 🧪 Verifying Query Implementations Using the UI

[Content for this section remains unchanged]

## 📝 Additional Notes

[Content for this section remains unchanged]

Happy coding and testing!
