import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {View, Text, Button, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {signup} from '../../redux/actions/auth.action';

function SignupScreen(props) {
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (props.token != '') {
      props.navigation.navigate('TabBar');
    }
  }, [props.token]);
  const handleSignup = () => {
    props.signup(phonenumber, password, username);
  };
  return (
    <View style={styles.body}>
      <TextInput
        placeholder="Phonenumber"
        onChangeText={phone => {
          setPhonenumber(phone);
        }}
        keyboardType={'number-pad'}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={pass => {
          setPassword(pass);
        }}
      />
      <TextInput
        placeholder="Username"
        onChangeText={name => {
          setUsername(name);
        }}
      />
      <Text style={{color: 'red', alignSelf: 'center'}}>{props.error}</Text>
      <Button
        style={{backgroundColor: '#1a73e8', marginTop: '50%'}}
        uppercase={false}
        title="Register"
        onPress={() => {
          handleSignup();
        }}
      />
      <Text
        onPress={() => props.navigation.navigate('LoginScreen')}
        style={{
          color: '#1a73e8',
          alignSelf: 'center',
          fontSize: 15,
          fontWeight: 'bold',
          marginTop: 20,
        }}>
        Have an account ? Login
      </Text>
    </View>
  );
}
const mapStateToProp = state => {
  return {
    // phonenumber: state.user.phonenumber,
    // password: state.user.password,
    // username: state.user.username,
    token: state.auth.token,
    error: state.auth.error,
  };
};
const mapDispatchToProp = {
  signup,
};
export default connect(mapStateToProp, mapDispatchToProp)(SignupScreen);

const styles = StyleSheet.create({
  body: {
    paddingTop: '25%',
    height: '100%',
    padding: 20,
    backgroundColor: '#ffffff',
  },
});
