import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Image,
  TextInput,
  ToastAndroid,
  Keyboard,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {connect} from 'react-redux';
import Comment from '../components/commentTag.component';
import {
  getPost,
  getListComment,
  commentPost,
  deleteComment,
} from '../redux/actions/post.action';
import {launchImageLibrary} from 'react-native-image-picker';
import {createFormData} from './createPostScreen.screen';
import {screenWidth} from '../constants';
import {TabActions} from '@react-navigation/native';
const PostDetail = props => {
  const {auth, post} = props;
  const [photo, setPhoto] = useState(null);
  const [described, setDescribed] = useState('');
  const choosedPhoto = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response) {
        //console.log(`response`, response);
        setPhoto(response);
      }
    });
  };
  const submit = () => {
    const check = checkContent();
    if (photo == null && !check) {
      ToastAndroid.show('comment khong co noi dung', ToastAndroid.SHORT);
    } else {
      const data = createFormData(photo, {described: described});
      // gọi đến dispatch
      props.commentPost(auth.token, post._id, data);
      //props.navigation.dispatch(StackActions.replace('Comment'));
    }
  };
  const checkContent = () => {
    const boo = described.replace(/\s/g, '').length;
    return !!boo;
  };
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };
  return (
    <GestureRecognizer
      onSwipeLeft={state => {
        console.log('object');
        const jumpToAction = TabActions.jumpTo('TabBar');
        props.navigation.dispatch(jumpToAction);
      }}
      style={{flex: 1}}
      config={config}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {post.commentList.map((value, index) => (
            <Comment key={index} comment={value} />
          ))}
        </ScrollView>
        <View style={styles.inputComment}>
          <View
            style={{
              backgroundColor: '#e6e6e6',
              height: 45,
              width: screenWidth - 30,
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <MaterialCommunityIcons
              onPress={() => {
                choosedPhoto();
              }}
              name={'camera-outline'}
              size={26}
              color={'gray'}
              style={{marginHorizontal: 10}}
            />
            <TextInput
              style={{flex: 1}}
              placeholder={'Write a comment'}
              onChangeText={text => {
                setDescribed(text);
              }}
            />
            <View>
              <MaterialCommunityIcons
                onPress={() => {
                  Keyboard.dismiss();
                  console.log('object');
                  if (props.post.isClosed) {
                    ToastAndroid.show('post da dong', ToastAndroid.SHORT);
                  } else {
                    submit();
                  }
                }}
                name={'send-outline'}
                size={26}
                color={'gray'}
                style={{marginHorizontal: 10}}
              />
            </View>
          </View>
          {photo == null ? null : (
            <View style={{marginVertical: 5}}>
              <Image
                style={{width: 200, height: 300}}
                source={{uri: photo.uri}}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    </GestureRecognizer>
  );
};
const mapStateToProp = state => ({
  auth: {
    _id: state.auth._id,
    username: state.auth.username,
    avatar: state.auth.avatar,
    token: state.auth.token,
  },
  post: state.posts.post,
});
const mapDispatchToProp = {
  getListComment,
  getPost,
  commentPost,
  deleteComment,
};
export default connect(mapStateToProp, mapDispatchToProp)(PostDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  scrollView: {
    backgroundColor: '#f2f2f2',
    marginBottom: 2,
    marginTop: 2,
  },
  inputComment: {
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
