import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ConfirmLoading = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>인증 완료!</Text>
      <Image
        source={require('../../../../assets/Ok.png')}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#3675FF'
  },
  text: {
    marginBottom: 20, // 텍스트와 이미지 사이의 간격을 조정합니다.
    fontSize: 50,
    color: 'white'
  },
  image: {
    width: 100, // 이미지의 너비를 설정합니다.
    height: 100, // 이미지의 높이를 설정합니다.
  },
});

export default ConfirmLoading;
