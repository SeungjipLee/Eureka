import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Pressable, Dimensions } from "react-native";
import { Camera } from "expo-camera";
import { MaterialIcons } from '@expo/vector-icons';

export default function QRcodeScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcodeData, setBarcodeData] = useState(null)
  const cameraRef = useRef(null);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setBarcodeData({ type, data })
    alert('결제 코드 인식 성공');
    console.log({ type, data })
  };

  const handleRetryScan = () => {
    setScanned(false);
  };

  const handleCameraReady = async () => {
    if (cameraRef.current) {
      const sizes = await cameraRef.current.getAvailablePictureSizesAsync('4:3');
      const pictureSize = sizes.find(size => size.width <= 1920);
      if (pictureSize) {
        await cameraRef.current.setPictureSizeAsync(pictureSize.width, pictureSize.height);
      }
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={Camera.Constants.Type.back}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        onCameraReady={handleCameraReady}
      />
      {scanned && (
        <View style={styles.overlay}>
          <Pressable style={styles.scanAgainButton} onPress={handleRetryScan}>
            <Text style={styles.scanAgainText}>다시 촬영하기</Text>
          </Pressable>
        </View>
      )}
      {!scanned && (
        <View style={styles.cameraButton}>
          <MaterialIcons name="photo-camera" size={64} color="white" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    position: 'relative',
  },
  camera: {
    flex: 1,
    aspectRatio: 3/4,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanAgainButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 5,
  },
  scanAgainText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 50,
    padding: 10,
  },
});
