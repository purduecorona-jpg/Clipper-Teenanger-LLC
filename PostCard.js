import React, { useState } from "react";
import { View, Text, Image, Button } from "react-native";
import Video from "react-native-video";

export default function PostCard({ post }) {
  const [likes, setLikes] = useState(post.likes || 0);

  const handleLike = () => setLikes(likes + 1);

  return (
    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: "#ccc" }}>
      <Text>{post.author?.username || "Anonim"}</Text>
      {post.type === "image" ? (
        <Image source={{ uri: post.url }} style={{ width: "100%", height: 250 }} />
      ) : (
        <Video source={{ uri: post.url }} style={{ width: "100%", height: 250 }} controls resizeMode="contain" />
      )}
      <Button title={`Lubię to (${likes})`} onPress={handleLike} />
      <Text>Komentarze: {post.comments?.length || 0}</Text>
    </View>
  );
}
