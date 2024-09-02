const { describe, expect, test } = require("@jest/globals");
const { groupUsers } = require("../lib/helpers.js");

describe("helpers()", () => {
  describe("groupUser()", () => {
    test("group and collect all todos for each user", () => {
      const users = [
        { first_name: "Steve", content: "Do homework", title: "Homework", email_address: "steve@ada.ac.uk", is_complete: 0, id: 1 },
        {
          first_name: "Geoff",
          content: "Organise meeting",
          title: "Meetings",
          email_address: "geoff@ada.ac.uk",
          is_complete: 1,
          id: 2,
        },
        {
          first_name: "Geoff",
          content: "Plan staff training",
          title: "Planning",
          email_address: "geoff@ada.ac.uk",
          is_complete: 1,
          id: 3,
        },
        {
          first_name: "Geoff",
          content: "Interview candidate lecturer",
          title: "Interviews",
          email_address: "geoff@ada.ac.uk",
          is_complete: 0,
          id: 4,
        },
        { first_name: "Claire", content: null, title: null, email_address: "claire@ada.ac.uk", id: 5 },
      ];
      const output = groupUsers(users);
      expect(output).toEqual([
        { user: "Steve", email: "steve@ada.ac.uk", todos: [{ content: "Do homework", id: 1, is_complete: 0 }] },
        {
          user: "Geoff",
          todos: [
            { content: "Organise meeting", id: 2, is_complete: 1 },
            { content: "Plan staff training", id: 3, is_complete: 1 },
            { content: "Interview candidate lecturer", id: 4, is_complete: 0 },
          ],
          email: "geoff@ada.ac.uk",
        },
        { user: "Claire", todos: [], email: "claire@ada.ac.uk" },
      ]);
    });
    test("handles null users", async () => {
      [
        {
          id: 1,
          first_name: "Steve",
          content: "Do homework",
          title: "Homework",
          email_address: "steve@ada.ac.uk",
          is_complete: 1,
        },
        {
          id: 2,
          first_name: null,
          content: "Organise meeting",
          title: "Meetings",
          email_address: null,
          is_complete: 1,
        },
        {
          id: 3,
          first_name: null,
          content: "Plan staff training",
          title: "Planning",
          email_address: null,
          is_complete: 0,
        },
        {
          id: 4,
          first_name: null,
          content: "Interview candidate lecturer",
          title: "Interviews",
          email_address: null,
          is_complete: 0,
        },
      ];
    });
  });
});
