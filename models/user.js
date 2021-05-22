const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    fname: {
      type: String,
    },
    lname: {
      type: String,
    },
    role: {
      type: String,
      default: "subscriber",
    },
    city: {
      type: String,
    },
    address: String,
    phone: {
      type: Number,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
