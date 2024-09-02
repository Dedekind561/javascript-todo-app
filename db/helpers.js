const sqlite3 = require("sqlite3").verbose();

class SQL {
  constructor(db) {
    if (!db) {
      this.db = new sqlite3.Database("todo.sqlite");
    } else {
      this.db = db;
    }
  }

  async returnAllTodos() {
    const result = await this.db.all("select * from todos");
    return result;
  }

  async returnAllUsers() {
    const result = await this.db.all("select * from users");
    return result;
  }

  async returnUsersAndTodos() {
    const result = await this.db.all(`
      select todos.id as id, first_name, content, title, users.email_address, is_complete from todos
      full join users
      on users.email_address = todos.email_address;
      `);
    return result;
  }

  async insertUser({ emailAddress, firstName, lastName, notificationInd }) {
    const result = await this.db.get(
      `
      INSERT INTO users (email_address,first_name, last_name, notification_ind) VALUES ('${emailAddress}','${firstName}','${lastName}','${notificationInd}');
      `,
    );
    return result;
  }

  async insertTodo({ emailAddress, title, content, priority }) {
    const result = await this.db.get(
      `
      INSERT INTO todos (email_address,title,content,priority) VALUES ('${emailAddress}','${title}','${content}','${priority}') returning *;
      `,
    );

    return result;
  }

  async updateTodo({ title, content, priority, todoId, isComplete }) {
    const result = this.db.get(`UPDATE todos SET content = '${content}', priority='${priority}', title='${title}',is_complete=${isComplete} WHERE id = ${todoId} returning *;`);
    return result;
  }

  async returnTodoById(todoId) {
    const result = await this.db.get(`SELECT * FROM todos WHERE id = ${todoId}`);
    return result;
  }

  async returnTodoByEmail(emailAddress) {
    const result = await this.db.get(`SELECT * FROM todos WHERE email_address = '${emailAddress}'`);
    return result;
  }

  async removeUser(emailAddress) {
    await this.db.run("PRAGMA foreign_keys = ON;");
    const result = await this.db.run(`DELETE FROM users WHERE email_address = '${emailAddress}'`);
    return result;
  }
}

module.exports = SQL;
