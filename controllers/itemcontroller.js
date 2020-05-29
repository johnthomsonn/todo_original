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
      status: true,
      error: "Item not found by id parameter"
    });
  }
  next();
};

exports.getItemsInList = (req, res) => {
  const list = req.list;
  return res.json({
    status: true,
    items: list.items
  });
};

exports.addItemToList = async (req, res) => {
  const list = req.list;
  const user = req.user;
  const content = req.body;
  try {
    const newItem = await new Item({
      content: req.body.content,
      user_id: req.user._id
    });
    await newItem.save();

    list.items.push(newItem);
    await list.save();
    return res.json({
      status: true,
      item: newItem
    });
  } catch (err) {
    error(err);
    res.status(400).json({
      status: true,
      error: err
    });
  }
};

exports.deleteItem = (req, res) => {
let listToUpdate = req.list;

  let updatedListitems = listToUpdate.items.filter(item => item._id.toString() !== req.item._id.toString())
  listToUpdate.items = updatedListitems
  listToUpdate.save( (err, list) => {
    if(err)
    {
      error("error saving updated list: " + err)
      return res.status(400).json({
        status: true,
        error : err
      })
    }
    else
    {
      //item reference has been removed form list so remove item
      req.item.remove((err, item) => {
        if (err) {
          res.status(400).json({
            status: true,
            error: "Could not delete item " + req.item
          });
        } else {
          return res.json({
            status: true,
            message: `item (${item.content}) deleted`,
            list : listToUpdate
          });
        }
      });
    }
  })



};

exports.completeItem = (req, res) => {
  let item = req.item;
  item.setCompleted();
  item.save((err, updated) => {
    if (err) {
      return res.status(400).json({
        status: true,
        error: "error trying to check the item"
      });
    } else {
      return res.json({
        status: true,
        item: updated
      });
    }
  });
};

exports.undoCompleteItem = async (req, res) => {
  let item = req.item;
  item.undoCompleted();
  item.save((err, updated) => {
    if (err) {
      return res.status(400).json({
        status: true,
        error: "error trying to uncheck the item"
      });
    } else {
      return res.json({
        status: true,
        item: updated
      });
    }
  });
};

exports.toggleCheck = async (req, res) => {
  let item = req.item;
  try {
    item.toggleCompleted();
    const updated = await item.save();
    if (!updated) {
      return res.status(400).json({
        status: true,
        error: "error trying to toggle the state of the item"
      });
    } else {
      return res.json({
        status: true,
        item: updated
      });
    }
  } catch (err) {
    console.log(err);
  }
};
