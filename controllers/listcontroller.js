const express = require('express');
const List = require("../models/listmodel");

exports.getLists = (req,res) => {
  List.find({}, (err, lists) => {
    if(err){
      console.log("error finding all lists");
      return res.status(404).json({
        error : "Unable to fetch all lists"
      });
    }
    else
    {
      return res.json({lists});
    }
  })
}

exports.createList = (req,res) => {
  res.send("creating a list with name " + req.body.name + " for " + req.user.username)
}
