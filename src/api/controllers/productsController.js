const ShoppingItem = require("../models/shoppingItem");

//Fetch all products
const getAllProducts = async (req, res) => {
  try {
    const products = await ShoppingItem.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

//add product to cart
const addProductToCart = async (req, res) => {
  try {
    // const { id, title, price, description, category, image, rating } = res.body;
    const product = new ShoppingItem(res.body);
    await product.save();
    res.status(201).json({ message: "Product added to cart", product });
  } catch (error) {
    res.status(500).json({ message: "Error adding product to cart", error });
  }
};

module.exports = {
  getAllProducts,
  addProductToCart,
};
