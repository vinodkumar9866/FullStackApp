const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/login", userController.userLogin);

module.exports = router;

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login
 *     tags:
 *      - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "vinodkumar"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5c..."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "66cb64834cd2f69cf922c819"
 *                     username:
 *                       type: string
 *                       example: "vinodkumar"
 *       401:
 *         description: Invalid username or password
 *       500:
 *         description: Server Error
 */
