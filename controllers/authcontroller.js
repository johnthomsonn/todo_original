require("dotenv").config();
const User = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const _ = require('lodash')

exports.signup = async (req, res) => {
  const email = _.toLower(req.body.email)
  const username = _.toLower(req.body.username)
  const userExistsEmail = await User.findOne({
    email
  });
  const userExistsUsername = await User.findOne({
    username
  });
  if (userExistsEmail || userExistsUsername) {
    return res.status(409).json({
      error: "Email is already in use"
    });
  }

  //email and username is unique and so we can create our user

  let user = await new User({
    email,
    username,
    password : req.body.password
  });
  const createdUser = await user.save();

  //if save was unsuccessfull
  if (!createdUser) {
    return json.status(500).json({
      error: "Error when saving the new user"
    });
  }
  //else create jwt tokens and cookies
  else {
    const token = jwt.sign(
      {
        _id: createdUser._id
      },
      process.env.JWT_SECRET
    );
    res.cookie("token", token, {expire: new Date() + 7257600});

    const {_id, username, email, created} = createdUser;
    return res.status(201).json({
      token,
      user: {
        _id,
        username,
        email,
        created
      }
    });
  } // ends succesfful creation of new user
};

exports.signin = async (req,res) => {
  let foundUser = await User.findOne({email : req.body.email});
  if(!foundUser )
  {
    return res.status(404).json({
      error : "User not found with given credentials"
    });
  }
  else
  {
    //user is found so hash and compare passwords
    const passwordsMatch = await foundUser.comparePasswords(req.body.password)
    if(!passwordsMatch)
    {
      return res.status(401).json({
        error : "User not found with given credentials"
      });
    }
    else
    {
      //user has entered correct email/password so send token
      const token = jwt.sign(
        {
          _id: foundUser._id
        },
        process.env.JWT_SECRET
      );
      res.cookie("token", token, {expire: new Date() + 7257600});
      const {_id, username, email, created} = foundUser;
      return res.status(200).json({
        token,
        user: {
          _id,
          username,
          email,
          created
        }
      });
    }
  }
};

exports.signout =(req,res) =>{
  res.clearCookie("token");
  return res.json({
    message : "User signed out"
  });
}

exports.needAuthentication = expressJwt({
  secret : process.env.JWT_SECRET,
  userProperty : "auth"
});
