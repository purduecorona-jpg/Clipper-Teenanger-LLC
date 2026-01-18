import React from "react";
import { View, Text, Button } from "react-native";
import SubscriptionButton from "../components/SubscriptionButton";

export default function ProfileScreen() {
  const userId = "123"; // tutaj podłącz faktyczny userId z backendu
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Mój Profil</Text>
      <Text>Username: JanKowalski</Text>
      <Text>Email: jan@example.com</Text>
      <Text>Subskrypcja: Brak</Text>

      <Text style={{ marginTop: 20, fontWeight: "bold" }}>Wybierz pakiet:</Text>
      <SubscriptionButton userId={userId} priceId="price_1SpiAa639JRV7b5v8XuLdpsi" /> {/* Silver */}
      <SubscriptionButton userId={userId} priceId="price_1SpiFp639JRV7b5vFrvUPG2P" /> {/* Premium */}
      <SubscriptionButton userId={userId} priceId="price_1SpiIH639JRV7b5vohhmcOm9" /> {/* Monster */}
    </View>
  );
}
