import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function GamificationScreen() {
  const { token, user } = useContext(AuthContext);
  const [points, setPoints] = useState(user.points || 0);
  const [level, setLevel] = useState(user.level || 1);

  const addPoints = async (p) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/gamification/add-points",
        { points: p },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPoints(res.data.points);
      setLevel(res.data.level);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Punkty: {points}</Text>
      <Text>Poziom: {level}</Text>
      <Button title="Dodaj 10 pkt" onPress={() => addPoints(10)} />
    </View>
  );
}
