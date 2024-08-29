function groupUsers(users) {
  const groupedUsers = users.reduce((acc, user) => {
    if (!acc[user.email_address]) {
      acc[user.email_address] = { todos: [user.content], user: user.first_name, email: user.email_address };
    } else {
      acc[user.email_address].todos.push(user.content);
    }
    return acc;
  }, {});
  return Object.values(groupedUsers);
}

module.exports = { groupUsers };
