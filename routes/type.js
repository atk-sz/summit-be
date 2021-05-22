const express = require("express");
const router = express.Router();

// route middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controllers
const {
  create,
  read,
  update,
  remove,
  list,
} = require("../controllers/type");

// routes
router.post("/type", authCheck, adminCheck, create);
router.get("/types", list);
router.get("/type/:id", read);
router.put("/type/:id", authCheck, adminCheck, update);
router.delete("/type/:id", authCheck, adminCheck, remove);

module.exports = router;
