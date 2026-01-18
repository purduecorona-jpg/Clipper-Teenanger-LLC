const express = require("express");
const router = express.Router();
const { createCheckoutSession, handleStripeWebhook } = require("../utils/stripe");
const User = require("../models/User");
const bodyParser = require("body-parser");

// Create checkout session
router.post("/create-session", async (req, res) => {
  try {
    const { userId, priceId } = req.body;
    const successUrl = req.body.successUrl || "http://localhost:19006/success";
    const cancelUrl = req.body.cancelUrl || "http://localhost:19006/cancel";

    const session = await createCheckoutSession(userId, priceId, successUrl, cancelUrl);
    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// Stripe webhook endpoint
router.post("/webhook", bodyParser.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    await handleStripeWebhook(event);
    res.status(200).json({ received: true });
  } catch (err) {
    console.error(err);
    res.status(500).send("Webhook handling error");
  }
});

module.exports = router;
