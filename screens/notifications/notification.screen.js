import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
  Animated,
} from 'react-native';

import AnimatedHeader from '../../components/animatedHeader.component';
import Notification from '../../components/notification.component';

function NotificationScreen(props) {
  //const offset = useRef(new Animated.Value(0)).current;

  const gotoPost = id => {
    props.navigation.navigate('PostDetail', {id: id});
  };
  const [notifications, setNotifications] = useState([
    {
      avatar: 'https://ctt-sis.hust.edu.vn/Content/Anh/anh_20173069.JPG',
      name: 'Duong Nguyen',
      content: 'đã......',
      postId: '1324123412',
      time: 2134213421,
    },
  ]);
  return (
    <SafeAreaView style={styles.container}>
      <AnimatedHeader
        // animatedValue={offset}
        name={'Notification'}
        size={23}
      />
      <ScrollView bounces={false} style={styles.listContainter}>
        {notifications.map((value, index) => (
          <Notification key={index} {...value} gotoPost={gotoPost} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default NotificationScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  listContainter: {},
});
