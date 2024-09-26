const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define User Schema
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    id: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

// Pre-save hook to hash password before saving the user
userSchema.pre("save", async function (next) {
  // Only hash the password if it's new or modified
  if (!this.isModified("password")) return next();

  // Hash the password with bcrypt
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with stored hash
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create User model
const User = mongoose.model("User", userSchema);

module.exports = User;
