import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Pressable, Image } from "react-native";
import { Camera } from 'expo-camera'
import { MaterialIcons } from '@expo/vector-icons';
import { cardPay } from "../../apis/CardAPi";
import TokenUtils from "../../stores/TokenUtils";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

export default function QRcodeScanner() {
  const navigation = useNavigation()
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const cameraRef = useRef(null);
  const [token, setToken] = useState('')
  const [cardList, setCardList] = useState([])

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
      const accessToken = await TokenUtils.getAccessToken();
      setToken(accessToken);
    })();
  }, []);

  useFocusEffect(() => {
    setScanned(false);
  });

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const barcodeData = JSON.parse(data)

    const requestBody = {
      storeRegNo: barcodeData.storeCode, 
      storeName: barcodeData.orderName, 
      orderId: barcodeData.orderId,
      orderName: barcodeData.orderName,
      largeCategoryId: barcodeData.largeCategoryId,
      smallCategoryId: barcodeData.smallCategoryId, 
      totalAmount: parseInt(barcodeData.totalAmount, 10),
      vat: barcodeData.vat,
      totalInstallCnt: 0, 
      requestedAt: barcodeData.requestedAt,
      redirectUrl: barcodeData.redirectUrl
    };

    cardPay(
      token,
      requestBody,
      (res) => {
        setCardList(res.data.cardList)
        console.log(res.data.cardList)
        navigation.navigate('PayLoadingPage', {cardList: res.data.cardList, totalAmount: requestBody.totalAmount, orderId:requestBody.orderId});
      },
      (err) => {
        console.log(requestBody)
        console.log(err)
        alert('오류 발생! 다시 진행해주세요.')
        navigation.navigate('Home')
      }
    );
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
        <>
        <Pressable onPress={() => navigation.navigate('HomePage')} style={styles.cameraButton1}>
          <MaterialIcons name="chevron-left" size={64} color="white" />
        </Pressable>
        <Image source={require('../../../assets/QRBorder.png')} style={styles.cameraButton2}/>
      </>
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
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 999,
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
  cameraButton1: {
    position: 'absolute',
    top: 50,
    left: 140,
    alignSelf: 'center',
  },
  cameraButton2: {
    position: 'absolute',
    top: 200,
    alignSelf: 'center',
    width: 300,
    height: 300,
  },
});
