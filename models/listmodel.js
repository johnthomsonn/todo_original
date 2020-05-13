const express = require('express');
const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  name : {
    trype :String,
    trim: true,
    required : true
  }
})
