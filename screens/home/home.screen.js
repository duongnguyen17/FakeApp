import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
  RefreshControl,
  Animated,
  Text,
} from 'react-native';
import AnimatedHeader from '../../components/animatedHeader.component';
import PostBar from '../../components/postBar.components';
import Post from '../../components/post.component';
import {TabActions, useIsFocused} from '@react-navigation/native';
import {
  getListPost,
  closePost,
  getPost,
  interestedPost,
} from '../../redux/actions/post.action';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native';
function HomeScreen(props) {
  const [loading, setLoading] = useState(false);
  // let headerHeight = useRef(new Animated.Value(0)).current;
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) getPosts(0);
  }, [isFocused]);

  const getPosts = async index => {
    await props.getListPost(props.user.token, index);
  };
  const gotoUserProfile = userId => {
    props.navigation.navigate('UserProfile', {_id: userId});
  };
  const jumToProfile = () => {
    const jumpToAction = TabActions.jumpTo('ProfileTab');
    props.navigation.dispatch(jumpToAction);
  };
  const gotoComment = postId => {
    props.navigation.navigate('Comment', {_id: postId});
  };
  const gotoPostDetail = postId => {
    props.navigation.navigate('PostDetail', {_id: postId});
  };
  const gotoCreatePostScreen = () => {
    props.navigation.navigate('CreatePostScreen');
  };
  const closePost = postId => {
    props.closePost(props.user.token, postId);
  };
  const getPost = async postId => {
    await props.getPost(props.user.token, postId);
  };
  const interestedPost = postId => {
    props.interestedPost(props.user.token, postId);
  };
  const onRefresh = () => {
    setLoading(true);
    getPosts(0);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  // const morePosts = () => {
  //   setLoading(true);
  //   getPosts(index);
  //   index += 20;
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  // };
  const morePost = () => {
    getPosts(props.index + 20);
  };
  return (
    <SafeAreaView style={styles.container}>
      <AnimatedHeader
        // headerHeight={headerHeight}
        name={'HUST Share'}
        color={'#ff0000'}
        size={26}
      />
      <ScrollView
        bounces={false}
        style={styles.listContainter}
        // scrollEventThrottle={16}
        // onScroll={Animated.event([
        //   {nativeEvent: {contentOffset: {y: headerHeight}}},
        // ])}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }>
        <PostBar
          gotoUserProfile={gotoUserProfile}
          gotoCreatePostScreen={gotoCreatePostScreen}
          avatar={props.user.avatar}
          jumToProfile={jumToProfile}
        />

        {props.posts.map((value, index) => (
          <Post
            key={index}
            user={props.user}
            post={value}
            gotoUserProfile={gotoUserProfile}
            gotoComment={gotoComment}
            closePost={closePost}
            interestedPost={interestedPost}
            gotoPostDetail={gotoPostDetail}
            getPost={getPost}
            jumToProfile={jumToProfile}
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
    </SafeAreaView>
  );
}
const mapStateToProp = state => ({
  user: {
    _id: state.auth._id,
    username: state.auth.username,
    avatar: state.auth.avatar,
    token: state.auth.token,
  },
  posts: state.posts.posts,
  index: state.posts.index,
});
const mapDispatchToProp = {
  getListPost,
  closePost,
  getPost,
  interestedPost,
};
export default connect(mapStateToProp, mapDispatchToProp)(HomeScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  listContainter: {},
});
