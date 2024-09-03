PRAGMA foreign_keys;

-- Enable foreign key constraints
PRAGMA foreign_keys = ON;


select count(*) as total_todos from todos;
delete from users where email_address='geoff@ada.ac.uk';
select count(*) as total_todos from todos;