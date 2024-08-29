const users = [
  { first_name: "Steve", content: "Do homework", title: "Homework" , email_address: 'steve@ada.ac.uk'},
  {
    first_name: "Geoff",
    content: "Organise meeting",
    title: "Meetings",
    email_address: 'geoff@ada.ac.uk'
  },
  {
    first_name: "Geoff",
    content: "Plan staff training",
    title: "Planning",
    email_address: 'geoff@ada.ac.uk'
  },
  {
    first_name: "Geoff",
    content: "Interview candidate lecturer",
    title: "Interviews",
    email_address: 'geoff@ada.ac.uk'
  },
  { first_name: "Claire", content: null, title: null , email_address: 'claire@ada.ac.uk'},
];

function groupUsers(users) {
  const groupedUsers =  users.reduce((acc, user) => {
    if (!acc[user.first_name]) {
      acc[user.first_name] = [user.content];
    } else {
      acc[user.first_name].push(user.content);
    }
    return acc;
  }, {});
  const entries = Object.entries(groupedUsers);
  return entries.map(([user, todos]) => {
    return { user, todos };
  });
}

console.log(groupUsers(users))