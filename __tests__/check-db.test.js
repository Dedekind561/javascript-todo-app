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
      { email_address: "mitchell@ada.ac.uk" },
      { email_address: "geoff@ada.ac.uk" },
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
  test("can add a user to the database", async () => {
    const sqlInstance = new SQL(db);
    await sqlInstance.insertUser("steve@ada.ac.uk", "Steve", "Rich", "x");
    const user = await db.get("select * from users where first_name='Steve'");
    expect(user.first_name).toBe("Steve");
  });
});
