import { View, Text, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native";
import QRCodeScanner from "./QRCodeScanner";

function QRScanPage () {
  const navigation = useNavigation()

  return (
    <View style={{flex:1 , justifyContent: 'center', alignItems: 'center'}}>
      <QRCodeScanner />
      <Pressable onPress={() => navigation.navigate('HomePage')}>
        <Text>뒤로 가기</Text>
      </Pressable>
    </View>
  )
}

export default QRScanPage