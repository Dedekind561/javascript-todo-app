const sqlite3 = require('sqlite3').verbose()

function dbSetup() {
  let db = new sqlite3.Database("todo.sqlite");
  
  db.run( // Insert query below
    `
    `);


  db.run( // Insert query below
    `
    `);

  db.close()
}

dbSetup()