import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
  Animated,
  RefreshControl,
} from 'react-native';

import Header from '../../components/Header';
import Notification from '../../components/notification.component';
import {
  getListNotification,
  seeNotification,
  seeAllNotification,
} from '../../redux/actions/user.action';
import {connect} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
function NotificationScreen(props) {
  const {notifications, token} = props;
  const [loading, setLoading] = useState(false);
  let update = useRef(null).current;
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      updateListNotification();
    }
    return () => {
      clearInterval(update);
    };
  }, [isFocused]);

  const getListNotification = async () => {
    await props.getListNotification(token);
  };
  const updateListNotification = () => {
    update = setInterval(getListNotification, 1000);
  };
  const seeNotification = async id => {
    await props.seeNotification(token, id);
  };
  const seeAllNotification = async () => {
    await props.seeAllNotification(token);
  };
  const gotoPostDetail = id => {
    props.navigation.navigate('PostDetail', {_id: id});
  };
  const refresh = () => {};
  const onPress = () => {};
  //làm cho header động
  const headeHeight = new Animated.Value(0);
  const _scroll_y = Animated.diffClamp(headeHeight, 0, 50);
  const _header_height = _scroll_y.interpolate({
    inputRange: [0, 50],
    outputRange: [50, 0],
  });

  const _header_translate_y = _scroll_y.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -50],
  });

  const _header_opacity = _scroll_y.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
  });
  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.header,
          {
            height: _header_height,
            transform: [{translateY: _header_translate_y}],
            opacity: _header_opacity,
          },
        ]}>
        <Header name={'Notification'} size={23} onPress={onPress} />
      </Animated.View>
      <Animated.ScrollView
        style={styles.scrollView}
        //showsVerticalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={15}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {y: headeHeight}},
            },
          ],
          {useNativeDriver: false},
        )}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => {}} />
        }>
        {notifications.map((value, index) => (
          <Notification
            key={index}
            notification={value.notification}
            isSeen={value.isSeen}
            gotoPostDetail={gotoPostDetail}
            seeNotification={seeNotification}
          />
        ))}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}
const mapStateToProp = state => ({
  notifications: state.auth.notification,
  token: state.auth.token,
});

const mapDispatchToProp = {
  seeAllNotification,
  getListNotification,
  seeNotification,
};
export default connect(mapStateToProp, mapDispatchToProp)(NotificationScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});
