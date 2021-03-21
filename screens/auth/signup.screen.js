import React from 'react'
import { View, Text, StyleSheet, Button} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

function Signup(props) {
    return (
        <View style={styles.body}>
            <TextInput placeholder="Phone" onChangeText={(text) =>{}} />
            <TextInput placeholder="Password" secureTextEntry={true} onChangeText={(pass) =>{}} />
            <TextInput placeholder="Name Account" onChangeText={(pass) =>{}} />
            <Text style={{ color: 'red', alignSelf: 'center' }} >loi hien o day</Text>
            <Button  style={{ backgroundColor: "#1a73e8", marginTop: '50%' }} mode="contained" uppercase={false} title='Register' />
            <Text
                onPress={() => props.navigation.navigate("Login")}
                style={{
                    color: "#1a73e8",
                    alignSelf: 'center',
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginTop: 20
                }}
            >Have an account ? Login</Text>
        </View>
    )
}

export default Signup;

const styles = StyleSheet.create({

    body: {
        paddingTop: '25%',
        height: '100%',
        padding: 20,
        backgroundColor: "#ffffff"
    },
});