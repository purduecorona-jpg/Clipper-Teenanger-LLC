import React, { useState } from "react";
import { View, Button, Image, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

export default function UploadMedia() {
  const [selected, setSelected] = useState(null);
  const [uploadUrl, setUploadUrl] = useState("");

  const pickFile = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0.5
    });

    if (!result.canceled) {
      setSelected(result.assets[0]);
    }
  };

  const uploadFile = async () => {
    if (!selected) return;

    const formData = new FormData();
    formData.append("file", {
      uri: selected.uri,
      type: selected.type === "video" ? "video/mp4" : "image/jpeg",
      name: selected.uri.split("/").pop()
    });

    try {
      const res = await axios.post("http://localhost:5000/api/uploads/file", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setUploadUrl(res.data.url);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Wybierz plik" onPress={pickFile} />
      {selected && <Text>Wybrano: {selected.uri}</Text>}
      <Button title="Wyślij plik" onPress={uploadFile} />
      {uploadUrl !== "" && (
        <>
          <Text>URL pliku:</Text>
          <Text>{uploadUrl}</Text>
          {selected.type !== "video" && <Image source={{ uri: uploadUrl }} style={{ width: 200, height: 200 }} />}
        </>
      )}
    </View>
  );
}
