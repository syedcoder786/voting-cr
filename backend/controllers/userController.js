const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const nodemailer = require('nodemailer');

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { studentId } = req.body;

  console.log(studentId);

  if (!studentId) {
    res.status(400).json({message:"Enter Student Id."});
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ studentId });

  if (!userExists) {
    res.status(400).json({message:"Invalid Student Id."});
    throw new Error("Invalid Student Id.");
  }


    //random number
    var randomCode = Math.floor(Math.random() * 90000) + 10000;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'alanmercer786@gmail.com',
            pass: 'pttzufvrymzjmrnv'
        }
    });

    console.log(userExists.email)
    var mailOptions = {
      from: 'alanmercer786@gmail.com',
      to: userExists.email,
      subject: 'JMI CR Election Code!',
      html: `<div>The OTP code for JMI CR Election is <b>${randomCode}</b></div>`
    }

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
          console.log(error);
          res.status(400).json({message:"Wrong email"})
      } else {
          console.log('Email sent: ' + info.response);
          await User.updateOne(
            // { _id: req.user.id },
            { studentId },
            { code: randomCode }
          );
          // res.status(200).json({message:"Email Sent"})
          res.status(200).json({studentId,email: userExists.email})
      }
    });
  

  // if (userExists) {
  //   // create, store and send code using nodemailer.
  //   res.status(200).json(studentId)
  // }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { studentId, code } = req.body;

  console.log(code)
  // Check for user email
  const user = await User.findOne({ studentId });

  if (user && code === user.code) {
    res.json({
      _id: user.id,
      studentId,
      name: user.name,
      voted: user.voted,
      votedTo: user.votedTo,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({message:"Invalid Code"});
    throw new Error("Invalid credentials");
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
//   res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, "secretKey", {
    expiresIn: "30d",
  });
};


// @desc    Add user data
// @route   Add /api/users/addMe
// @access  Private
const addMe = asyncHandler(async (req, res) => {
    const { studentId, name, email } = req.body

    console.log(studentId)
    const newUser = new User({
        studentId,
        name,
        email,
    })

    const user = await newUser.save()

    res.status(200).json(user)
  });

module.exports = {
  registerUser,
  loginUser,
  getMe,
  addMe,
};
