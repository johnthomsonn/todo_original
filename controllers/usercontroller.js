const express = require("express");
const User = require("../models/usermodel");
const List = require("../models/listmodel");
const Item = require("../models/itemmodel");
const _ = require("lodash");
const chalk = require("../utils/debug");

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
  const lowerCaseUsername = _.toLower(username);
  User.findOne({username: lowerCaseUsername}, (err, user) => {
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
  chalk.yellow("user param: " + req.user._id);
  chalk.yellow("auth  param: " + req.auth._id);
  if (req.user._id == req.auth) {
    const userId = req.user._id;

    try {
      const itemDelete = await Item.deleteMany({user_id: userId});
      const listDelete = await List.deleteMany({user_id: userId});

      if (itemDelete.ok && listDelete.ok) {
        const removedUser = await req.user.remove();

        if (removedUser) {
          return res.json({
            message: "user deleted"
          });
        }
        chalk.error("removedUser is null");
      }
      chalk.error("item and list delet is not ok");
      return res.status(400).json({
        error: "Failed to delete user - items and lists may be deleted"
      });
    } catch (err) {
      chalk.error("Catch block error: " + err);
      return res.json({
        error: err
      });
    }
  } else {
    chalk.error("Wrong user deleted attemp")
    return res.status(401).json({
      error: "Cannot delete someone that is not you"
    });
  }
};
