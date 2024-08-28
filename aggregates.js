var sqlite3 = require('sqlite3').verbose()

class Aggregates {
  constructor(database="todo.sqlite") {
    this.db = new sqlite3.Database(database);
  }

 totalUsers()  {
    return new Promise((resolve, reject) => {
            this.db.all(
              // Write query in the quotes below
              `select * from user`,
              (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

  totalTodos()  {
    return new Promise((resolve, reject) => {
            this.db.all(
              // Write query in the quotes below
              `select * from user`,
              (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

  todosPerUser()  {
    return new Promise((resolve, reject) => {
            this.db.all(
              // Write query in the quotes below
              `select * from user`,
              (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

  todosPerPriority()  {
    return new Promise((resolve, reject) => {
            this.db.all(
              // Write query in the quotes below
              `select * from user`,
              (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

  maxTodos()  {
    return new Promise((resolve, reject) => {
            this.db.all(
              // Write query in the quotes below
              `select * from user`,
              (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

  emailOfMaxTodos()  {
    return new Promise((resolve, reject) => {
            this.db.all(
              // Write query in the quotes below
              `select * from user`,
              (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

  minTodos()  {
    return new Promise((resolve, reject) => {
            this.db.all(
              // Write query in the quotes below
              `select * from user`,
              (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

  emailOfMinTodos()  {
    return new Promise((resolve, reject) => {
            this.db.all(
              // Write query in the quotes below
              `select * from user`,
              (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
}


module.exports = Aggregates