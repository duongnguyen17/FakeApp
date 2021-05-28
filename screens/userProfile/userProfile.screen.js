import React, {useRef, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  Text,
  Button,
  Animated,
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {StackActions, useIsFocused} from '@react-navigation/native';
import ActionSheet from 'react-native-actions-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {logout} from '../../redux/actions/auth.action';
import {getUserInfor} from '../../redux/actions/user.action';
import {
  getListPost,
  getPost,
  interestedPost,
  closePost,
} from '../../redux/actions/post.action';
import {screenHeight, screenWidth} from '../../constants';

import AnimatedHeader from '../../components/animatedHeader.component';
import Post from '../../components/post.component';

function UserProfileScreen(props) {
  const {auth, user, isOwner, posts, post, index, route} = props;
  const actionSheetRef = useRef();
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      if (route.params == undefined) {
        props.getUserInfor(auth.token, auth._id);
        props.getListPost(auth.token, index, auth._id);
      } else {
        props.getUserInfor(auth.token, route.params._id);
        props.getListPost(auth.token, index, route.params._id);
      }
    }
  }, [isFocused]);
  const getPosts = async index => {
    await props.getListPost(auth.token, index, user._id);
  };
  const gotoUserProfile = userId => {
    props.navigation.navigate('UserProfile', {_id: userId});
  };
  const gotoComment = postId => {
    props.navigation.navigate('Comment', {_id: postId});
  };
  const gotoPostDetail = postId => {
    props.navigation.navigate('PostDetail', {_id: postId});
  };
  const closePost = postId => {
    props.closePost(auth.token, postId);
  };
  const getPost = async postId => {
    await props.getPost(auth.token, postId);
  };
  const interestedPost = postId => {
    props.interestedPost(auth.token, postId);
  };
  const onRefresh = () => {
    setLoading(true);
    props.getUserInfor(auth.token, user._id);
    getPosts(0);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const morePost = () => {
    getPosts(props.index + 20);
  };
  return (
    <SafeAreaView>
      {/* <AnimatedHeader animatedValue={offset} name={'Profile'} size={23} /> */}
      <ScrollView
        style={{marginVertical: 10}}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }>
        {/* profile card */}
        <View style={styles.profileCard}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.avatar}
              source={
                user.avatar == null ||
                user.avatar == undefined ||
                user.avatar == ''
                  ? require('../../assets/avatar_null.jpg')
                  : {uri: user.avatar}
              }
            />
            <View
              style={{
                height: 120,
                flex: 1,
                marginHorizontal: 10,
                marginTop: 20,
                justifyContent: 'center',
              }}>
              <View style={{}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  {user.username}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontWeight: 'bold'}}>Born: </Text>
                <Text>{user.born}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontWeight: 'bold'}}>Home town: </Text>
                <Text>{user.homeTown}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontWeight: 'bold'}}>Address: </Text>
                <Text style={{flex: 1}}>{user.address}</Text>
              </View>
            </View>
          </View>

          {isOwner ? (
            <TouchableOpacity
              style={{position: 'absolute', right: 0, top: 0}}
              onPress={() => {
                actionSheetRef.current.show();
              }}>
              <MaterialCommunityIcons
                name="account-settings"
                size={20}
                style={{marginVertical: 10, marginHorizontal: 10}}
              />
            </TouchableOpacity>
          ) : null}

          <View
            style={{
              marginHorizontal: 5,
              marginVertical: 20,
              borderTopWidth: 0.5,
              borderColor: '#b3b3b3',
            }}>
            <Text style={{marginTop: 10, marginHorizontal: 10}}>
              {user.intro}
            </Text>
          </View>
        </View>
        {posts.map((value, index) => (
          <Post
            key={index}
            user={auth}
            post={value}
            gotoUserProfile={gotoUserProfile}
            gotoComment={gotoComment}
            closePost={closePost}
            interestedPost={interestedPost}
            gotoPostDetail={gotoPostDetail}
            getPost={getPost}
          />
        ))}
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
            flex: 1,
            backgroundColor: '#fff',
            borderRadius: 10,
          }}
          onPress={() => {
            morePost();
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 24,
              color: '#3399ff',
              marginVertical: 10,
            }}>
            More Posts
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <ActionSheet ref={actionSheetRef}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => {
            actionSheetRef.current.hide();
            props.navigation.navigate('ChangeProfile');
          }}>
          <Text style={styles.textOption}>Change profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => {
            actionSheetRef.current.hide();
            props.navigation.dispatch(StackActions.popToTop());
            props.logout(auth.token);
          }}>
          <Text style={{...styles.textOption, color: 'red'}}>Logout</Text>
        </TouchableOpacity>
      </ActionSheet>
    </SafeAreaView>
  );
}

const mapStateToProp = state => ({
  auth: {
    _id: state.auth._id,
    token: state.auth.token,
    username: state.auth.username,
    avatar: state.auth.avatar,
  },
  user: state.user.userData,
  isOwner: state.user.isOwner,
  posts: state.posts.posts,
  post: state.posts.post,
  index: state.posts.index,
});

const mapDispatchToProp = {
  getUserInfor,
  getListPost,
  logout,
  getPost,
  interestedPost,
  closePost,
};

export default connect(mapStateToProp, mapDispatchToProp)(UserProfileScreen);

const styles = StyleSheet.create({
  constainer: {},
  profileCard: {
    borderRadius: 10,
    backgroundColor: '#b3d9ff',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    borderRadius: 70,
    width: 120,
    height: 120,
    marginLeft: 10,
    marginTop: 20,
  },
  option: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginBottom: 2,
  },
  textOption: {
    fontSize: 20,
    fontWeight: '600',
  },
});
