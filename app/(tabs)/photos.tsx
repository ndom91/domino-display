import { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/Button';
import Toast from 'react-native-toast-message';

type Progress = { loaded: number, total: number }

const ACCOUNT_ID = ""
const ENDPOINT = ""
const ACCESS_KEY_ID = ""
const SECRET_ACCESS_KEY = ""
const BUCKET_NAME = ""

const s3Client = new S3Client({
  endpoint: ENDPOINT,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
  region: 'auto', // Cloudflare R2 doesn't use regions, but this is required by the SDK
});

export default function TabTwoScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [percentage, setPercentage] = useState(0);

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images", "videos"],
      // aspect: [4, 3],
      allowsEditing: true,
      exif: true,
    });

    handleImagePicked(result);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      // aspect: [4, 3],
      allowsEditing: true,
      quality: 1,
      exif: true,
    });

    handleImagePicked(result);
  };


  async function handleImagePicked(pickerResult: ImagePicker.ImagePickerResult) {
    try {
      if (pickerResult.canceled) {
        alert("Upload cancelled");
        return;
      } else {
        setPercentage(0);
        setImage(pickerResult.assets[0].uri)
        const img = await fetchImageFromUri(pickerResult.assets[0].uri);
        Toast.show({
          type: 'success',
          text1: 'Image URI:',
          text2: pickerResult.assets[0].uri,
        })
        const uploadUrl = await uploadImage("demo.jpg", img);
        Toast.show({
          type: 'success',
          text1: 'Upload Successful',
          text2: uploadUrl,
        })
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed");
    }
  };

  async function uploadImage(filename: string, img: Blob) {
    try {
      const params = {
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: img,
        ContentType: img.type,
      };

      const upload = new Upload({
        client: s3Client,
        params: params,
      });

      upload.on("httpUploadProgress", (progress: Progress) => {
        const percentage = Math.round((progress.loaded / progress.total) * 100);
        setPercentage(percentage);
      });

      const response = await upload.done();

      if (response.$metadata.httpStatusCode === 200) {
        return `https://${BUCKET_NAME}.${ACCOUNT_ID}.r2.cloudflarestorage.com/00001/${filename}`;
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const fetchImageFromUri = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={320} name="camera" style={styles.headerImage} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Photos</ThemedText>
      </ThemedView>

      {percentage !== 0 && <ThemedText style={styles.percentage}>{percentage}%</ThemedText>}

      {image && (
        <ThemedView>
          <Image
            source={{ uri: image }}
            style={{ width: 250, height: 250 }}
          />
        </ThemedView>
      )}

      <Button onPress={pickImage} title="Pick an image from camera roll" />
      <Button onPress={takePhoto} title="Take a photo" />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -100,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  percentage: {
    marginBottom: 10,
  },
  result: {
    paddingTop: 5,
  },
  info: {
    textAlign: "center",
    marginBottom: 20,
  },
});
