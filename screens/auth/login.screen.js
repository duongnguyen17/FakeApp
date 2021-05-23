import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {View, Text, Button, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {login} from '../../redux/actions/auth.action';

function LoginScreen(props) {
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    //console.log(phonenumber, password);
    props.login(phonenumber, password);
    console.log(props.token);
    if (props.token != '' && props.error == '') {
      props.navigation.navigate('UserProfileScreen');
    }
  };
  return (
    <View style={styles.body}>
      <TextInput
        placeholder="Phonenumber"
        onChangeText={phone => {
          setPhonenumber(phone);
        }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={pass => {
          setPassword(pass);
        }}
      />
      <Text style={{color: 'red', alignSelf: 'center'}}>{props.error}</Text>
      <Button
        style={{backgroundColor: '#1a73e8', marginTop: '50%'}}
        uppercase={false}
        title="login"
        onPress={() => {
          handleLogin(phonenumber, password);
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
const mapStateToProp = state => {
  return {
    token: state.auth.token,
    error: state.auth.error,
  };
};
const mapDispatchToProp = {
  login,
};
export default connect(mapStateToProp, mapDispatchToProp)(LoginScreen);

const styles = StyleSheet.create({
  body: {
    paddingTop: '25%',
    height: '100%',
    padding: 20,
    backgroundColor: '#ffffff',
  },
});
