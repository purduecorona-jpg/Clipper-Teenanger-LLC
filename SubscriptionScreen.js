import React from "react";
import { View, Text } from "react-native";
import SubscriptionButton from "../components/SubscriptionButton";

export default function SubscriptionScreen() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Wybierz subskrypcję:</Text>

      <Text>Silver - $15 / miesiąc</Text>
      <SubscriptionButton packageName="Silver" />

      <Text>Premium - $29.99 / miesiąc</Text>
      <SubscriptionButton packageName="Premium" />

      <Text>Monster - $59.99 / miesiąc</Text>
      <SubscriptionButton packageName="Monster" />
    </View>
  );
}
