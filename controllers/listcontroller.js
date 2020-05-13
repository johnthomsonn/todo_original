const express = require('express');

exports.getLists = (req,res) => {
  res.send("getting all lists for user: " + req.user.username)
}

exports.createList = (req,res) => {
  res.send("creating a list with name " + req.body.name + " for " + req.user.username)
}
