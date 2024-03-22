import React from 'react';
import { StyleSheet, Text, Button, View, SafeAreaView } from 'react-native';


const Test = () => {
  return (
    <SafeAreaView
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
      }}>
      <View
        style={{
          width: '90%',
          height: '100%',
          // backgroundColor: 'red',
          marginLeft: '5%',
        }}
      >
        <View
          style={{
            width: '20%',
            height: '100%',
            // backgroundColor: 'skyblue',
            marginLeft: '5%',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
            }}>입력한 정보를 확인해주세요</Text>
        </View>
        <View
          style={{
            width: '50%',
            height: '100%',
            // backgroundColor: 'orange',
            marginLeft: '5%',
          }}
        ></View>
        <View
          style={{
            width: '30%',
            height: '100%',
            // backgroundColor: 'yellow',
            marginLeft: '5%',
          }}
        ></View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Test;
