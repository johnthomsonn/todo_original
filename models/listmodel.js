const express = require('express');
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;
const {itemSchema} = require('./usermodel')

const listSchema = new mongoose.Schema({
  name : {
    type :String,
    trim: true,
    required : true
  },
  items : [itemSchema]
})

module.exports = mongoose.model("List", listSchema);
