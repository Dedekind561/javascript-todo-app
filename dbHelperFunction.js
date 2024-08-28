const sqlite3 = require("sqlite3").verbose();

class SQL {
  constructor(db) {
    if (!db) {
      this.db = new sqlite3.Database("todo.sqlite");
    } else {
      this.db = db;
    }
  }

  async insertUser(emailAddress, firstName, lastName, notificationInd) {
    await this.db.run(
      `
      INSERT INTO users (email_address,first_name, last_name, notification_ind) VALUES ('${emailAddress}','${firstName}','${lastName}','${notificationInd}');
      `,
    );
  }

  insertTodo(emailAddress, title, content, priority) {}

  updateTodo(title, content, priority, todoId) {}

  returnTodoById(todoId) {
    return {};
  }

  returnTodoByEmail(emailAddress) {
    return {};
  }

  removeUser(emailAddress) {}
}

module.exports = SQL;
