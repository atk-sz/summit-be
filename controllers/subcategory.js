const Subcategory = require("../models/subcategory");
const Product = require("../models/product");

exports.create = async (req, res) => {
  const { name, parent } = req.body;

  try {
    const subcategory = await new Subcategory({
      name,
      parent,
    }).save();
    res.json(subcategory);
  } catch (error) {
    console.log(error);
    res.status(400).send("Create subcategory failed");
  }
};

exports.list = async (req, res) => {
  try {
    const subcategories = await Subcategory.find({})
      .sort({ createdAt: -1 })
      .exec();
    if (subcategories) {
      res.json(subcategories);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send("No categories found");
  }
};

exports.read = async (req, res) => {
  const { id } = req.params;
  const subcategory = await Subcategory.findById(id).exec();

  const products = await Product.find({ subcategories: subcategory })
    .populate("category")
    .exec();

  if (subcategory) {
    res.json({ subcategory, products });
  } else {
    console.log(error);
    res.status(400).send("Subcategory not found");
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, parent } = req.body;

  try {
    const subcategoryUpdated = await Subcategory.findByIdAndUpdate(
      id,
      { name, parent },
      { new: true }
    ).exec();
    res.json(subcategoryUpdated);
  } catch (error) {
    console.log(error);
    res.status(400).send("Subcategory not updated");
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    const subcategoryDeleted = await Subcategory.findByIdAndDelete(id).exec();
    res.json(subcategoryDeleted);
  } catch (error) {
    console.log(error);
    res.status(400).send("Subcategory not deleted");
  }
};
