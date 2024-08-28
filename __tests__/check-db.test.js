const { describe, expect, test } = require("@jest/globals");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const { setupDB, removeTables } = require("../dbSetup.js");

describe("check db", () => {
  let db;

  beforeEach(async () => {
    db = await open({
      filename: "todo.sqlite",
      driver: sqlite3.Database,
    });
    const todos = [
      { email_address: "mitchell@ada.ac.uk" },
      { email_address: "geoff@ada.ac.uk" },
    ];
    const users = [{ email_address: "claire@ada.ac.uk" }];
    await removeTables(db);
    console.log("******");
    await setupDB(db, {
      todos,
      users,
    });
  });
  test("fetches 2 todo records", async () => {
    const todos = await db.all("select * from todos");
    console.log(todos, "<--- todos");
    expect(todos.length).toBe(2);
  });
  test("database is reset (still fetches 2 todos)", async () => {
    const todos = await db.all("select * from todos");
    console.log(todos, "<--- todos");
    expect(todos.length).toBe(2);
  });
});
