const Type = require("../models/type");
const Product = require("../models/product");

exports.create = async (req, res) => {
  const { name } = req.body;

  try {
    const type = await new Type({ name}).save();
    res.json(type);
  } catch (error) {
    console.log(error);
    res.status(400).send("Create type failed");
  }
  //
};

exports.list = async (req, res) => {
  try {
    const types = await Type.find({}).sort({ createdAt: -1 }).exec();
    if (types) {
      res.json(types);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send("No types found");
  }
};

exports.read = async (req, res) => {
  const { id } = req.params;
  const type = await Type.findById(id).exec();

  const products = await Product.find({ type }).populate("type").exec();

  if (type) {
    res.json({ type, products });
  } else {
    res.status(404).send("Type not found");
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const typeUpdated = await Type.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    ).exec();
    res.json(typeUpdated);
  } catch (error) {
    console.log(error);
    res.status(400).send("Type update failed");
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  try {
    const typeDeleted = await Type.findByIdAndDelete(id).exec();
    res.json(typeDeleted);
  } catch (error) {
    console.log(error);
    res.status(400).send("Create delete failed");
  }
};