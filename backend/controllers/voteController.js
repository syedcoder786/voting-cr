const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

const voteUser = asyncHandler(async (req, res) => {
    const { voteTo, studentId } = req.body

    console.log(studentId)
    console.log(voteTo)
    try {
      await User.updateOne(
        { _id: req.user.id },
        // { studentId },
        { votedTo:voteTo, voted:true }
      );

      // const newUser = await User.find({ _id: req.user.id })

      const newUser = await User.find({ _id: req.user.id })

      console.log(newUser)

      return res.status(200).json(newUser[0]);

    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }

});

const fetchUsers = asyncHandler(async (req, res) => {
  const userItems = await User.find({});

//   console.log(userItems);
  res.status(200).json(userItems);
});


module.exports = {
  voteUser,
  fetchUsers,
};
