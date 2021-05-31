import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  ToastAndroid,
  Keyboard,
  TextInput,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {screenWidth} from '../constants';
import {connect} from 'react-redux';
import Comment from '../components/commentTag.component';
import {StackActions, TabActions} from '@react-navigation/native';
import {
  getPost,
  getListComment,
  commentPost,
  deleteComment,
} from '../redux/actions/post.action';
import {launchImageLibrary} from 'react-native-image-picker';
import {createFormData} from './createPostScreen.screen';

function CommentScreen(props) {
  const {auth, commentList} = props;
  const [photo, setPhoto] = useState(null);
  const [described, setDescribed] = useState('');
  let update = useRef(null).current;
  useEffect(() => {
    updateCommentList();
    return () => {
      clearInterval(update);
    };
  }, []);
  const gotoUserProfile = userId => {
    props.navigation.navigate('UserProfile', {_id: userId});
  };
  const getListComment = async () => {
    await props.getListComment(auth.token, post._id);
  };
  const updateCommentList = () => {
    update = setInterval(getListComment, 3000);
  };
  const jumToProfile = () => {
    const jumpToAction = TabActions.jumpTo('ProfileTab');
    props.navigation.dispatch(jumpToAction);
    props.navigation.goBack();
  };
  const cmtOnPress = userId => {
    if (auth._id == userId) {
      jumToProfile();
    } else gotoUserProfile(userId);
  };
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
      setDescribed('');
    }
  };
  const checkContent = () => {
    const boo = described.replace(/\s/g, '').length;
    return !!boo;
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {commentList.map((value, index) => (
          <Comment key={index} comment={value} cmtOnPress={cmtOnPress} />
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
            value={described}
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
  );
}
const mapStateToProp = state => ({
  auth: {
    _id: state.auth._id,
    username: state.auth.username,
    avatar: state.auth.avatar,
    token: state.auth.token,
  },
  commentList: state.posts.post.commentList,
});
const mapDispatchToProp = {
  getListComment,
  getPost,
  commentPost,
  deleteComment,
};
export default connect(mapStateToProp, mapDispatchToProp)(CommentScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f2f2f2',
  },
  scrollView: {
    // backgroundColor: '#fff',
    marginBottom: 2,
    marginTop: 2,
  },
  inputComment: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});
