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
  const {notification, isSeen} = props;

  return (
    <TouchableOpacity
      style={[
        styles.notification,
        {backgroundColor: isSeen ? '#fff' : '#b3d9ff'},
      ]}
      onPress={() => {
        if (!isSeen) {
          props.seeNotification(notification._id);
        }
        props.gotoPostDetail(notification.postId);
      }}>
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Image
          style={styles.avatar}
          source={
            notification.authorAvatar == null ||
            notification.authorAvatar == undefined ||
            notification.authorAvatar == ''
              ? require('../assets/avatar_null.jpg')
              : {uri: notification.authorAvatar}
          }
        />
        <View style={{flexDirection: 'column', width: screenWidth - 80}}>
          <Text style={styles.textNoti}>
            <Text style={{fontWeight: 'bold'}}>{notification.authorName} </Text>
            {notification.described}
          </Text>

          <Text style={{fontSize: 13, color: 'gray'}}>
            {notification.created.slice(0, 10)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
export default Notification;
const styles = StyleSheet.create({
  notification: {
    minHeight: 85,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  textNoti: {
    fontSize: 18,
  },
});
