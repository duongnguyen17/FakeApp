import {React, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {View, Text, Button, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Login} from '../../redux/actions/auth.action';

function LoginScreen(props) {
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // useEffect(() => {
  //   return () => {
  //     setPhonenumber(phonenumber);
  //     setPassword(password);
  //     setError(error);
  //   };
  // }, [error, phonenumber, password]);

  // const handleLogin = () => {
  //   Login(phonenumber, password);
  //   if (error === '') {
  //     props.navigation.navigate('UserProfileScreen');
  //   }
  // };
  return (
    <View style={styles.body}>
      <TextInput
        placeholder="Phonenumber"
        onChangeText={text => {
          setPhonenumber(text);
        }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={pass => {
          setPassword(pass);
        }}
      />
      <Text style={{color: 'red', alignSelf: 'center'}}>{error}</Text>
      <Button
        style={{backgroundColor: '#1a73e8', marginTop: '50%'}}
        uppercase={false}
        title="login"
        onPress={() => {
          //handleLogin();
        }}
      />
      <Text
        onPress={() => props.navigation.navigate('SignupScreen')}
        style={{
          color: '#1a73e8',
          alignSelf: 'center',
          fontSize: 15,
          fontWeight: 'bold',
          marginTop: 20,
        }}>
        Create a new account
      </Text>
    </View>
  );
}
// function mapStateToProp(state) {
//   return {
//     phonenumber: state.phonenumber,
//     password: state.password,
//     error: state.error,
//   };
// }
// const mapDispatchToProp = {
//   Login,
// };
export default LoginScreen;//connect(mapStateToProp, mapDispatchToProp)(LoginScreen);

const styles = StyleSheet.create({
  body: {
    paddingTop: '25%',
    height: '100%',
    padding: 20,
    backgroundColor: '#ffffff',
  },
});
