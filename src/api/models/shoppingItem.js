const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  rate: { type: Number, required: true },
  count: { type: Number, required: true },
});

const shoppingItemSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: ratingSchema, required: true },
});

const ShoppingItem = mongoose.model("ShoppingItem", shoppingItemSchema);

module.exports = ShoppingItem;
