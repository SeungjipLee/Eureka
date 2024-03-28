import { View, Text, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native";


function QRScanPage () {
  const navigation = useNavigation()

  return (
    <View style={{flex:1 , justifyContent: 'center', alignItems: 'center'}}>
      <Pressable onPress={() => navigation.navigate('PayLoadingPage')}>
        <Text>QR 찍기</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('HomePage')}>
        <Text>뒤로 가기</Text>
      </Pressable>
    </View>
  )
}

export default QRScanPage