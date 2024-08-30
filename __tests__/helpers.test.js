const { describe, expect, test } = require("@jest/globals");
const { groupUsers } = require("../lib/helpers.js");

describe("helpers()", () => {
  describe("", () => {
    test("group and collect all todos for each user", () => {
      const users = [
        { first_name: "Steve", content: "Do homework", title: "Homework", email_address: "steve@ada.ac.uk", is_complete: 0 },
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
      expect(output).toEqual([
        { user: "Steve", email: "steve@ada.ac.uk", todos: ["Do homework"] },
        { user: "Geoff", todos: ["Organise meeting", "Plan staff training", "Interview candidate lecturer"], email: "geoff@ada.ac.uk" },
        { user: "Claire", todos: [null], email: "claire@ada.ac.uk" },
      ]);
    });
  });
});
