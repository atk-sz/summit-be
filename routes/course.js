const express = require("express");
const router = express.Router();

// route middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// route controllers
const {
  create,
  read,
  update,
  remove,
  listAll,
  list,
} = require("../controllers/course");

// routes
router.post("/course", authCheck, adminCheck, create);
router.get("/course/:id", read);

router.get("/courses/:count", listAll);
router.put("/course/:id", authCheck, adminCheck, update);
router.delete("/course/:id", authCheck, adminCheck, remove);

router.post("/courses", list);

module.exports = router;
