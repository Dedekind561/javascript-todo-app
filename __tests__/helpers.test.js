const { describe, expect, test } = require("@jest/globals");

function groupUsers(users) {
  const groupedUsers = users.reduce((acc, user) => {
    if (!acc[user.email]) {
      acc[user.email_address] = { todos: [user.content], user: user.first_name, email: user.email_address };
    } else {
      console.log(acc[user.email_address])
      acc[user.email_address].todos.push(user.content);
    }
    return acc;
  }, {});
  return Object.values(groupedUsers);
}

describe("helpers()", () => {
  describe("", () => {
    test("another test here...", () => {
      const users = [
        { first_name: "Steve", content: "Do homework", title: "Homework", email_address: "steve@ada.ac.uk" },
        {
          first_name: "Geoff",
          content: "Organise meeting",
          title: "Meetings",
          email_address: "geoff@ada.ac.uk",
        },
        {
          first_name: "Geoff",
          content: "Plan staff training",
          title: "Planning",
          email_address: "geoff@ada.ac.uk",
        },
        {
          first_name: "Geoff",
          content: "Interview candidate lecturer",
          title: "Interviews",
          email_address: "geoff@ada.ac.uk",
        },
        { first_name: "Claire", content: null, title: null, email_address: "claire@ada.ac.uk" },
      ];
      const output = groupUsers(users);
      console.log(output)
      expect(output).toEqual([
        {user:'Steve', email: 'steve@ada.ac.uk', todos: ['Do homework']},
        {user: 'Geoff', todos: ["Organise meeting", "Plan staff training","Interview candidate lecturer"]}
      ])
    });
  });
});
