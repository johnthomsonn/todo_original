const express = require("express");
const Item = require("../models/itemmodel")

exports.getItemsInList = (req, res) => {
  const list = req.list;
  return res.json(list.items);
}
