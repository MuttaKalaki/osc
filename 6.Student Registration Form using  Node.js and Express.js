
Setup
mkdir student-registration
cd student-registration
npm init -y
npm install express express-session
app.js
const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();
 
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: "replace-this-demo-secret",
  resave: false,
  saveUninitialized: false
}));
 
const page = (title, body) => `<!doctype html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title></head><body><h1>${title}</h1>${body}</body></html>`;
const esc = (v) => String(v ?? "").replace(/[&<>"']/g, c => ({
  "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
}[c]));
 
app.get("/", (req, res) => res.send(page("Student Registration Login", `
<form method="post" action="/login">
<label>Username <input name="username" required></label><br>
<label>Password <input type="password" name="password" required></label><br>
<button>Login</button></form><p>Demo login: admin / 1234</p>`)));
 
app.post("/login", (req, res) => {
  if (req.body.username === "admin" && req.body.password === "1234") {
    req.session.loggedIn = true;
    return res.redirect("/register");
  }
  res.status(401).send(page("Login Failed", '<p>Invalid username or password.</p><a href="/">Try again</a>'));
});
 
app.get("/register", (req, res) => {
  if (!req.session.loggedIn) return res.redirect("/");
  res.send(page("Student Registration Form", `<form method="post" action="/register">
  <label>Name <input name="name" required></label><br>
  <label>Register Number <input name="regno" required></label><br>
  <label>Email <input type="email" name="email" required></label><br>
  <label>Mobile (10 digits) <input name="mobile" pattern="[0-9]{10}" required></label><br>
  <label>Department <select name="department" required><option value="">Select</option><option>MCA</option><option>Computer Science</option><option>Information Technology</option></select></label><br>
  <label>Course <select name="course" required><option value="">Select</option><option>MCA</option><option>BCA</option><option>B.Sc Computer Science</option></select></label><br>
  <label>Year <select name="year" required><option value="">Select</option><option>1st Year</option><option>2nd Year</option><option>3rd Year</option></select></label><br>
  <label>Address <textarea name="address" required></textarea></label><br>
  <label>Skills (comma separated) <input name="skills"></label><br>
  <button>Register Student</button></form><a href="/logout">Logout</a>`));
});
 
app.post("/register", (req, res) => {
  if (!req.session.loggedIn) return res.redirect("/");
  const { name, regno, email, mobile, department, course, year, address } = req.body;
  if (![name, regno, email, mobile, department, course, year, address].every(v => v && v.trim())) {
    return res.status(400).send(page("Error", '<p>All required fields must be filled.</p><a href="/register">Back</a>'));
  }
  if (!/^[0-9]{10}$/.test(mobile)) return res.status(400).send(page("Error", '<p>Mobile must contain 10 digits.</p><a href="/register">Back</a>'));
  req.session.student = { name, regno, email, mobile, department, course, year, address, skills: req.body.skills || "None" };
  res.redirect("/student");
});
 
app.get("/student", (req, res) => {
  if (!req.session.loggedIn) return res.redirect("/");
  if (!req.session.student) return res.redirect("/register");
  const rows = Object.entries(req.session.student).map(([k,v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join("");
  res.send(page("Student Registration Successful", `<table border="1" cellpadding="6">${rows}</table><p><a href="/register">Register Another Student</a></p><a href="/logout">Logout</a>`));
});
 
app.get("/logout", (req, res) => req.session.destroy(() => res.redirect("/")));
app.listen(3000, () => console.log("Server running at http://localhost:3000"));




-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
Steps to run:
1. Save app.js in the project folder after installing dependencies.
2. Run: node app.js
3. Open http://localhost:3000.
4. Demo login: admin / 1234. Register a student and view the displayed details.
5. This compact example stores details in the session, not permanently in a database.
