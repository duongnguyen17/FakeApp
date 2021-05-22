import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
function Comment() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.avatar}>
        <Image
          style={{
            borderRadius: 50,
            borderColor: '#f2f2f2',
            borderWidth: 2,
            width: 50,
            height: 50,
          }}
          source={require('../assets/avatar.jpg')} />
      </TouchableOpacity>
      <View style={styles.comment}>
        <TouchableOpacity>
          <Text style={{fontWeight:'700', fontSize:18}}>Duong Nguyen</Text>
        </TouchableOpacity>
        <Text style={{fontWeight:'500', fontSize:17}}>Comment hiện ở đây</Text>
        <Text style={{fontWeight:'200', fontSize:13, color:'gray'}}>Time</Text>
      </View>
    </View>
  )
}

export default Comment
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    flexDirection: 'row',
    marginVertical: 10
  },
  avatar: {
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  comment:{
    marginHorizontal:5
  }
})