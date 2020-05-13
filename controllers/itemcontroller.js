const express = require("express");
const Item = require("../models/itemmodel");
const List = require('../models/listmodel')
const {error,debug,yellow} = require('../utils/debug')
exports.getItemsInList = (req, res) => {
  const list = req.list;
  return res.json(list.items);
};

exports.addItemToList = async (req, res) => {
  const list = req.list;
  const user = req.user;

  try {
    const newItem = await new Item(req.body);
    await newItem.save();

    list.items.push(newItem);
    await list.save();
    return res.json(list.items)
  } catch (err) {
    error(err)
    res.status(400).json({
      error: err
    });
  }
};
