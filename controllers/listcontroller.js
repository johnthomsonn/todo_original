const express = require("express");
const List = require("../models/listmodel");
const User = require("../models/usermodel");
const _ = require("lodash");

//middleware to attach list to req
exports.getListByListName = (req, res, next, listName) => {
  List.findOne({name: listName}, (err, list) => {
    if (err || !list) {
      res.status(400).json({
        error: "List not found by list name parameter"
      });
    } else {
      req.list = list;
    }
    next();
  }).populate("items", "content completed");
};

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
  req.body.name = _.lowerCase(req.body.name);

  const promises = usersLists.map(listId =>
    List.findOne({_id: listId}, "name")
  );
  const found = await Promise.all(promises).then(listArray => {
    console.log(listArray)
    return listArray.find(list => {
      if(list != null)
      {
        if(list.name === req.body.name)
        return true;
      }
    });
    // listArray.map(list => {
    //   console.log(list);
    // })
  });

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

exports.getList = (req, res) => {
  return res.json(req.list);
};

exports.deleteList = (req, res) => {
  const listToDelete = req.list;
  listToDelete.remove(err => {
    if(err)
    {
      return res.status(400).json({
        error : "Could not remove the list " + err
      });
    }
    else
    {
      return res.json({
        message : `List ${listToDelete.name} has been deleted`
      });
    }
  })
};
