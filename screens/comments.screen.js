import React from 'react'
import { StyleSheet, SafeAreaView, ScrollView, View, TextInput } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {screenWidth} from '../constants'

import Comment from '../components/commentTag.component'

function CommentScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Comment />
        <Comment />
        <Comment />
      </ScrollView>
      <View style={styles.inputComment}>
        <View style={{backgroundColor: '#f2f2f2', height:45,width:screenWidth-30,  borderRadius:20, flexDirection:'row', alignItems:'center'}}>
        <MaterialCommunityIcons onPress ={() => {}} name ={"camera-outline"} size ={26} color={'gray'} style={{marginHorizontal:10}}/>
        <TextInput style = {{flex:1}} placeholder={'Write a comment'}/>
        <MaterialCommunityIcons onPress={() => {}} name ={"send-outline"} size ={26} color={'gray'} style={{marginHorizontal:10}}/>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default CommentScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',

  },
  scrollView:{
    backgroundColor:'#fff',
    marginBottom:2,
    marginTop:2
  },
  inputComment:{
    height:60,
    backgroundColor:'#fff',
    justifyContent:'center',
    alignItems:'center'
  },
})