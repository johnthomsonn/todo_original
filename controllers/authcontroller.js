require("dotenv").config();
const User = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const submittedEmail = req.body.email;
  User.findOne({email: submittedEmail}).exec((err, user) => {
    if (err) console.log(err);
    else {
      //if user then email is already created
      if (user) {
        return res.status(403).json({
          error: "Email is already in use"
        });
      }
      //else no user = no email in use so create user
      else {
        const user = new User(req.body);
        user.save((err, createdUser) => {
          if (err) console.log(err);
          else {
            //user created successfully so now send jwt and redirect to user home
            //create jwt token
            const token = jwt.sign(
              {_id: createdUser._id},
              process.env.JWT_SECRET
            );
            //set token in cookie
            res.cookie("authCookie", token, {
              expire: new Date() + 7257600
            });
            //return token and user to client
            res.json({
              token,
              user :{
                _id,
                email : createdUser.email,
                username : createdUser.username,
                created : createdUser.created
              }
            });
          }
        }); // ends user.save
      } // ends else no user, create...
    }
  }); // ends user.findOne.exec
};
