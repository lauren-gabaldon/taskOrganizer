const fs = require("fs");
const path = require("path");
const notes = require("../db/db.json");
const { v4: uuidv4 } = require("uuid");

module.exports = function (app) {
  app.get("/api/notes", (req, res) => {
    const notes = fs.readFileSync(
      path.join(__dirname, "../db/db.json"),
      "utf8"
    );
    res.json(JSON.parse(notes));
  });

  app.post("/api/notes", (req, res) => {
    const notes = fs.readFileSync(
      path.join(__dirname, "../db/db.json"),
      "utf8"
    );

    let notesArray = JSON.parse(notes);
    req.body.id = uuidv4();
    notesArray.push(req.body);

    fs.writeFileSync(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(notesArray),
      (err) => {
        if (err) {
          throw err;
        }
      }
    );
    res.json(req.body);
  });
  // TODO: delete route
  app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id;
    const notes = fs.readFileSync(
      path.join(__dirname, "../db/db.json"),
      "utf8"
    );
    let notesArray = JSON.parse(notes);
    let deletedNote;

    notesArray.forEach((note) => {
      if (note.id === id) {
        const noteId = notesArray.indexOf(note);
        deletedNote = note;
        notesArray.splice(noteId, 1);
      }
    });
    fs.writeFileSync(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(notesArray),
      (err) => {
        if (err) {
          throw err;
        }
      }
    );
    res.json(deletedNote);
    //then respond to browser with the deleted note
  });
};
