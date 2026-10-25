app.js
const fs = require("fs");
const fileName = "employee.txt";
const data = "Employee Name: Pavithra\nEmployee ID: 001";
 
fs.writeFile(fileName, data, "utf8", (writeError) => {
  if (writeError) {
    console.error("Write error:", writeError.message);
    return;
  }
  console.log("File created successfully.");
 
  fs.readFile(fileName, "utf8", (readError, content) => {
    if (readError) {
      console.error("Read error:", readError.message);
      return;
    }
    console.log("File contents:\n" + content);
  });
});


-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
Steps to run:
1. Install Node.js.
2. Create a folder and save the code as app.js.
3. Open a terminal in that folder.
4. Run: node app.js
5. The terminal displays the file contents and employee.txt is created in the folder.
