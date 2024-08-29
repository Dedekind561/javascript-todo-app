const { describe, expect, test } = require("@jest/globals");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const { setupDB, removeTables } = require("../dbSetup.js");
const SQL = require("../aggregates.js");

describe("SQL helpers", () => {
  let db;

  beforeEach(async () => {
    db = await open({
      filename: "todo.sqlite",
      driver: sqlite3.Database,
    });
    const todos = [
      { email_address: "steve@ada.ac.uk", id: 1, content: "Do homework", priority: "Urgent" },
      { email_address: "geoff@ada.ac.uk", id: 2, content: "Organise meeting", priority: "Urgent" },
      { email_address: "geoff@ada.ac.uk", id: 3, content: "Plan staff training", priority: "Important" },
      { email_address: "geoff@ada.ac.uk", id: 4, content: "Interview candidate lecturer", priority: "Non-important" },
    ];
    const users = [{ email_address: "claire@ada.ac.uk" }, { email_address: "steve@ada.ac.uk" }, { email_address: "geoff@ada.ac.uk" }];
    await removeTables(db);
    await setupDB(db, {
      todos,
      users,
    });
  });

  describe("Aggregates", () => {
    describe("totalUsers()", () => {
      test("calculates the total number of users", async () => {
        const sqlInstance = new SQL(db);
        const result = await sqlInstance.totalUsers();
        expect(result.total_users).toBe(3);
      });
    });
    describe("totalTodos()", () => {
      test("calculates the total number of todos", async () => {
        const sqlInstance = new SQL(db);
        const result = await sqlInstance.totalTodos();
        expect(result.total_todos).toBe(4);
      });
    });
    describe("todosPerUser()", () => {
      test("calculates the number of todos per user", async () => {
        const sqlInstance = new SQL(db);
        const result = await sqlInstance.todosPerUser();
        expect(result).toEqual({
          "claire@ada.ac.uk": {
            total_todos: 0,
          },
          "geoff@ada.ac.uk": {
            total_todos: 3,
          },
          "steve@ada.ac.uk": {
            total_todos: 1,
          },
        });
      });
    });
    describe("todosPerPriority()", () => {
      test("counts the number of todos per priority", async () => {
        const sqlInstance = new SQL(db);
        const result = await sqlInstance.todosPerPriority();
        expect(result).toEqual({
          Urgent: {
            total_todos: 2,
          },
          Important: {
            total_todos: 1,
          },
          "Non-important": {
            total_todos: 1,
          },
        });
      });
    });
  });
});
