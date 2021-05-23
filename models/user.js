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
      unique:true,
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
    type:{
      type: ObjectId,
      ref:'Type'
    },
    city: {
      type: String,
    },
    phone: {
      type: Number,
      trim: true
    },
    emailVerified:{
      type:Boolean,
      required:true,
      default:false
    },
    request:{
      type:Boolean,
      required:true,
      default:false
    },
    response:{
      type:Boolean,
      required:true,
      default:false
    },
    token:{
      type:String
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
