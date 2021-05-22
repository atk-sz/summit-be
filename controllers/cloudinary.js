const cloudinary = require("cloudinary");

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.upload = async (req, res) => {
  let result = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: `HubEdu${req.user.name}id:${req.user.user_id}`,
    public_id: `${req.user.user_id + Date.now()}`,
    resource_type: "auto", //jpeg, png
  });
  res.json({
    public_id: result.public_id,
    url: result.secure_url,
  });
};

exports.uploadImage = async (req, res) => {
  try {
    let result = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: `HubEdu/${req.user.name + req.user.user_id}`,
      public_id: `${Date.now()}`,
      resource_type: "auto", //jpeg, png
    });

    res.json({
      public_id: result.public_id,
      url: result.secure_url,
      message: 'Image uploaded successfully'
    });
  } catch (e) {
    console.log('upload err', e)
  }
};

exports.remove = (req, res) => {
  let image_id = req.body.public_id;

  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) {
      return res.json({ success: false, err });
    } else {
      return res.send("Ok, deleted");
    }
  });
};


exports.uploadVideo = async (req, res) => {
  try {
    let result = await cloudinary.v2.uploader.upload(req.body.video, {
      resource_type: "video",
      folder: `HubEdu/Videos/${req.user.name}id:${req.user.user_id}`,
      public_id: `${req.user.user_id + Date.now()}`,
      overwrite: true,
    });
    res.json({
      public_id: result.public_id,
      url: result.secure_url,
    });

  } catch (error) {
    console.log(error);
    res.status(400).json({
      err: error.message,
    });
  }
};