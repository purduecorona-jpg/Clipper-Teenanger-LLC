const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price_id: { type: String, required: true }, // Stripe price_id
  features: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
