
.mode column
.headers on


WITH user_todo_counts AS (
      SELECT count(todos.id) as todo_count, users.email_address
      FROM todos
      right join users
      on users.email_address = todos.email_address
      GROUP BY users.email_address
)
SELECT min(todo_count) as min_todos, email_address FROM user_todo_counts;

WITH user_todo_counts AS (
      SELECT count(todos.id) as todo_count, users.email_address
      FROM todos
      right join users
      on users.email_address = todos.email_address
      GROUP BY users.email_address
)
SELECT max(todo_count) as max_todos, email_address FROM user_todo_counts;

WITH user_todo_counts AS (
      SELECT count(todos.id) as todo_count, users.email_address
      FROM todos
      right join users
      on users.email_address = todos.email_address
      GROUP BY users.email_address
)
SELECT avg(todo_count) as avg_todos_per_user, email_address FROM user_todo_counts;

