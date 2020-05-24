const express = require('express');
const mongoose = require('mongoose');
const {uuid} = require('uuidv4');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const {ObjectId} = mongoose.Schema;
  const {listSchema} = require('./listmodel')

const userSchema = new mongoose.Schema({
  username :{
    type: String,
    trim : true,
    required : true
  },
  email : {
    type: String,
    trim : true,
    required : true
  },
  hashed_password :{
    type : String,
    required : true
  },
  created : {
    type : Date,
    default : Date.now
  },
  updated : {
    type: Date
  },
  lists : [{
    type : ObjectId,
    ref : "List"
  }]
});

//when we pass password field on creating a new user, this setter will run
//and set the salt and hashed_password. means keeping password stuff here and not in other files
userSchema.virtual('password')
  .set(function(password) {

    this._password = password;
    //encrypt _password
    this.hashed_password = this.encryptPassword(password);

  })
  .get(function() {
    return this._password;
  });

userSchema.methods = {
  authenticate: async function(plaintext){
    return await this.encryptPassword(plaintext) === this.hashed_password;
  },

  encryptPassword: function(password) {
    return bcrypt.hashSync(password, saltRounds);
  },

  comparePasswords : async function(pwdToCompare) {
    return await bcrypt.compare(pwdToCompare, this.hashed_password);
  }
}


module.exports = mongoose.model("User", userSchema);
