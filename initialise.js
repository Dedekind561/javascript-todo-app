const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const { setupDB, removeTables } = require("./dbSetup.js");

(async () => {
  const db = await open({
    filename: "todo.sqlite",
    driver: sqlite3.Database,
  });
  const todos = [
    { email_address: "steve@ada.ac.uk", id: 1, content: "Do homework", priority: "Urgent", title: "Homework", is_complete: 1 },
    { email_address: "geoff@ada.ac.uk", id: 2, content: "Organise meeting", priority: "Urgent", title: "Meetings", is_complete: 1 },
    { email_address: "geoff@ada.ac.uk", id: 3, content: "Plan staff training", priority: "Important", title: "Planning", is_complete: 0 },
    { email_address: "geoff@ada.ac.uk", id: 4, content: "Interview candidate lecturer", priority: "Non-important", title: "Interviews", is_complete: 0 },
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
})();
