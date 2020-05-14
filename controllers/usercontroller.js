const express = require("express");
const User = require("../models/usermodel");
const List = require("../models/listmodel");
const Item = require("../models/itemmodel");
const _ = require('lodash')

exports.getAllUsers = async (req, res) => {
  const allUsers = await User.find({}).select("username email");
  if (!allUsers) {
    console.log("Error when trying to fetch all users");
    return json.status(404).json({
      error: "Unable to fetch all users"
    });
  } else {
    return res.json({users: allUsers});
  }
};

exports.getUserByUsernameParam = (req, res, next, username) => {
  const lowerCaseUsername = _.toLower(username)
  User.findOne({username : lowerCaseUsername}, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Could not get user by username parameter"
      });
    } else {
      req.user = user;
      next();
    }
  });
};

exports.deleteUser = async (req, res) => {
  const user = req.user;
  const lists = user.lists;

  const listPromises = await lists.map(listId => List.findOne({_id : listId}))
  const listsFulfilled = await Promise.all(listPromises);

//console.log(listsFulfilled)

  const itemPromises = await listsFulfilled.map(list => list.items.map(item =>Item.findOne({_id : item})))
  const itemFulfilled = await Promise.all(itemPromises);

  //itemFulfilled.map(i => console.log(i))

  await itemFulfilled.map(item => item.remove());
  await listsFulfilled.map(list => list.remove());

  const u = await user.remove();

  return res.json({message : "deleted user"})
};
