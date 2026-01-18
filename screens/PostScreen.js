import React, { useState } from "react";
import { View, Text, Image, Button, TextInput, FlatList } from "react-native";

export default function PostScreen({ route }) {
  const { post } = route.params;
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const handleLike = () => setLikes(likes + 1);
  const handleAddComment = () => {
    if (commentText.trim() === "") return;
    setComments([...comments, { id: Date.now().toString(), text: commentText }]);
    setCommentText("");
  };

  return (
    <View style={{ padding: 10 }}>
      {post.type === "image" ? (
        <Image source={post.src} style={{ width: "100%", height: 300 }} />
      ) : (
        <Text style={{ height: 300, backgroundColor: "#000", color: "#fff", textAlign: "center", paddingTop: 140 }}>
          Film: {post.id} (video placeholder)
        </Text>
      )}
      <Button title={`Lubię to (${likes})`} onPress={handleLike} />
      <Text style={{ marginTop: 10, fontWeight: "bold" }}>Komentarze:</Text>
      <FlatList
        data={comments}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text>- {item.text}</Text>}
      />
      <TextInput
        placeholder="Dodaj komentarz"
        value={commentText}
        onChangeText={setCommentText}
        style={{ borderWidth: 1, marginTop: 10, padding: 5 }}
      />
      <Button title="Dodaj komentarz" onPress={handleAddComment} />
    </View>
  );
}
