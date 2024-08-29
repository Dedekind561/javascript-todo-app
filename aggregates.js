const sqlite3 = require("sqlite3").verbose();

class Aggregates {
  constructor(db) {
    if (!db) {
      this.db = new sqlite3.Database("todo.sqlite");
    } else {
      this.db = db;
    }
  }

  async totalUsers() {
    return this.db.get(`select count(*) as total_users from users`);
  }

  async totalTodos() {
    return this.db.get(`select count(*) as total_todos from todos`);
  }

  async todosPerUser() {
    const result = await this.db.all(`
      select count(todos.id) as total_todos, users.email_address as email
      from todos
      right join users
      on users.email_address = todos.email_address 
      group by users.email_address
      `);
    const todosPerUser = result.reduce((acc, { total_todos, email }) => {
      acc[email] = { total_todos };
      return acc;
    }, {});
    return todosPerUser;
  }

  async todosPerPriority() {
    const result = await this.db.all(`
      select count(todos.id) as total_todos, priority
      from todos
      group by priority
      `);
    const todosPerPriority = result.reduce((acc, { total_todos, priority }) => {
      acc[priority] = { total_todos };
      return acc;
    }, {});
    return todosPerPriority;
  }

  async maxTodos() {
    return {}
  }

  async emailOfMaxTodos() {
    return {}
  }

  async minTodos() {

    return {}
  }

  async emailOfMinTodos() {
    return {}
  }
}

module.exports = Aggregates;
