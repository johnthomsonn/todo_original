const express = require("express");
const List = require("../models/listmodel");
const User = require("../models/usermodel");
const Item = require("../models/itemmodel");
const _ = require("lodash");
const {yellow} = require("../utils/debug");

//middleware to attach list to req
exports.getListByListName = (req, res, next, listName) => {
  const lowercaseListName = _.lowerCase(listName);
  List.findOne({name: lowercaseListName}, (err, list) => {
    if (err || !list) {
      res.status(400).json({
        status: true,
        error: "List not found by list name parameter"
      });
    } else {
      req.list = list;
    }
    next();
  }).populate("items", "content completed");
};

exports.getListByListId = (req, res) => {
  List.findOne({_id: req.params.listId}, (err, list) => {
    if (err) {
      return res.status(400).json({
        status: true,
        error: err
      });
    } else {
      return res.json({
        status: true,
        list
      });
    }
  });
};

exports.getLists = async (req, res) => {
  const listObjs = await req.user.lists.map(listId =>
    List.findOne({_id: listId})
  );

  const lists = await Promise.all(listObjs);

  //lists.map(list => console.log(list))

  return res.json({
    status: true,
    lists
  });
};

exports.createList = async (req, res) => {
  console.log("list name coming in is: " + req.body.name);
  const usersLists = req.user.lists;
  req.body.name = _.toLower(req.body.name);

  const promises = usersLists.map(listId =>
    List.findOne({_id: listId}, "name")
  );
  const found = await Promise.all(promises).then(listArray => {
    return listArray.find(list => {
      if (list != null) {
        if (list.name === req.body.name) return true;
      }
    });
    // listArray.map(list => {
    //   console.log(list);
    // })
  });

  //console.log(found);
  if (found) {
    return res.status(403).json({
      status: true,
      error: "You already have a list of that name"
    });
  } else {
    const list = await new List({name: req.body.name, user_id: req.user._id});
    await list.save();
    const user = await User.findOneAndUpdate(
      {_id: req.user._id},
      {$push: {lists: list}},
      {new: true}
    ).populate("lists", "name items");
    if (user) {
      user.hashed_password = undefined;
      return res.json({
        status: true,
        message: `${list.name} list created successfully`,
        list
      });
    } else {
      return res.status(400).json({
        status: true,
        error: "an error occured when creating new list "
      });
    }
  }
};

exports.getList = (req, res) => {
  return res.json({
    status: true,
    list: req.list
  });
};

//with list deletion
//need to delete all items in list
// need to delete reference from user
exports.deleteList = async (req, res) => {
  const listToDelete = req.list;
  //delete all items in list first
  const itemPromises = await listToDelete.items.map(item =>
    Item.findOne({_id: item._id})
  );
  const items = await Promise.all(itemPromises);
  items.map(item => item.remove());

  //now remove the list
  const deletedList = await listToDelete.remove();
  if (!deletedList) {
    return res.status(400).json({
      status: true,
      error: "Could not remove the list " + err
    });
  } else {
    //if list was removed, remove the reference from user list array
    const newList = req.user.lists.filter(
      list => list.toString() != deletedList._id
    );
    req.user.lists = newList;
    const updatedUser = await req.user.save();
    if (!updatedUser) {
      res.status(400).json({
        status: true,
        error: "An error occured when trying to save the updated user lists"
      });
    } else {
      return res.json({
        status: true,
        message: `List ${listToDelete.name} has been deleted`
      });
    }
  }
};
