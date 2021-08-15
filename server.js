// dependencies
// var compression = require("compression");
const express = require("express");
const path = require("path");
const fs = require("fs");
// const database = require("./db/db");

// sets the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// handles data parsing
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var notes = [];
fs.readFile(`${__dirname}/db/db.json`, (err, data) => {
  if (err) throw err;
  notes = JSON.parse(data);
});

var ID = 1;

// routes
// sends user to AJAX page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// api route
app.get("/api/notes", (req, res) => {
  fs.readFile(`${__dirname}/db/db.json`, (err, data) => {
    if (err) throw err;
    response = JSON.parse(data);
    return res.json(data);
  });
});

app.post("api/notes", (req, res) => {
  ID++;
  const note = req.body;
  note.id = ID;
  notes.push(note);

  fs.writeFile(`${__dirname}/db/db.json`, JSON.stringify(notes), (err) =>
    err ? console.error(err) : true
  );
  res.json(note);
});

// deletes and note from the app
app.delete("api/notes/:id", (req, res) => {
  const index = req.params.id;
  for (var i = 0; i < notes.length; i++) {
    if (index == notes[i].id) {
      notes.splice(i, 1);
      fs.writeFile(`${__dirname}/db/db.json`, JSON.stringify(notes), (err) =>
        err ? console.error(err) : true
      );
      return res.json(notes);
    }
  }
  res.end(false);
});

// listens to the PORT
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
