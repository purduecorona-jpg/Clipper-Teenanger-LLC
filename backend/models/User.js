const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subscriptionName: { type: String, enum: ["Free", "Silver", "Premium", "Monster"], default: "Free" }
});

module.exports = mongoose.model("User", userSchema);
