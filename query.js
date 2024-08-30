const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

(async () => {
  const db = await open({
    filename: "todo.sqlite",
    driver: sqlite3.Database,
  });
  const users = await db.all("select * from users;");
  const todos = await db.all("select * from todos;");
})();
