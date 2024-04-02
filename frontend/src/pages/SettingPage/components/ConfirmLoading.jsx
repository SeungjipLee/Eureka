import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, Image, StyleSheet } from 'react-native';


const ConfirmLoading = ({route}) => {
  const { message, style, redirect } = route.params || {}
  const navigation = useNavigation()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate(redirect) 
    }, 3000);
    return () => clearTimeout(timer); 
  }, []);

  return (
    <View style={styles.container}>
      <Text style={style}>{message}</Text>
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
    marginBottom: 20,
    fontSize: 50,
    color: 'white'
  },
  image: {
    width: 100, 
    height: 100, 
  },
});

export default ConfirmLoading;
