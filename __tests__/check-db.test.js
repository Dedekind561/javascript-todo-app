const { describe, expect, test } = require("@jest/globals");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const { setupDB, removeTables } = require("../dbSetup.js");
const SQL = require("../dbHelperFunction.js");

describe("check db", () => {
  let db;

  beforeEach(async () => {
    db = await open({
      filename: "todo.sqlite",
      driver: sqlite3.Database,
    });
    const todos = [
      { email_address: "mitchell@ada.ac.uk", todo_id: 1, content: 'Do homework' },
      { email_address: "geoff@ada.ac.uk" , todo_id: 2, content: 'Organise meeting'},
    ];
    const users = [{ email_address: "claire@ada.ac.uk" }];
    await removeTables(db);
    await setupDB(db, {
      todos,
      users,
    });
  });
  test("fetches 2 todo records", async () => {
    const todos = await db.all("select * from todos");
    expect(todos).toHaveLength(2);
  });
  test("database is reset (still fetches 2 todos)", async () => {
    const todos = await db.all("select * from todos");
    expect(todos).toHaveLength(2);
  });

  describe("addUser()", () => {
    test("can add a user to the database", async () => {
      const sqlInstance = new SQL(db);
      await sqlInstance.insertUser("steve@ada.ac.uk", "Steve", "Rich", "x");
      const user = await db.get("select * from users where first_name='Steve'");
      expect(user.first_name).toBe("Steve");
    });
  });
  describe("insertTodo()", () => {
    test("can insert a todo", async () => {
      // insertTodo(emailAddress, title, content, priority) {}
      // async updateTodo(title, content, priority, todoId) {
      const sqlInstance = new SQL(db);
      await sqlInstance.updateTodo('my todo',)
      const todo = await db.get(
        "select * from todos where email_address='lily@ada.ac.uk'",
      );
      expect(todo.title).toBe("Reminder assessments");
    });
  });
  describe("updateTodo()", () => {
    // async updateTodo(title, content, priority, todoId) {
    test("can update a todo", async () => {
      const sqlInstance = new SQL(db);
      await sqlInstance.updateTodo(
        'x',
        'Have a nap',
        'Urgent',
        1
      );
      const todo = await db.get(
        "select * from todos where todo_id = 1",
      );
      expect(todo.content).toBe("Have a nap");
    });
  });
});
