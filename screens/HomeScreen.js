import React from "react";
import { View, FlatList, Text, Image, TouchableOpacity } from "react-native";

const posts = [
  { id: "1", type: "video", src: require("../assets/videos/video1.mp4") },
  { id: "2", type: "image", src: require("../assets/images/img1.jpg") },
  { id: "3", type: "video", src: require("../assets/videos/video2.mp4") },
];

export default function HomeScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("Post", { post: item })}>
      {item.type === "image" ? (
        <Image source={item.src} style={{ width: "100%", height: 200 }} />
      ) : (
        <Text style={{ height: 200, backgroundColor: "#000", color: "#fff", textAlign: "center", paddingTop: 90 }}>
          Film: {item.id} (video placeholder)
        </Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList data={posts} renderItem={renderItem} keyExtractor={item => item.id} />
    </View>
  );
}
