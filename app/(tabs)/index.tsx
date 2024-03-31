import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { Camera } from "expo-camera";
import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect } from '@react-navigation/native';

export default function TabOneScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const camRef = useRef<Camera>(null);
  const [cameraKey, setCameraKey] = useState(0);
  const [capturePhoto, setCapturePhoto] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Coloque aqui o código para reiniciar a câmera
      // Por exemplo, você pode definir um estado que força a câmera a reiniciar
      setCameraKey(prevKey => prevKey + 1);
  
      return () => {
        // Coloque aqui o código para limpar quando a tela perde o foco
      };
    }, [])
  );

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  async function takePicture() {
    if (camRef){
    const photo = await camRef.current?.takePictureAsync();
    setCapturePhoto(photo?.uri);
    setOpen(true);
    console.log(photo);
    }
  } 

  return (
    <SafeAreaView style={styles.container}>
      <Camera style={styles.camera} type={0} ref={camRef} key={cameraKey}>
        <View
          
          style={{
            flex: 1,
            backgroundColor: "transparent",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image 
              source={require("@/assets/images/splash.png")}
              style={{
                width: "130%",
                height: "100%",
                marginBottom: 20,
                opacity: 0.2,
              }}
            >

          </Image>
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 30,
            }}
            onPress={takePicture}
          >

            <FontAwesome name="camera" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>

      {capturePhoto && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={open}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              margin: 20,
            }}
          >
            <TouchableOpacity
              style={{
                margin: 10,
                
              }}
              onPress={() => setOpen(false)}
            >
              <FontAwesome name="window-close" size={50} color="gray" />
            </TouchableOpacity>

            <Image
              style={{
                width: "50%",
                height: "50%",
                borderRadius: 20,
              }}
              source={{ uri: capturePhoto }}
            />
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
