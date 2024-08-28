const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const { setupDB, removeTables } = require("./dbSetup.js");

(async () => {
  const db = await open({
    filename: "todo.sqlite",
    driver: sqlite3.Database,
  });
  await removeTables(db);
  await setupDB(db, {
    todos: [{ email_address: "mitchell@ada.ac.uk", email: "geoff@ada.ac.uk" }],
    users: [{ email_address: "claire@ada.ac.uk" }],
  });
})();
