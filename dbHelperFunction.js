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
   // performs a delete query on the database...
  }
}

module.exports = SQL;
