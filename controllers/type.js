const Type = require("../models/type");
const User = require("../models/user");

exports.create = async (req, res) => {
  const { name } = req.body;
  try {
    const type = await new Type({ name }).save();
    res.json(type);
  } catch (error) {
    console.log(error);
    res.status(400).send("Create type failed");
  }
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

exports.getSearchRes = async (req, res) => {
  const { t_id, city } = req.params;
  const allUsers = await User.find({ role: 'agent' }).populate('type').exec();
  const resObj = {
    fusers: [],
    ousers: [],
    msg: '',
    errMsg: ''
  }

  try {
    if (t_id != 'none' && city != 'none') {
      resObj.fusers = allUsers.filter(each => (each.city == city && each.type._id == t_id))
      resObj.ousers = allUsers.filter(each => ((each.city != city || each.type._id != t_id)))
      if (resObj.fusers.length == 0) {
        resObj.errMsg = 'Sorry but no such agent is available in that city'
        resObj.fusers = allUsers.filter(each => (each.city == city))
        resObj.ousers = allUsers.filter(each => ((each.city != city)))
        resObj.msg = 'other agents avail in that city are'
        if (resObj.fusers.length == 0) {
          resObj.errMsg = 'There are no agents available in that city for now, sorry'
          resObj.msg = 'other agents avail in different city are'
          resObj.fusers = []
          resObj.ousers = allUsers
        }
      }
      // resObj.msg="Othher"
    } else if (t_id != 'none' && city == 'none') {
      resObj.fusers = allUsers.filter(each => ((each.type._id == t_id)))
      resObj.ousers = allUsers.filter(each => ((each.type._id != t_id)))
      resObj.msg = 'Other types of agents are'
    } else if (t_id == 'none' && city != 'none') {
      resObj.fusers = allUsers.filter(each => ((each.city == city)))
      resObj.ousers = allUsers.filter(each => (each.city != city))
      if (resObj.fusers.length == 0)
        resObj.errMsg = 'There are no agents available in that city for now, sorry'
      resObj.msg = 'agents available in other cities are,'
    } else {
      resObj.fusers = allUsers
      resObj.ousers = []
    }
    res.json(resObj);
  } catch (error) {
    console.log(error);
    res.status(400).send("Create type failed");
  }
}