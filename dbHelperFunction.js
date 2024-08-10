const sqlite3 = require('sqlite3').verbose()


class SQL {

  constructor(database="todo.sqlite") {
    this.db = new sqlite3.Database(database);
  }

  
  insertUser(emailAddress, firstName, lastName, notificationInd) {
    }

  
  insertTodo(emailAddress, title, content, priority) {
    }

  
  updateTodo(title, content, priority, todoId) {
    }

  
  returnTodoById(todoId)  {
    return {}
    }

  
  returnTodoByEmail(emailAddress)  {
    return {}
    }
  

  removeUser(emailAddress) {
    }

  
}
    

module.exports = SQL;