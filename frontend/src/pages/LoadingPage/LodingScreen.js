import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';


const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 여기에 초기화 작업이나 데이터 로딩 등을 수행합니다.
    // 예를 들어, setTimeout을 사용하여 3초 후에 isLoading을 false로 변경하는 것으로 가정합니다.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Image
            source={require('./assets/loading.png')}
            style={styles.loadingImage}
            resizeMode="contain"
          />
        </View>
      ) : (
        <View style={styles.contentContainer}>
          {/* 로딩이 완료된 후에 표시할 컨텐츠를 여기에 추가합니다. */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingImage: {
    width: Dimensions.get('window').width, // 화면 너비에 맞게 이미지의 너비 설정
    height: Dimensions.get('window').height, // 화면 높이에 맞게 이미지의 높이 설정
    marginBottom: 20,
  },
  contentContainer: {
    // 로딩이 완료된 후에 표시될 컨텐츠의 스타일을 지정합니다.
  },
});

export default LoadingScreen;