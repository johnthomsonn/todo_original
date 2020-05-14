const express = require("express");
const User = require("../models/usermodel");
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

exports.deleteUser = (req, res) => {
  User.findOneAndDelete({_id : req.user._id}, (err,user) => {
    if(err) {
      console.log("Could not delete user");
      return res.status(400).json({
        error : "Could not delete user"
      });
    }
    else
    {
      return res.json({
        message : "User deleted",
        user
      });
    }
  }).select("_id username email created");
};
