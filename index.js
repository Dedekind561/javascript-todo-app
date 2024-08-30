const bodyParser = require("body-parser");
const express = require("express");
const exphbs = require("express-handlebars");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const path = require("path");

const SQL = require("./dbHelperFunction");
const Aggregates = require("./aggregates");

// Boilerplate

const app = express();
(async () => {
  const db = await open({
    filename: "todo.sqlite",
    driver: sqlite3.Database,
  });
  const sql = new SQL(db);

  app.engine(
    ".hbs",
    exphbs.engine({
      defaultLayout: "layout",
      extname: ".hbs",
      helpers: {
        ternary: function (condition, yes, no) {
          return condition ? yes : no;
        },
      },
      partialsDir: path.join(__dirname, "/views/partials"),
    }),
  );
  app.set("view engine", ".hbs");

  app.use(express.static(__dirname + "/views"));
  app.use(
    bodyParser.urlencoded({
      extended: false,
    }),
  );

  // HOME PAGE

  app.get("/", async (req, res) => {
    const users = await sql.returnUsersAndTodos();
    res.render("index", { users });
  });

  // LIST TODOS

  app.get("/list_todos", (req, res) => {
    res.redirect("/");
  });

  app.post("/list_todos", async (req, res) => {
    let email = req.body.email;
    let todos = await sql.returnTodoByEmail(email);
    res.render("list_todos", { todos: todos });
  });

  // EDIT TODO

  app.get("/edit_todo", async (req, res) => {
    const todo = await sql.returnTodoById(req.query.id);
    res.render("edit_todo", { todo });
  });

  app.post("/edit_todo", async (req, res) => {
    let todo_id = req.body.todo_id;
    let todo = await sql.returnTodoById(todo_id);
    res.render("edit_todo", { todo: todo[0] });
  });

  //Handle edit todo form

  app.post("/post_edit_todo", (req, res) => {
    let todo_id = req.body.todo_id;
    let title = req.body.title;
    let content = req.body.content;
    let priority = req.body.priority;
    let isComplete = req.body.is_complete;
    sql.updateTodo(title, content, priority, todo_id, isComplete);
    res.redirect("/");
  });

  // USER SIGNUP

  app.get("/user_signup", (req, res) => {
    res.render("user_signup");
  });

  app.post("/user_signup", (req, res) => {
    let email = req.body.email;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let notificationInd = req.body.notifSettings;

    sql.insertUser(email, firstName, lastName, notificationInd);

    res.redirect("/");
  });

  // ADD TODO

  app.get("/add_todo", async (req, res) => {
    const users = await sql.returnAllUsers();
    res.render("add_todo", {
      users,
    });
  });

  app.post("/add_todo", (req, res) => {
    let email = req.body.email;
    let title = req.body.title;
    let content = req.body.content;
    let priority = req.body.priority;

    sql.insertTodo(email, title, content, priority);

    res.redirect("/");
  });

  // REMOVE USER

  app.get("/remove_user", async (req, res) => {
    const users = await sql.returnAllUsers();
    res.render("remove_user", { users });
  });

  app.post("/remove_user", (req, res) => {
    let email = req.body.email;
    sql.removeUser(email);
    res.redirect("/");
  });

  // VIEW AGGREGATES
  app.get("/all_users", async (req, res) => {
    const user = await SQL.returnTodoById(1);
    res.status(200).send({ user });
  });

  app.get("/view_aggs", async (req, res) => {
    let aggs = new Aggregates(db);
    Promise.all([aggs.totalUsers(), aggs.totalTodos(), aggs.todosPerUser(), aggs.todosPerPriority(), aggs.maxTodos(), aggs.emailOfMaxTodos(), aggs.minTodos(), aggs.emailOfMinTodos()]).then(
      ([totalUsers, totalTodos, todosPerUser, todosPerPriority, maxTodos, emailOfMaxTodos, minTodos, emailOfMinTodos]) => {
        res.render("view_aggs", {
          totalUsers: JSON.stringify(totalUsers),
          totalTodos: JSON.stringify(totalTodos),
          todosPerUser: JSON.stringify(todosPerUser),
          todosPerPriority: JSON.stringify(todosPerPriority),
          maxTodos: JSON.stringify(maxTodos),
          emailOfMaxTodos: JSON.stringify(emailOfMaxTodos),
          minTodos: JSON.stringify(minTodos),
          emailOfMinTodos: JSON.stringify(emailOfMinTodos),
        });
      },
    );
  });

  app.listen(3000, () => {
    console.log(`listening on port 3000...`);
  });
})();
