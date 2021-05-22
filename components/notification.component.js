import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);
function Notification(props) {
  const {avatar, name, content, postId, time, gotoPost} = props;

  return (
    <TouchableOpacity style={styles.notification} onPress={() => {
      gotoPost(postId)
    }}> 
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Image style={styles.avatar} source={{uri: avatar}} />
        <View style={{flexDirection: 'column', width: screenWidth - 80}}>
          <Text style={styles.name}>{name}</Text><Text>{content}</Text>
          <Text style={{fontSize: 13, color: 'gray'}}>{time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
export default Notification;
const styles = StyleSheet.create({
  notification: {
    marginTop: 3,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {height: 0, width: 0},
    height: 90,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  name:{
  }
});
