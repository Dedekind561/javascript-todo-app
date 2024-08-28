function buildInsertString(data) {
  const fields = `(${Object.keys(data[0])})`;
  const values = data.reduce((acc, item, i) => {
    return (
      acc + `('${Object.values(item)}')` + (i < data.length - 1 ? "," : "")
    );
  }, "");
  return [fields, values];
}

async function setupDB(db, { todos, users }) {
  const [userFields, userValues] = buildInsertString(users);
  const [todoFields, todoValues] = buildInsertString(todos);
  await db.exec(
    `
    CREATE TABLE users (
      email_address varchar,
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
      email_address varchar,
      todo_id int,
      priority varchar,
      archive_ind char,
      created_dt timestamp
    );
    INSERT INTO todos ${todoFields} VALUES ${todoValues};
      `,
  );
}

async function removeTables(db) {
  const rawDb = db.getDatabaseInstance();
  await rawDb.serialize();
  const tables = await db.all(
    "SELECT name FROM sqlite_master WHERE type='table'",
  );
  await Promise.all(tables.map((table) => db.run(`DROP TABLE ${table.name}`)));
}

module.exports = { setupDB, removeTables };
