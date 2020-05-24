require("dotenv").config();
const User = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const _ = require("lodash");
const {green, debug, yellow, error} = require("../utils/debug");

exports.signup = async (req, res) => {
  const email = _.toLower(req.body.email);
  const username = _.toLower(req.body.username);
  const userExistsEmail = await User.findOne({
    email
  });
  const userExistsUsername = await User.findOne({
    username
  });
  if (userExistsEmail || userExistsUsername) {
    return res.status(409).json({
      status: false,
      error: "Email or username is already in use"
    });
  }

  //email and username is unique and so we can create our user

  let user = await new User({
    email,
    username,
    password: req.body.password
  });
  const createdUser = await user.save();

  //if save was unsuccessfull
  if (!createdUser) {
    return json.status(500).json({
      status: false,
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

    const cookieOptions = {
      httpOnly: true,
      expires: 0,
      sameSite : "Strict"
    };
    res.cookie("authtoken", token, cookieOptions)

    const {_id, username, email, created} = createdUser;
    return res.status(201).json({
      status: true,
      user: {
        _id,
        username,
        email,
        created
      }
    });
  } // ends succesfful creation of new user
};

exports.signin = async (req, res) => {
  let foundUser = undefined;

  if(/@/.test(req.body.email))
  {
    foundUser = await User.findOne({email: req.body.email});
  }
  else
  {
    foundUser = await User.findOne({username : req.body.email})
  }

  if (!foundUser) {
    return res.status(404).json({
      status: false,
      error: "User not found with given credentials"
    });
  } else {
    //user is found so hash and compare passwords
    const passwordsMatch = await foundUser.comparePasswords(req.body.password);
    if (!passwordsMatch) {
      return res.status(401).json({
        status: false,
        error: "User not found with given credentials"
      });
    } else {
      //user has entered correct email/password so send token
      const token = jwt.sign(
        {
          _id: foundUser._id
        },
        process.env.JWT_SECRET
      );
      const cookieOptions = {
        httpOnly: true,
        expires: 0,
        sameSite : 'Strict'
      };
      res.cookie("authtoken", token, cookieOptions);
      const {_id, username, email, created,lists} = foundUser;
      return res.status(200).json({
        status: true,
        user: {
          _id,
          username,
          email,
          created,
          lists
        }
      });
    }
  }
};

exports.signout = (req, res) => {
  res.cookie("authtoken", "", {maxAge :0})
  const isDeleted = req.query.user;
  if (isDeleted === "deleted") {
    return res.json({
      status: false,
      message: "User signed out and deleted"
    });
  } else {
    return res.json({
      status: false,
      message: "User signed out"
    });
  }
};

//need to check that user is in database
exports.needAuthentication = (req, res, next) => {
  const authToken = req.cookies.authtoken;
  //no auth token
  if (!authToken) {
    return res.status(401).json({
      status: false,
      error: "You are not authorised to perform this action. No auth cookie"
    });
  }
  //else auth token is there so check it is valid
  else {
    const payload = jwt.verify(authToken, process.env.JWT_SECRET);
    //if the secret is wrong
    if (!payload) {
      res.clearCookie("authtoken");
      return res.status(401).json({
        status: false,
        error: "You are not authorised to perform this action. Payload could not be verified"
      });
    }
    //else secret is valid so check user exists
    else {
      User.findOne({_id: payload._id}).then(user => {
        if (!user) {
          return res.status(401).json({
            status: false,
            error: "User is not currently logged in"
          });
        } else {
          req.auth = payload._id;
          next();
        }
      });
    }
  }
};

exports.isLoggedIn = (req,res) => {
  const authToken = req.cookies.authtoken;
  //no auth token
  if (!authToken) {
    return res.status(404).json({
      logged : false
    });
  }
  //else auth token is there so check it is valid
  else {
    const payload = jwt.verify(authToken, process.env.JWT_SECRET);
    //if the secret is wrong
    if (!payload) {
      res.clearCookie("authtoken");
      return res.status(404).json({
        logged : false
      });
    }
    //else secret is valid so check user exists
    else {
      User.findOne({_id: payload._id}).then(user => {
        if (!user) {
          return res.status(404).json({
            logged : false
          });
        } else {
          return res.json({
            logged : true
          })
        }
      });
    }
  }
}

exports.ensureCorrectUserPerformingAction = (req, res, next) => {
  const loggedUser = req.auth;
  const urlUser = req.user._id;

  if (loggedUser != urlUser) {
    return res.status(401).json({
      status: true,
      error: "You are not the authorised user to perform this action"
    });
  } else {
    next();
  }
};
