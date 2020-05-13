const express = require("express");
const Item = require("../models/itemmodel");
const List = require("../models/listmodel");
const {error, debug, yellow} = require("../utils/debug");

exports.getItemById = async (req, res, next, id) => {
  const item = await Item.findById(id);
  if (item) {
    req.item = item;
  } else {
    res.status(400).json({
      error: "Itemnot found by id parameter"
    });
  }
  next();
};

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
    return res.json(list.items);
  } catch (err) {
    error(err);
    res.status(400).json({
      error: err
    });
  }
};

exports.deleteItem = (req, res) => {
  req.item.remove((err,item) => {
    if (err) {
      res.status(400).json({
        error : "Could not delete item " + req.item
      })
    }
    else
    {
      return res.json({
        message : `item (${item.content}) deleted`
      })
    }
  });
};
