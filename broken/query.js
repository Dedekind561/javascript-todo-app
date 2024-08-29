const todos = [
  { email_address: "mitchell@ada.ac.uk", todo_id: 1, content: "Do homework" },
  { email_address: "geoff@ada.ac.uk", todo_id: 2, content: "Organise meeting" },
];

function buildInsertString(data) {
  const fields = `(${Object.keys(data[0])})`;
  const values = data.reduce((acc, item, i) => {
    return (
      acc + `('${Object.values(item)}')` + (i < data.length - 1 ? "," : "")
    );
  }, "");
  return [fields, values];
}


console.log(buildInsertString(todos))