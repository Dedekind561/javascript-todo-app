const e = require("express");

const sqlite3 = require("sqlite3").verbose();

class SQL {
  constructor(database = "todo.sqlite") {
    this.db = new sqlite3.Database(database);
  }

  async insertUser(emailAddress, firstName, lastName, notificationInd) {
    console.log({emailAddress, firstName, lastName, notificationInd},'inside insertUser...');
    await this.db.run(
      `
      INSERT INTO users (email_address,first_name, last_name, notification_ind) VALUES ('${emailAddress}','${firstName}','${lastName}','${notificationInd} returning *;');
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
