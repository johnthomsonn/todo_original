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
      status: true,
      error: "Unable to fetch all users"
    });
  } else {
    return res.json({
      status: true,
      users: allUsers
    });
  }
};

exports.getUserByUsernameParam = (req, res, next, username) => {
  let status = false
  if(req.auth) status = true
  const lowerCaseUsername = _.toLower(username);
  User.findOne({username: lowerCaseUsername}, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        status,
        error: "Could not get user by username parameter"
      });
    } else {
      req.user = user;
      next();
    }
  });
};

exports.deleteUser = async (req, res) => {
  if (req.user._id == req.auth) {
    const userId = req.user._id;

    try {
      const itemDelete = await Item.deleteMany({user_id: userId});
      const listDelete = await List.deleteMany({user_id: userId});

      if (itemDelete.ok && listDelete.ok) {
        const removedUser = await req.user.remove();

        if (removedUser) {
          return res.json({
            status: true,
            message: "user deleted"
          });
        }
      }
      return res.status(400).json({
        status: true,
        error: "Failed to delete user - items and lists may be deleted"
      });
    } catch (err) {
      return res.json({
        status: true,
        error: err
      });
    }
  } else {
    return res.status(401).json({
      status: true,
      error: "Cannot delete someone that is not you"
    });
  }
};
