const todos = [
  { email_address: "mitchell@ada.ac.uk", todo_id: 1, content: "Do homework" },
  { email_address: "geoff@ada.ac.uk", todo_id: 2, content: "Organise meeting" },
];

function buildInsertString(data) {
  const fields = `(${Object.keys(data[0])})`;
  const values = data.reduce((acc, item,i) => {
    return (
      acc +
      "(" +
      Object.values(item).reduce((acc, val, i, list) => {
        if (typeof val === "string") val = `'${val}'`;
        return acc + `${val}` + (i < list.length - 1 ? "," : "");
      }, "") +
      ")"  + (i < data.length - 1 ? "," : "")
    );
  }, "");
  return [fields, values];
}

console.log(buildInsertString(todos));
