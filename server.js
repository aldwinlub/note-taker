// dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const database = require("/databases/db.json");

// sets the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// handles data parsing
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
// sends user to AJAX page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// api route
app
  .route("/api/notes")
  .get(function (req, res) {
    res.json(database);
  })
  .post(function (req, res) {
    let jsonFile_Path = path.join(__dirname, "/databases/db.json");
    let new_Note = req.body;
    let highestId = 99;

    for (let i = 0; i < database.length; i++) {
      let eachNote = database[i];
      if (eachNote.id > highestId) {
        highestId = eachNote.id;
      }
    }

    new_Note.id = highestId + 1;
    database.push(new_Note);

    fs.writeFile(
      (jsonFile_Path,
      JSON.stringify(database),
      function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("not saved");
      })
    );
    res.json(new_Note);
  });

// deletes and note from the app
app.delete("api/notes/:id", function (req, res) {
  let jsonFile_Path = path.join(__dirname, "/databases/db.json");
  for (let i = 0; i < database.length; i++) {
    if (database[i].id == req.params.id) {
      database.splice(i, 1);
      break;
    }
  }

  fs.writeFile(jsonFile_Path, JSON.stringify(database), function (err) {
    if (err) {
      return console.log(err);
    } else {
      console.log("Your note was successfuly deleted!");
    }
  });
  res.json(database);
});

// listens to the PORT
app.listen(PORT, function () {
  console.log(`App listening on PORT ${PORT}`);
});
