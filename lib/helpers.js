function groupUsers(users) {
  const groupedUsers = users.reduce((acc, user) => {
    const { content, first_name, email_address: email, is_complete, id } = user;
    if (!acc[user.email_address]) {
      const initialTodo = content ? [{ content, is_complete, id }] : [];
      acc[user.email_address] = { todos: initialTodo, user: first_name, email };
    } else {
      if (content) {
        acc[user.email_address].todos.push({ content, is_complete, id });
      }
    }
    return acc;
  }, {});
  return Object.values(groupedUsers);
}

module.exports = { groupUsers };
