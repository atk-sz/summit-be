const express = require("express");
const router = express.Router();

// route middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controllers
const {
  create,
  read,
  update,
  list,
  remove,
} = require("../controllers/subcategory");

// routes
router.post("/subcategory", authCheck, adminCheck, create);
router.get("/subcategories", list);
router.get("/subcategory/:id", read);
router.put("/subcategory/:id", authCheck, adminCheck, update);
router.delete("/subcategory/:id", authCheck, adminCheck, remove);

module.exports = router;
