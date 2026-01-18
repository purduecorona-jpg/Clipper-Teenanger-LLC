import React, { useState } from "react";
import { View, TextInput, Button, FlatList, Text } from "react-native";

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  const sendMessage = () => {
    if (!messageText.trim()) return;
    setMessages([...messages, { id: Date.now().toString(), text: messageText }]);
    setMessageText("");
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text style={{ marginVertical: 2 }}>{item.text}</Text>}
      />
      <TextInput
        placeholder="Napisz wiadomość"
        value={messageText}
        onChangeText={setMessageText}
        style={{ borderWidth: 1, padding: 5, marginVertical: 5 }}
      />
      <Button title="Wyślij" onPress={sendMessage} />
    </View>
  );
}
