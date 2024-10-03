const express = require("express");
const router = express.Router();
const productsRoutes = require("./productRoutes");
const cartRoutes = require("./cartRoutes");
const userRoutes = require("./userRoutes");
const authMiddleware = require("../middlewares/authMiddleware");

// Public routes (user login/signup routes)
router.use(userRoutes);

// Protected routes (Require authentication)
router.use(authMiddleware); // Apply auth middleware to all routes that follow this
router.use(productsRoutes);
router.use(cartRoutes);

module.exports = router;
