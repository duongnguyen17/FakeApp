import React from "react"
import {
    View,
    Text,
    Button
} from "react-native"

export default function userProfile(props){
    return(
        <View>
            <Text>
                User Profile
            </Text>
            <Button 
            title="Logout"
            onPress={()=>{props.navigation.navigate("Login")}}
            />
        </View>
    )
}