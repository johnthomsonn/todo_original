require("dotenv").config();
const User = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signupp = async (req, res) => {
  const userExists = await User.findOne({
    email: req.body.email
  });
  if (userExists) {
    return res.status(403).json({
      error: "Email is already in use"
    });
  }

  //email is unique and so we can create our user
  try {
    let user = await new User(req.body);
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
      return res.json({
        token,
        user: {
          _id,
          username,
          email,
          created
        }
      });
    } // ends succesfful creation of new user
  } catch (err) {
    console.log("error when creating new user using .save: " + err);
  }
};

exports.signup = async (req, res) => {
  const userExists = await User.findOne({
    email: req.body.email
  });
  if (userExists) {
    return res.status(403).json({
      error: "Email is already in use"
    });
  }

  //email is unique and so we can create our user

  let user = await new User(req.body);
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
    return res.json({
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
