import React, { useState } from "react";
import { View, TextInput, Button, FlatList, Text } from "react-native";

export default function JournalScreen() {
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState("");

  const addEntry = () => {
    if (!text.trim()) return;
    setEntries([{ id: Date.now().toString(), text }, ...entries]);
    setText("");
  };

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Dziennik Emocji</Text>
      <TextInput
        placeholder="Wpisz swoje uczucia..."
        value={text}
        onChangeText={setText}
        style={{ borderWidth: 1, padding: 5, marginVertical: 10 }}
      />
      <Button title="Dodaj wpis" onPress={addEntry} />
      <FlatList
        data={entries}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text style={{ marginVertical: 5 }}>• {item.text}</Text>}
      />
    </View>
  );
}
