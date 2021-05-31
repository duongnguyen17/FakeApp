import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Text,
  TextInput,
  ToastAndroid,
  Keyboard,
  Switch,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {connect} from 'react-redux';
import Comment from '../components/commentTag.component';
import SwipeImage from '../components/SwipeImage';
import {
  getPost,
  getListComment,
  commentPost,
  deleteComment,
  closePost,
  interestedPost,
} from '../redux/actions/post.action';
import {launchImageLibrary} from 'react-native-image-picker';
import {createFormData} from './createPostScreen.screen';
import {screenWidth} from '../constants';
import {TabActions} from '@react-navigation/native';
const PostDetail = props => {
  const {auth, post, commentList} = props;
  const [photo, setPhoto] = useState(null);
  const [described, setDescribed] = useState('');
  const [isInterested, setIsInterested] = useState(null);
  let update = useRef(null).current;
  const input = useRef(null);

  useEffect(() => {
    props.getPost(auth.token, props.route.params._id);
    updateCommentList();
    return () => {
      clearInterval(update);
    };
  }, []);
  useEffect(() => {
    setIsInterested(() => {
      let is = post.interestedList.includes(auth._id);
      return !!is;
    });
  }, [post.interestedList]);
  const getListComment = async () => {
    //console.log('object');
    await props.getListComment(auth.token, post._id);
  };
  const updateCommentList = () => {
    update = setInterval(getListComment, 3000);
  };
  const gotoUserProfile = userId => {
    props.navigation.navigate('UserProfile', {_id: userId});
  };
  const jumToProfile = () => {
    console.log('object');
    const jumpToAction = TabActions.jumpTo('ProfileTab');
    props.navigation.dispatch(jumpToAction);
    props.navigation.goBack();
  };
  const cmtOnPress = userId => {
    // if (auth._id == userId) {
    //   jumToProfile();
    // } else
    gotoUserProfile(userId);
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
      console.log(`data`, data);
      // gọi đến dispatch
      props.commentPost(auth.token, post._id, data);
      setDescribed('');
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

  const closePost = () => {
    props.closePost(auth.token, post._id);
  };
  const interestedPost = postId => {
    props.interestedPost(auth.token, postId);
  };
  return (
    <GestureRecognizer
      onSwipeLeft={state => {
        //console.log('onSwipeLeft');
        props.navigation.goBack();
      }}
      onSwipeRight={state => {
        //console.log('onSwipeRight');
        props.navigation.goBack();
      }}
      style={{flex: 1}}
      config={config}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {post.image.length === 0 ? null : <SwipeImage images={post.image} />}

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.customListView}>
              <TouchableOpacity
                onPress={() => {
                  gotoUserProfile(post.authorId);
                }}>
                <Image
                  style={styles.avatar}
                  source={
                    post.authorAvatar == null ||
                    post.authorAvatar == undefined ||
                    post.authorAvatar == ''
                      ? require('../assets/avatar_null.jpg')
                      : {uri: post.authorAvatar}
                  }
                />
              </TouchableOpacity>
              <View style={styles.infoWrapper}>
                <View style={styles.namesWrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      gotoUserProfile(post.authorId);
                    }}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                      {post.authorName}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={{color: 'gray', fontSize: 14}}>
                    {post.created.slice(0, 10)}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                right: 20,
                opacity: auth._id != post.authorId ? 0.25 : 1,
              }}>
              <Switch
                disabled={auth._id != post.authorId}
                trackColor={{false: '#767577', true: '#cceeff'}}
                thumbColor={!post.isClosed ? '#66ccff' : '#f4f3f4'}
                onValueChange={() => {
                  closePost(post._id);
                }}
                value={!post.isClosed}
                style={{marginVertical: 4, marginHorizontal: 4}}
              />
            </View>
          </View>
          {post.described != '' ? (
            <View style={styles.contentContainer}>
              <Text style={styles.paragraph}>{post.described}</Text>
            </View>
          ) : null}
          <View horizontal={true} style={styles.reactionContainer}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="bookmark"
                color="#66ccff"
                backgroundColor="#fff"
                size={18}
                style={{marginLeft: 10}}
              />
              <Text style={{fontSize: 12, color: 'gray'}}>
                {post.interestedNum}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 20,
              }}>
              <Text style={{fontSize: 12, color: 'gray'}}>
                {post.commentNum} comments
              </Text>
            </View>
          </View>
          <View style={styles.commentContainer}>
            <TouchableOpacity
              style={styles.likeIcon}
              onPress={() => {
                setIsInterested(!isInterested);
                interestedPost(post._id);
              }}>
              <MaterialCommunityIcons
                size={26}
                name={isInterested ? 'bookmark' : 'bookmark-outline'}
                color="#66ccff"
                style={{marginHorizontal: 6, marginVertical: 6}}
              />
            </TouchableOpacity>
            <View style={styles.commentInput}>
              <TouchableOpacity
                style={styles.commentInputWrapper}
                onPress={() => {
                  input.current.focus();
                }}>
                <Text>Comment...</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.shareIcon}>
              <MaterialCommunityIcons name="share" color="gray" size={26} />
            </TouchableOpacity>
          </View>
          <View style={{borderColor: 'gray', borderTopWidth: 1}}>
            <View style={{marginTop: 10}}>
              {commentList.map((value, index) => (
                <Comment key={index} comment={value} cmtOnPress={cmtOnPress} />
              ))}
            </View>
          </View>
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
                ref={input}
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
        </ScrollView>
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
  commentList: state.posts.post.commentList,
});
const mapDispatchToProp = {
  getListComment,
  getPost,
  commentPost,
  deleteComment,
  closePost,
  interestedPost,
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
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 45,
  },
  infoWrapper: {
    marginLeft: 8,
  },
  namesWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    marginHorizontal: 15,
    marginVertical: 15,
  },
  paragraph: {
    fontSize: 16,
    flexShrink: 1,
  },
  customListView: {
    padding: 15,
    width: screenWidth - 40,
    flexDirection: 'row',
  },
  reactionContainer: {
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    marginTop: 20,
  },
  commentContainer: {
    flexDirection: 'row',
    padding: 10,
    borderColor: 'red',
    borderStyle: 'dashed',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  likeIcon: {},
  commentInput: {
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 10,
    height: 38,
    width: screenWidth - 100,
  },
  commentInputWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  shareIcon: {},
});
