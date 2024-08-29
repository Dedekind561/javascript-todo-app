
select count(todos.id) as total_todos
from todos
right join users
on users.email_address = todos.email_address 
GROUP BY users.email_address;


select * from todos;

-- find max number of todos via email
select max(todos.id) as total_todos
from todos
right join users
on users.email_address = todos.email_address 
GROUP BY users.email_address;

-- select all users and todos
select first_name, content, title from todos
full join users
on users.email_address = todos.email_address;
