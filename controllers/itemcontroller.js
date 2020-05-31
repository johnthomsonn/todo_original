const express = require("express");
const Item = require("../models/itemmodel");
const List = require("../models/listmodel");
const {error,  yellow} = require("../utils/debug");
const debug = require('debug')('itemcontroller')

exports.getItemById = async (req, res, next, id) => {
  const item = await Item.findById(id);
  if (item) {
    req.item = item;
    debug("Item attached to req: " + item)
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

exports.deleteItems = async (req, res) => {
  let listToUpdate = req.list;
 let [keeping, deleting] = req.body;
 let isError = undefined

  const removePromises = await deleting.map(async itemObj => {
    const foundItem = await Item.findById(itemObj._id).catch(e =>  error(e))
    return await foundItem.remove().catch(e => error(e))
  })
  //const removeResults = await Promise.all(removePromises)
  listToUpdate.items = keeping;
  const updated = await listToUpdate.save().catch(e => error(e))
  if(updated)
  {
    return res.json({
      status : true,
      message: `items deleted`,
      list: updated
    })
  }
  else
  {
    error("Error deleteing ALL items but not caught error: " + err)
    return res.status(400).json({
      status : true,
      error : "error deleting all items: " + err
    })
  }


if(isError){
  error("Error deleteing ALL items: " + err)
  return res.status(400).json({
    status : true,
    error : "error deleting all items: " + err
  })
}
};

exports.deleteItem = async (req,res) => {
  let listToUpdate = req.list
  let updatedListItems = listToUpdate.items.filter(item => item._id.toString() !== req.item._id.toString())
  listToUpdate.items = updatedListItems
  try
  {
    //updatedList = await listToUpdate.save()
    let l =await listToUpdate.save()

    if(l) {
      let item = await req.item.remove()

    return res.json({
      status : true,
      message: `item (${item.content}) deleted`,
      list: l
    })
  }
  }
  catch(err)  {
    error("Error in delete item: " + err)
    return res.status(400).json({
      status : true,
      error : "Error in deleting an item: " + err
    })
  }
}

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
