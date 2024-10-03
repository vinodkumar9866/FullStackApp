const express = require("express");
const router = express.Router();
const productController = require("../controllers/productsController");

router.get("/products", productController.getAllProducts);

module.exports = router;

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags:
 *      - Products
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *          description: Bad Request
 *       500:
 *          description: Server Error
 */
