const { describe, expect, test } = require("@jest/globals");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const { setupDB, removeTables } = require("../db/setup.js");
const SQL = require("../db/aggregates.js");

describe("SQL helpers", () => {
  let db;

  beforeEach(async () => {
    db = await open({
      filename: "todo_test.sqlite",
      driver: sqlite3.Database,
    });
    const todos = [
      { email_address: "steve@ada.ac.uk", content: "Do homework", priority: "H", title: "Homework", is_complete: 1 },
      { email_address: "geoff@ada.ac.uk", content: "Organise meeting", priority: "H", title: "Meetings", is_complete: 1 },
      { email_address: "geoff@ada.ac.uk", content: "Plan staff training", priority: "L", title: "Planning", is_complete: 0 },
      { email_address: "geoff@ada.ac.uk", content: "Interview candidate lecturer", priority: "M", title: "Interviews", is_complete: 0 },
      { email_address: "geoff@ada.ac.uk", content: "Plan all staff day", priority: "M", title: "Interviews", is_complete: 0 },
      { email_address: "geoff@ada.ac.uk", content: "Walk the dog", priority: "L", title: "Interviews", is_complete: 0 },
    ];
    const users = [
      { email_address: "claire@ada.ac.uk", first_name: "Claire" },
      { email_address: "steve@ada.ac.uk", first_name: "Steve" },
      { email_address: "geoff@ada.ac.uk", first_name: "Geoff" },
    ];
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
        expect(result.total_todos).toBe(6);
      });
    });
    describe("todosPerUser()", () => {
      test("calculates the number of todos per user", async () => {
        const sqlInstance = new SQL(db);
        const result = await sqlInstance.todosPerUser();
        expect(result).toEqual([
          { email: "claire@ada.ac.uk", total_todos: 0 },
          { email: "geoff@ada.ac.uk", total_todos: 5 },
          { email: "steve@ada.ac.uk", total_todos: 1 },
        ]);
      });
    });
    describe("todosPerPriority()", () => {
      test("counts the number of todos per priority", async () => {
        const sqlInstance = new SQL(db);
        const result = await sqlInstance.todosPerPriority();
        expect(result).toEqual([
          { email_address: "claire@ada.ac.uk", high_priority: 0, low_priority: 0, medium_priority: 0, urgent: 0 },
          { email_address: "geoff@ada.ac.uk", high_priority: 1, low_priority: 2, medium_priority: 2, urgent: 0 },
          { email_address: "steve@ada.ac.uk", high_priority: 1, low_priority: 0, medium_priority: 0, urgent: 0 },
        ]);
      });
    });
    describe("emailOfMaxTodos()", () => {
      test("can get the email of user with the most todos", async () => {
        const sqlInstance = new SQL(db);
        const result = await sqlInstance.emailOfMaxTodos();
        expect(result.email_address).toBe("geoff@ada.ac.uk");
      });
    });
    describe("avgTodosPerUser()", () => {
      test("can get the email of user with the most todos", async () => {
        const sqlInstance = new SQL(db);
        const result = await sqlInstance.avgTodosPerUser();
        expect(result.avg_todos_per_user).toBe(2.0);
      });
    });
  });
});
