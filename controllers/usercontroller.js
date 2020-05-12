const express = require('express');
const User = require('../models/usermodel')

exports.getAllUsersz = (req,res) => {
  User.find({} , (err, users) => {
    if(err) {
      return console.log("Error when trying to get all users");
    }
    else{

      res.json({users});
    }
  })
}

exports.getAllUsers = async (req,res) => {
  const allUsers = await User.find({}).select("username email");
  if(!allUsers)
  {
    console.log("Error when trying to fetch all users");
    return json.status(404).json({
      error: "Unable to fetch all users"
    })
  }
  else{
    return res.json({users : allUsers});
  }
}
