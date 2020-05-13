const express = require("express");
const List = require("../models/listmodel");
const User = require("../models/usermodel");

exports.getLists = (req, res) => {
  List.find({}, (err, lists) => {
    if (err) {
      console.log("error finding all lists");
      return res.status(404).json({
        error: "Unable to fetch all lists"
      });
    } else {
      return res.json({lists});
    }
  });
};

exports.createList = async (req, res) => {
  const usersLists = req.user.lists;


  let found = false;
  
const promises = usersLists.map(async listId => {
    const prom = await List.findOne({_id: listId}, "name").exec();
    if(prom.name == req.body.name)
        found = true;
});
await Promise.all(promises);

  //console.log(found);
  if (found) {
    return res.status(403).json({
      error: "You already have a list of that name"
    });
  } else {
    const list = await new List(req.body);
    await list.save();
    const user = await User.findOneAndUpdate(
      {_id: req.user._id},
      {$push: {lists: list}},
      {new: true}
    ).populate("lists", "name items");
    if (user) {
      user.hashed_password = undefined;
      return res.json({
        message: "List created successfully",
        user: user
      });
    } else {
      return res.status(400).json({
        error: "an error occured when creating new list "
      });
    }
  }
};
