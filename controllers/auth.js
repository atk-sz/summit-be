const User = require("../models/user");
const crypto = require('crypto');
const createTransport = require('../config/nodemailer');
const { emailVerify } = require("../middlewares/nodemailer");

exports.register = async (req, res, next) => {
  const { values } = req.body;
  const { email } = values
  try {
    const user = await User.findOne({ email }).exec();
    if (user)
      res.status(404).json("User exixts");
    else {
      values.name = email.split("@")[0]
      const buf = crypto.randomBytes(20);
      const token = buf.toString('hex')
      values.token = token;
      const newUser = await new User(values).save()
      if (newUser) {
        console.log(newUser)
        next()
      } else {
        res.status(404).json("User exixts");
      }
    }
  }
  catch (err) {
    console.log(err)
    res.status(401).json({ error: "Some error in registration" });
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.params;
  try {
    // User.deleteMany({}).then(function () {
    //   console.log("Data deleted"); // Success
    // }).catch(function (error) {
    //   console.log(error); // Failure
    // });
    // const allUser = await User.find({}).exec();
    // console.log("allUser")
    // console.log(allUser)
    const user = await User.findOneAndUpdate({ token }, { emailVerified: true }, { new: true }).exec();
    if (user) {
      console.log(user)
      res.json(user)
    }
    else {
    res.json(false)
    }
  }
  catch (err) {
    console.log(err)
    res.status(401).json({ error: "Some error in verification" });
  }
};

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    { name: email.split("@")[0], picture },
    { new: true }
  );

  if (user) {
    res.json(user);
    console.log("UPDATE USER CONTROLLER", user);
  } else {
    const newUser = await new User({
      name: email.split("@")[0],
      picture,
      email,
    }).save();
    console.log("CREATE USER CONTROLLER", newUser);
    res.json(newUser);
  }
};

exports.currentUser = async (req, res) => {
  const { email } = req.user;

  const user = await User.findOne({ email }).exec();

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
};

exports.currentAdmin = async (req, res) => {
  const { email } = req.user;

  const user = await User.findOne({ email }).exec();

  if (user.role === "admin") {
    res.json({
      data: {
        products: ["car", "laptop", "mobile"],
      },
    });
  } else {
    res.status(401).json({
      error: "You are trying to access admin resource. Access Denied",
    });
  }
};
