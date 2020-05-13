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


  let proms = [];
  let found = false;

  usersLists.map(listId => {
    proms.push(List.findOne({_id: listId}, "name").exec());
  });

await Promise.all(proms.map(p => {
  if(p.name == req.body.name)
    found = true;
}))
  console.log("********************************* IS FOUND: " + found);
  console.log("********************************* PROMISES: " + proms);


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
