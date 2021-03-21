import React from 'react'

import { View, Text, Button, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

function Login(props) {
  return (
    <View style={styles.body}>


      <TextInput placeholder="Phone" onChangeText={(text) => { }} />

      <TextInput placeholder="Password" secureTextEntry={true} onChangeText={(pass) => { }} />
      <Text style={{ color: 'red', alignSelf: 'center' }} >loi hien o day</Text>
      <Button style={{ backgroundColor: "#1a73e8", marginTop: '50%' }}
        mode="contained"
        uppercase={false}
        title='login' 
        onPress={()=>{props.navigation.navigate("Profile")}}/>
      <Text
        onPress={() => props.navigation.navigate("Signup")}
        style={{
          color: "#1a73e8",
          alignSelf: 'center',
          fontSize: 15,
          fontWeight: 'bold',
          marginTop: 20
        }}
      >Create a new account</Text>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({

  body: {
    paddingTop: '25%',
    height: '100%',
    padding: 20,
    backgroundColor: "#ffffff"
  },
});