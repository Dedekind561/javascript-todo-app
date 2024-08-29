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

  async insertTodo(emailAddress, title, content, priority) {

    // email_address varchar,
    //   todo_id int,
    //   priority varchar,
    //   archive_ind char,
    //   created_dt timestamp
    await this.db.run(
      `
      INSERT INTO todos (email_address,title,content,priority) VALUES ('${emailAddress}','${title}','${content}','${priority}');
      `,
    );
  }

  async updateTodo(title, content, priority, todoId) {
    await this.db.run(`UPDATE todos SET content = ${content}, priority=${priority}, title=${title} WHERE todo_id = ${todoId}`)
  }

  returnTodoById(todoId) {
    return {};
  }

  returnTodoByEmail(emailAddress) {
    return {};
  }

  removeUser(emailAddress) {}
}

module.exports = SQL;
