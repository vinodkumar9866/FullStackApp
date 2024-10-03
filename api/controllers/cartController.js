const CartItem = require("../models/cartItem");
const Product = require("../models/shoppingItem");

const addProductToCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    console.log(userId, productId);
    // Create a new CartItem document
    const cartItems = new CartItem({ userId, productId });
    await cartItems.save();

    res.status(201).json({ message: "Product added to cart", CartItem });
  } catch (error) {
    res.status(500).json({ message: "Error adding product to cart", error });
  }
};

const getCartItemsOfUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Step 1: Fetch cart items for the specified user to get product IDs
    const cartItems = await CartItem.find({ userId });
    const productIds = cartItems.map((item) => item.productId);

    // Step 2: Fetch product details based on the obtained product IDs
    const products = await Product.find({ _id: { $in: productIds } });

    // Send response with the detailed product information
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching cart items or products", error });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    // Find and delete the cart item by userId and product _id
    console.log(userId, productId);
    const cartItem = await CartItem.findOneAndDelete({
      userId,
      productId,
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json({ message: "Cart item removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error removing cart item", error });
  }
};

module.exports = { addProductToCart, getCartItemsOfUser, deleteCartItem };
