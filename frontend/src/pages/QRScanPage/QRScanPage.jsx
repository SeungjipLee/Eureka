import { View, Text, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native";
import QRCodeScanner from "./QRCodeScanner";
import { MaterialIcons } from '@expo/vector-icons';

function QRScanPage () {
  const navigation = useNavigation()

  return (
    <View style={{flex:1 , justifyContent: 'center', alignItems: 'center'}}>
      <QRCodeScanner />
    </View>
  )
}

export default QRScanPage