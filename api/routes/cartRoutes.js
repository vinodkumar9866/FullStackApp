const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/addToCart/:userId/:productId", cartController.addProductToCart);
router.get("/cartItems/:userId", cartController.getCartItemsOfUser);
router.delete(
  "/deleteCartItem/:userId/:productId",
  cartController.deleteCartItem
);

module.exports = router;

/**
 * @swagger
 * /addToCart/{userId}/{productId}:
 *   post:
 *     summary: Add product to cart
 *     tags:
 *      - Cart
 *     parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the user
 *      - in: path
 *        name: productId
 *        required: true
 *        schema:
 *          type: number
 *        description: The ID of the product to add to the cart
 *     responses:
 *       201:
 *          description: Product added to cart successfully
 *       400:
 *          description: Bad Request
 *       500:
 *          description: Server Error
 *
 * /cartItems/{userId}:
 *   get:
 *     summary: Get all cart items for a user
 *     tags:
 *      - Cart
 *     parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the user to get cart items for
 *     responses:
 *       200:
 *          description: Successfully retrieved cart items
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Product'
 *       400:
 *          description: Bad Request
 *       500:
 *          description: Server Error
 *
 * /deleteCartItem/{userId}/{productId}:
 *   delete:
 *     summary: Delete product from cart
 *     tags:
 *      - Cart
 *     parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the user
 *      - in: path
 *        name: productId
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the product to delete from the cart
 *     responses:
 *       200:
 *          description: Successfully deleted product from cart
 *       400:
 *          description: Bad Request
 *       500:
 *          description: Server Error
 */
