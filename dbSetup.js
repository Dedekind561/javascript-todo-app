function buildInsertString(data) {
  const fields = `(${Object.keys(data[0])})`;
  const values = data.reduce((acc, item, i) => {
    return (
      acc +
      "(" +
      Object.values(item).reduce((acc, val, i, list) => {
        if (typeof val === "string") val = `'${val}'`;
        return acc + `${val}` + (i < list.length - 1 ? "," : "");
      }, "") +
      ")" +
      (i < data.length - 1 ? "," : "")
    );
  }, "");
  return [fields, values];
}

// buildInsertString() not working for an array of todos

async function setupDB(db, { todos, users }) {
  const [userFields, userValues] = buildInsertString(users);
  const [todoFields, todoValues] = buildInsertString(todos);
  await db.exec(
    `
    CREATE TABLE users (
      email_address varchar primary key,
      first_name varchar,
      last_name varchar,
      notification_ind char
    );
    INSERT INTO users ${userFields} VALUES ${userValues};
    `,
  );
  await db.exec(
    `
    create table todos (
      id integer primary key autoincrement,
      email_address varchar,
      priority varchar,
      title varchar,
      content varchar,
      archive_ind char,
      created_dt timestamp,
      FOREIGN KEY (email_address) REFERENCES users(email_address)
    );
    INSERT INTO todos ${todoFields} VALUES ${todoValues};
      `,
  );
}

async function removeTables(db) {
  const rawDb = db.getDatabaseInstance();
  await rawDb.serialize();
  const tables = await db.all("SELECT name FROM sqlite_master WHERE type='table'");
  await Promise.all(
    tables
      .filter(({name}) => {
        return name !== "sqlite_sequence";
      })
      .map((table) => db.run(`DROP TABLE ${table.name}`)),
  );
}

module.exports = { setupDB, removeTables };
