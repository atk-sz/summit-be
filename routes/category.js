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
  getSubs,
} = require("../controllers/category");

// routes
router.post("/category", authCheck, adminCheck, create);
router.get("/categories", list);
router.get("/category/:id", read);
router.put("/category/:id", authCheck, adminCheck, update);
router.delete("/category/:id", authCheck, adminCheck, remove);
router.get("/category/subs/:id", getSubs);

module.exports = router;
