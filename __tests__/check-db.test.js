const { describe, expect, test } = require("@jest/globals");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const { setupDB, removeTables } = require("../db/setup.js");
const SQL = require("../db/helpers.js");

describe("SQL helpers", () => {
  let db;

  beforeEach(async () => {
    db = await open({
      filename: "todo_test.sqlite",
      driver: sqlite3.Database,
    });
    const todos = [
      { email_address: "mitch@ada.ac.uk", content: "Do homework" },
      { email_address: "geoff@ada.ac.uk", content: "Organise meeting" },
    ];
    const users = [
      { email_address: "claire@ada.ac.uk" },
      { email_address: "josh@ada.ac.uk" },
      { email_address: "steve@ada.ac.uk" },
      { email_address: "mitch@ada.ac.uk" },
      { email_address: "geoff@ada.ac.uk" },
    ];
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
      await sqlInstance.insertUser({ emailAddress: "yasmine@ada.ac.uk", firstName: "Steve", lastName: "Rich", notificationInd: "x" });
      const user = await db.get("select * from users where first_name='Steve'");
      expect(user.first_name).toBe("Steve");
    });
  });
  describe("insertTodo()", () => {
    test("can insert a todo", async () => {
      const sqlInstance = new SQL(db);
      await sqlInstance.insertTodo({ emailAddress: "claire@ada.ac.uk", title: "Rest", content: "Have a nap", priority: "U" });
      const todo = await db.get("select * from todos where email_address='claire@ada.ac.uk'");
      expect(todo.title).toBe("Rest");
    });
  });
  describe("updateTodo()", () => {
    // async updateTodo(title, content, priority, todoId) {
    test("can update a todo", async () => {
      const sqlInstance = new SQL(db);
      await sqlInstance.updateTodo({ title: "x", content: "Have a nap", priority: "U", todoId: 1, isComplete: "1" });
      const todo = await db.get("select * from todos where id = 1");
      expect(todo.content).toBe("Have a nap");
    });
  });
  describe("returnTodoById()", () => {
    test("returns a todo by id", async () => {
      const sqlInstance = new SQL(db);
      const todo = await sqlInstance.returnTodoById(2);
      expect(todo.id).toBe(2);
      expect(todo.email_address).toBe("geoff@ada.ac.uk");
    });
  });
  describe("returnTodoByEmail()", () => {
    test("returns todo by email", async () => {
      const sqlInstance = new SQL(db);
      const todo = await sqlInstance.returnTodoByEmail("mitch@ada.ac.uk");

      expect(todo.id).toBe(1);
      expect(todo.content).toBe("Do homework");
    });
  });
  describe("removeUser()", () => {
    test("can remove a user", async () => {
      const email = "claire@ada.ac.uk";
      const sqlInstance = new SQL(db);
      const userBeforeDeletion = await db.get(`select * from users where email_address='${email}'`);
      expect(userBeforeDeletion.email_address).toBe(email);
      await sqlInstance.removeUser(email);
      const user = await db.get(`select * from users where email_address='${email}'`);
      expect(user).toBeFalsy();
    });
  });
});
