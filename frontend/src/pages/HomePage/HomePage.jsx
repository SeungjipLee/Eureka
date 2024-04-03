import React from 'react'
import { StyleSheet, ScrollView, View } from "react-native"
import HomePayCard from "./components/HomePayCard"
import HomeMonthly from "./components/HomeMonthly"
import HomeOnlyPay from "./components/HomeOnlyPay"
import HomeForYou from "./components/HomeForYou"
import { useFocusEffect, useNavigation } from '@react-navigation/native'

function HomePage() {
  const navigation = useNavigation()
  useFocusEffect(
    React.useCallback(() => {
      return () => {
      };
    }, [navigation])
  );
  return (
      <ScrollView style={styles.container}>
        <View style={styles.paycard}><HomePayCard /></View>
        <View style={styles.monthly}><HomeMonthly /></View>
        <View style={styles.onlypay}><HomeOnlyPay /></View>
        <View style={styles.foryou}><HomeForYou /></View>
      </ScrollView>
  )
}

export default HomePage

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginHorizontal: 10,
    flex: 1,
  },
  paycard: {
    marginTop: 20,
    marginBottom:10,
  },
  monthly: {
    marginBottom:10,
  },
  onlypay: {
    marginBottom:10,
    height:100,
  },
  foryou: {
    minHeight: 140,
  },
})