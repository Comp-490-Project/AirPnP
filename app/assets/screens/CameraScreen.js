import React, { useState, useEffect } from 'react';
import { View, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function CameraScreen({ navigation, route }) {
  const [image, setImage] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

  const { geohash } = route.params;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, //Only images allowed (for now)
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
      if (!galleryStatus) {
        alert('Required');
      }
    })();
  }, [hasGalleryPermission]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <View>
        <Button
          title="Save"
          onPress={() => {
            if (!image) {
              alert('Please upload an image!');
            } else {
              navigation.navigate('Save', { geohash, image });
            }
          }}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Button title="Pick Picture" onPress={() => pickImage()} />
      </View>
      {image && (
        <Image
          source={{ uri: image }}
          style={{
            height: 350,
            width: 350,
            alignSelf: 'center',
            marginTop: 20,
          }}
        />
      )}
    </View>
  );
}
