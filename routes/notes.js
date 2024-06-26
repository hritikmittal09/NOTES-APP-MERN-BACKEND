const express = require("express");
const Notes = require("../Models/notes");
const fetch_user = require("../middleware/fetch_user");
const { findById } = require("../Models/user");
const route = express.Router();
route.get("/", (req, res) => {
  res.send("notes route is working");
});
// login requird creating a note by user
route.post("/create", fetch_user, (req, res) => {
  //res.send(userid);
  const { title, dis } = req.body;
  if (title == "" || dis == "") {
    res.status(401).json({ message: "bad request" });
  }
  const new_note = new Notes({ title: title, dis: dis, User: req.user.id });
  new_note
    .save()
    .then(() => {
      res.send(new_note);
    })
    .catch((e) => res.send("something went wrong"));
});
// getting all notes of a particular user
route.get("/get", fetch_user, async (req, res) => {
  //fatching the id of particular user using token using middleware
  const user_id = req.user.id;
  const all_notes = await Notes.find({ User: user_id }).select();
  res.send(all_notes);
});
route.put("/update/:id", fetch_user, async (req, res) => {
  const user_id_from_token = req.user.id;
  const note_id = req.params.id;
  // find the recons to be update by its id
  try {
    const { title, dis } = req.body;
    let updated_note = {};
    const record = await Notes.findById({ _id: note_id });
    if (record.User != user_id_from_token) {
      res.status(401).send("access dined ");
    }
    if (title) {
      updated_note["title"] = title;
    }
    if (dis) {
      updated_note["dis"] = dis;
    }
    const new_updated_note = await Notes.findByIdAndUpdate(
      note_id,
      { $set: updated_note },
      { new: true }
    );
    res.status(201).send("Note updated successfully");
  } catch (error) {res.send("something went wrong")}
});
route.delete("/delete/:id", fetch_user, async (req, res) => {
  const user_id_from_token = req.user.id;
  const note_id = req.params.id;
  // find the recons to be update by its id
  try {
    
    
    const record = await Notes.findById({ _id: note_id });
    if (record.User != user_id_from_token) {
      res.status(401).send("access dined ");
    }
    
    const deleted_note = await Notes.findByIdAndDelete(note_id)
    
    res.status(201).send("Note updated successfully");
  } catch (error) {res.send("something went wrong")}
});












module.exports = route;
