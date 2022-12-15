const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    studentId: {
      type: String,
      required: [true, "Please add a studenId"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
    },
    voted: {
        type: Boolean,
        // required: [true, "Please add a password"],
        default: false,
    },
    votedTo: {
        type: Number,
        // required: [true, "Please add a password"],
        default: 0,
    },
    code: {
        type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
