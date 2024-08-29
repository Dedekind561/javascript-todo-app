const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const { setupDB, removeTables } = require("./dbSetup.js");

(async () => {
  const db = await open({
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
    users
  });
})();
