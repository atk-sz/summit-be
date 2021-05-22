const express = require("express");
const router = express.Router();

// route middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controllers
const {
  createOrUpdateUser,
  currentUser,
  currentAdmin,
  userCheck
} = require("../controllers/auth");

router.post("/createOrUpdateUser", authCheck, createOrUpdateUser);
router.post("/currentUser", authCheck, currentUser);
router.post("/currentAdmin", authCheck, adminCheck, currentAdmin);
router.post("/userCheck", userCheck);

module.exports = router;
