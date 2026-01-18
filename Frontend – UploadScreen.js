import React, { useState, useContext } from "react";
import { View, Text, Button, Image, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Video from "react-native-video";

export default function UploadScreen() {
  const { token, user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [type, setType] = useState("image");
  const [preview, setPreview] = useState(null);

  const pickFile = async (fileType) => {
    let result;
    if (fileType === "image") {
      result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.5 });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Videos });
    }

    if (!result.cancelled) {
      setFile(result);
      setPreview(result.uri);
      setType(fileType);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Wybierz plik!");
    if (user.subscriptionName === "Silver" && type === "video") return alert("Silver nie może dodawać wideo");

    const formData = new FormData();
    const uriParts = file.uri.split(".");
    const fileExt = uriParts[uriParts.length - 1];

    formData.append("file", {
      uri: file.uri,
      type: `${type}/${fileExt}`,
      name: `upload.${fileExt}`
    });
    formData.append("type", type);

    try {
      const res = await axios.post("http://localhost:5000/api/posts/create", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      });
      alert("Upload zakończony!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Błąd uploadu");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Wybierz zdjęcie" onPress={() => pickFile("image")} />
      <Button title="Wybierz wideo" onPress={() => pickFile("video")} />
      {preview && type === "image" && <Image source={{ uri: preview }} style={{ width: "100%", height: 200, marginTop: 10 }} />}
      {preview && type === "video" && <Video source={{ uri: preview }} style={{ width: "100%", height: 200, marginTop: 10 }} controls />}
      <Button title="Wyślij plik" onPress={handleUpload} />
    </View>
  );
}
