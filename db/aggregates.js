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
    const result = await this.db.get(`select count(*) as total_users from users;`);
    return result.total_users;
  }

  async totalTodos() {
    const result = await this.db.get(`select count(*) as total_todos from todos;`);
    return result.total_todos;
  }

  async todosPerUser() {
    const result = await this.db.all(`
      select count(todos.id) as total_todos, users.email_address as email
      from todos
      right join users
      on users.email_address = todos.email_address 
      group by users.email_address;
      `);
    return result;
  }

  async todosPerPriority() {
    const result = await this.db.all(`
    SELECT 
    u.email_address,
     SUM(CASE WHEN priority = 'U' THEN 1 ELSE 0 END) as urgent,
     SUM(CASE WHEN priority = 'H' THEN 1 ELSE 0 END) as high_priority,
     SUM(CASE WHEN priority = 'M' THEN 1 ELSE 0 END) as medium_priority,
     SUM(CASE WHEN priority = 'L' THEN 1 ELSE 0 END) as low_priority
    FROM users u
    LEFT JOIN 
    todos t ON u.email_address = t.email_address
    GROUP BY u.email_address
    ORDER BY u.email_address;
      `);
    return result;
  }

  async emailOfMaxTodos() {
    const result = await this.db.get(`
    select max(todos.id) as max_todos, users.email_address
    from todos
    right join users
    on users.email_address = todos.email_address;
        `);
    return result;
  }

  async emailOfMinTodos() {
    const result = await this.db.get(`
    select min(ifnull(todos.id, 0)) as min_todos, users.email_address
    from todos
    right join users
    on users.email_address = todos.email_address;
        `);
    return result;
  }

  async avgTodosPerUser() {
    const result = await this.db.get(`
      WITH user_todo_counts AS (
      SELECT count(todos.id) as todo_count, users.email_address
      FROM todos
      right join users
      on users.email_address = todos.email_address
      GROUP BY users.email_address
)
      SELECT AVG(todo_count) as avg_todos_per_user FROM user_todo_counts;
      `);
    return result;
  }
}

module.exports = Aggregates;
