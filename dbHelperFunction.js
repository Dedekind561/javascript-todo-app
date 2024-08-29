const sqlite3 = require("sqlite3").verbose();
const { groupUsers } = require("./lib/helpers.js");

class SQL {
  constructor(db) {
    if (!db) {
      this.db = new sqlite3.Database("todo.sqlite");
    } else {
      this.db = db;
    }
  }

  async returnUsersAndTodos() {
    const usersAndTodos = await this.db.all(`
      select first_name, content, title, users.email_address from todos
      full join users
      on users.email_address = todos.email_address;
      `);
    return groupUsers(usersAndTodos);
  }

  async returnAllTodos() {
    const todos = await this.db.all("select * from todos");
    return todos;
  }

  async returnAllUsers() {
    const returnAllUsers = await this.db.all("select * from users");
    return returnAllUsers;
  }

  async insertUser(emailAddress, firstName, lastName, notificationInd) {
    return this.db.run(
      `
      INSERT INTO users (email_address,first_name, last_name, notification_ind) VALUES ('${emailAddress}','${firstName}','${lastName}','${notificationInd}');
      `,
    );
  }

  async insertTodo(emailAddress, title, content, priority) {
    return this.db.run(
      `
      INSERT INTO todos (email_address,title,content,priority) VALUES ('${emailAddress}','${title}','${content}','${priority}');
      `,
    );
  }

  async updateTodo(title, content, priority, todoId) {
    return this.db.run(`UPDATE todos SET content = '${content}', priority='${priority}', title='${title}' WHERE todo_id = ${todoId}`);
  }

  async returnTodoById(todoId) {
    return this.db.get(`SELECT * FROM todos WHERE todo_id = ${todoId}`);
  }

  async returnTodoByEmail(emailAddress) {
    return this.db.get(`SELECT * FROM todos WHERE email_address = '${emailAddress}'`);
  }

  async removeUser(emailAddress) {
    return this.db.run(`DELETE FROM users WHERE email_address = '${emailAddress}'`);
  }
}

module.exports = SQL;
