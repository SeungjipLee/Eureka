// import { View} from 'react-native';
// import { getTokens } from '../../utils/networks/tokenUtils';
// import AuthTemplate from "../templates/AuthTemplate";
// import { useState } from "react";

// const AuthPage = ({navigation}) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
    
//     const onPressLoginButton = () =>{
//         getTokens(email, password, navigation);
//     }

//     const onPressButton = () =>{
//       navigation.navigate('SignUpPage');
//       }
//     const onPressResendMail = () =>{
//       navigation.navigate('ResendMailPage');
//     }

//   return (
//     <View style ={{padding: 50}}>
//       <AuthTemplate 
//         onPressButton={onPressButton} 
//         onPressLoginButton={onPressLoginButton}
//         onPressResendMail={onPressResendMail}
//         email={email}
//         setEmail={setEmail}
//         password={password}
//         setPassword={setPassword}
//         />
//     </View>
//     );
// }

// export default AuthPage;

import React, {Component} from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';


export default class HomeScreen extends Component {
    render(){
        return (
            <View style={styles.container}>
              <Text>테스트 앱 안내문구.</Text>
              <Button title="회원가입"></Button>
              <Button title="로그인"></Button>
            </View>
          );
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
