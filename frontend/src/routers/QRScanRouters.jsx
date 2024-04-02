import { createStackNavigator } from "@react-navigation/stack";
import PayCheck from '../pages/QRScanPage/PayCheck'
import PayLoadingPage from '../pages/QRScanPage/PayLoadingPage'
import PayComplete from '../pages/QRScanPage/PayComplete'
import QRcodeScanner from "../pages/QRScanPage/QRCodeScanner";


function QRScanRouters () {
  const QRStack = createStackNavigator()
  return (
    <QRStack.Navigator
      screenOptions={{ headerShown: false }}>
      <QRStack.Screen name="QRScanner" component={QRcodeScanner}/>
      <QRStack.Screen name="PayLoadingPage" component={PayLoadingPage}/>
      <QRStack.Screen name="PayCheck" component={PayCheck}/>
      <QRStack.Screen name="PayComplete" component={PayComplete}/>
    </QRStack.Navigator>
  )
}

export default QRScanRouters