const express = require("express");
const router = express.Router();

// route middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");
const { sendAnEmail } = require("../middlewares/nodemailer");

// controllers
const {
  createOrUpdateUser,
  currentUser,
  currentAdmin,
  register,
  verifyEmail
} = require("../controllers/auth");

router.post("/createOrUpdateUser", authCheck, createOrUpdateUser);
router.post("/currentUser", authCheck, currentUser);
router.post("/currentAdmin", authCheck, adminCheck, currentAdmin);
router.post("/register", register,sendAnEmail)
router.post("/email/verify/:token", verifyEmail)

module.exports = router;
