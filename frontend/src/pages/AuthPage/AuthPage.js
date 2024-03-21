import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';


const App = () => {

  const [BorderBottomColor1, setBorderBottomColor1] = useState('lightgray')
  const [BorderBottomColor2, setBorderBottomColor2] = useState('lightgray')
  const [BorderBottomColor3, setBorderBottomColor3] = useState('lightgray')
  const [BorderBottomColor4, setBorderBottomColor4] = useState('lightgray')
  const [BorderBottomColor5, setBorderBottomColor5] = useState('lightgray')

  const [PhoneNum, setPhoneNum] = useState(0);

  const [RNum, setRNum] = useState(0);
  const [RNum2, setRNum2] = useState(0);

  const [Name, setName] = useState('');

  const [pickerValue, setPickerValue] = useState('SKT'); // picker의 선택된 값

  const MiddleView = () => (
    <View
      style={styles.TextInputView}>
      <Text
        style={{
          color: 'lightgray'
        }}>휴대폰 번호</Text>
      <TextInput
        style={styles.TextInput}
        placeholder='휴대폰 번호'
        value={PhoneNum}
        onChangeText={value => {
          setPhoneNum(value);
        }}
        onFocus={() => {
          setBorderBottomColor1('#3675FF');
        }}
        onEndEditing={() => {
          setBorderBottomColor1('lightgray');
        }}></TextInput>
    </View>
  );

  const MiddleView2 = () => (
    <View
      style={styles.TextInputView}>
      <Text
        style={{
          color: 'lightgray'
        }}>
        주민등록 번호
      </Text>
      <View
        style={{
          flexDirection: 'row',
          height: '50%',
          alignItems: 'center',
        }}>
        <TextInput
          style={styles.TextInput_half}
          placeholder='주민등록 번호'
          value={RNum}
          onChangeText={value => {
            setRNum(value);
          }}
          maxLength={6}

          onFocus={() => {
            setBorderBottomColor2('#3675FF');
          }}
          onEndEditing={() => {
            setBorderBottomColor2('lightgray');
          }} />
        <View
          style={{
            width: '10%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: '300' }}> - </Text>
        </View>
        <TextInput
          style={[
            styles.TextInput_half,
            { width: '8%', borderBottomColor: BorderBottomColor3 },
          ]}
          value={RNum2}
          onChangeText={value => {
            setRNum2(value);
          }}
          maxLength={1}
          onFocus={() => {
            setBorderBottomColor3('red');
          }}
          onEndEditing={() => {
            setBorderBottomColor3('lightgray');
          }} />

        <TextInput
          style={[
            styles.TextInput_half,
            { borderBottomWidth: 0, width: '37%' },
          ]}
          value="000000"
          secureTextEntry={true}
          editable={false}
        />
      </View>
    </View>
  );

  const MiddleView3 = () => (
    <View
      style={styles.TextInputView}>
      <Text
        style={{
          color: 'lightgray'
        }}>이름</Text>
      <TextInput
        style={[
          styles.TextInput,
          { borderBottomColor: BorderBottomColor4 }
        ]}
        placeholder='홍길동'
        value={Name}
        onChangeText={value => {
          setName(value);
        }}
        onFocus={() => {
          setBorderBottomColor4('#3675FF');
        }}
        onEndEditing={() => {
          setBorderBottomColor4('lightgray');
        }}></TextInput>
    </View>
  );

  const MiddleView4 = () => (
    <View style={styles.TextInputView}>
      <Text style={{ color: 'lightgray' }}>통신사 선택</Text>
      <Picker
        selectedValue={pickerValue}
        onValueChange={(item) => setPickerValue(item)}
      >
        <Picker.Item label="SKT" value="SKT" />
        <Picker.Item label="LGU+" value="LGU+" />
        <Picker.Item label="KT" value="KT" />
      </Picker>
    </View>
  );



  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    TextInputView: {
      width: '100%',
      height: '20%',
      marginTop: '5%',
      display: 'flex',
      justifyContent: 'center',
      // backgroundColor: 'gray',
    },
    TextInput: {
      width: '100%',
      height: '50%',
      backgroundColor: 'white',
      borderBottomColor: BorderBottomColor1,
      borderBottomWidth: 1,
      fontSize: 24,
      fontWeight: '600',
    },
    TextInput_half: {
      width: '45%',
      height: '100%',
      // backgroundColor: 'orange',
      borderBottomColor: BorderBottomColor2,
      borderBottomWidth: 1,
      fontSize: 24,
      fontWeight: '600',
    },
  });


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
        }}>

        <View
          style={{
            width: '100%',
            height: '15%',
            // backgroundColor: 'skyblue',
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold'
            }}>입력한 정보를 확인해주세요</Text>
        </View>
        <View
          style={{
            width: '100%',
            height: '50%',

          }}>
          {/* <Button 
          title='Test'
          onPress={() => {
            console.log(PhoneNum);
          }}
          ></Button> */}
          {MiddleView()}
          {MiddleView4()}
          {MiddleView2()}
          {MiddleView3()}
        </View>
        <View
          style={{
            width: '100%',
            height: '35%',
            backgroundColor: 'red',
          }}></View>

      </View>
    </SafeAreaView>
  );
};



export default App;
