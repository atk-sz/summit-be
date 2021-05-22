const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 3000,
      text: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    subcategories: [
      {
        type: ObjectId,
        ref: "Subcategory",
      },
    ],
    duration: {
      type: String,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    videos: {
      type: Array,
    },
    language: {
      type: String,
    },
    instructor: {
      type: "ObjectId",
      ref: "User",
    },
    ratings: [
      {
        star: Number,
        description: String,
        postedBy: {
          type: "ObjectId",
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
