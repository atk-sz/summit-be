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
  productsCount,
  productStar,
  listRelated,
  searchFilters,
} = require("../controllers/product");

// routes
router.post("/product", authCheck, adminCheck, create);
router.get("/product/:id", read);
router.get("/products/total", productsCount);

router.get("/products/:count", listAll);
router.put("/product/:id", authCheck, adminCheck, update);
router.delete("/product/:id", authCheck, adminCheck, remove);

router.post("/products", list);

// ratings
router.put("/product/star/:productId", authCheck, productStar);

// related
router.get("/product/related/:productId", listRelated);

// search
router.post("/search/filters", searchFilters);

module.exports = router;
