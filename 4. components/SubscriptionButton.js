import React, { useState } from "react";
import { Button, Alert } from "react-native";
import axios from "axios";

export default function SubscriptionButton({ userId, priceId }) {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      const parentConsent = true; // Tutaj możesz dodać modal z checkboxem zgody rodzica
      if (!parentConsent) {
        Alert.alert("Zgoda rodzica jest wymagana");
        return;
      }

      const res = await axios.post("http://localhost:5000/api/subscriptions/create-session", {
        userId,
        priceId,
        successUrl: "http://localhost:19006/success",
        cancelUrl: "http://localhost:19006/cancel"
      });

      // Otwórz Stripe Checkout w przeglądarce / WebView
      const { url } = res.data;
      window.open(url, "_blank");
    } catch (err) {
      console.error(err);
      Alert.alert("Błąd płatności", err.message);
    } finally {
      setLoading(false);
    }
  };

  return <Button title={loading ? "Ładowanie..." : "Wykup subskrypcję"} onPress={handleSubscribe} />;
}
