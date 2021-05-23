const express = require("express");
const router = express.Router();

// route middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controllers
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToUserCart,
  createOrder,
  getUserOrders,
  addToWishlist,
  wishlist,
  removeFromWishlist,
  createCashOrder,
  updateToAgentReuest,
  getUser,
  getPendingUsers,
  approveUser,
  rejectUser
} = require("../controllers/user");
const { approveMessage, rejectMessage } = require("../middlewares/nodemailer");


router.get("/user/:id", getUser);
router.get("/users/pending", authCheck, adminCheck, getPendingUsers);
router.post("/user/approve/agent", authCheck, adminCheck, approveMessage, approveUser);
router.post("/user/reject/agent", authCheck, adminCheck, rejectMessage, rejectUser);

router.post("/user/cart", authCheck, userCart);
router.get("/user/cart", authCheck, getUserCart);
router.delete("/user/cart", authCheck, emptyCart);
router.post("/user/address", authCheck, saveAddress);

// coupon
router.post("/user/cart/coupon", authCheck, applyCouponToUserCart);

// save order to db
router.post("/user/order", authCheck, createOrder);
router.post("/user/cash-order", authCheck, createCashOrder);

// get all orders of user
router.get("/user/orders", authCheck, getUserOrders);

// wishlist
router.post("/user/wishlist", authCheck, addToWishlist);
router.get("/user/wishlist", authCheck, wishlist);
router.put("/user/wishlist/:productId", authCheck, removeFromWishlist);


router.post("/user/update-request/agent", authCheck, updateToAgentReuest);

module.exports = router;
