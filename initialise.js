const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const { setupDB, removeTables } = require("./db/setup.js");

(async () => {
  const db = await open({
    filename: "todo.sqlite",
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
})();
