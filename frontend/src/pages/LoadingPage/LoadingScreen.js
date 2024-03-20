import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      navigation.navigate('HomePage');
    }
  }, [isLoading]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Image
            source={require('../../../assets/loading.png')}
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    marginBottom: 20,
  },
  contentContainer: {
    // 로딩이 완료된 후에 표시될 컨텐츠의 스타일을 지정합니다.
  },
});

export default LoadingScreen;
