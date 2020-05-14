const express = require("express");
const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  user :{
    type: Number,
    required:true
  }
  items: [{type: ObjectId, ref: "Item"}]
});

module.exports = mongoose.model("List", listSchema);
