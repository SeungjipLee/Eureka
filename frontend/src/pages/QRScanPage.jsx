import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const FingerprintAuth = () => {
  const [authStatus, setAuthStatus] = useState('지문 인증을 기다리고 있습니다.');

  const handleFingerprintAuth = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: '인증을 위해 지문을 사용하세요',
      cancelLabel: '취소',
      fallbackLabel: '다른 방법 사용',
    });

    if (result.success) {
      setAuthStatus('인증 성공!');
    } else {
      setAuthStatus(`인증 실패: ${result.error}`);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="지문 인증 시작" onPress={handleFingerprintAuth} />
      <Text style={styles.statusText}>{authStatus}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  statusText: {
    marginTop: 20,
  },
});

export default FingerprintAuth;


// import React, { useState, useEffect } from 'react';
// import { Text, View, StyleSheet, Button } from 'react-native';
// import { BarCodeScanner } from 'expo-barcode-scanner';

// export default function App() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [scanned, setScanned] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   const handleBarCodeScanned = ({ type, data }) => {
//     setScanned(true);
//     alert(`Bar code with type ${type} and data ${data} has been scanned!`);
//   };

//   if (hasPermission === null) {
//     return <Text>Requesting for camera permission...</Text>;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <BarCodeScanner
//         onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//         style={StyleSheet.absoluteFillObject}
//       />
//       {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
