const express = require('express');

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
    required :true
  },
  salt : String,
  created : {
    type : Date,
    default : Date.now
  },
  updated : {
    type: Date
  }
});

//when we pass password field on creating a new user, this setter will run
//and set the salt and hashed_password. means keeping password stuff here and not in other files
userSchema.virtual('password')
.set(function(password) {
    this._password = password;
    //generate a timestamp
    this.salt = uuidv4();
    //encrypt _password
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

userSchema.methods = {
authenticateUser : function(plaintext) {
  return this.encryptPassword(plaintext) == this.hashed_password;
},

encryptPassword: function(password) {
    if (!password) return "";
    try {
      return crypto.createHmac('sha512', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return "";
    }
  }
}

module.exports = mongoose.model("User", userSchema);
