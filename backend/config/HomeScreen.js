import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import axios from "axios";
import PostCard from "../components/PostCard";

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts");
      setPosts(res.data);
    } catch (err) { console.error(err); }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <PostCard post={item} />}
    />
  );
}
