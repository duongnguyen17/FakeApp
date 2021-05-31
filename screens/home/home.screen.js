import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
  RefreshControl,
  Text,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/Header';
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

function HomeScreen(props) {
  const {auth, posts, index} = props;
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) getPosts(0);
  }, [isFocused]);

  const getPosts = async index => {
    await props.getListPost(auth.token, index);
  };
  const gotoUserProfile = userId => {
    props.navigation.navigate('UserProfile', {_id: userId});
  };
  const jumToProfile = () => {
    const jumpToAction = TabActions.jumpTo('ProfileTab');
    props.navigation.dispatch(jumpToAction);
  };
  const gotoProfile = userId => {
    if (auth._id == userId) {
      jumToProfile();
    } else gotoUserProfile(userId);
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
    getPosts(0);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const morePost = () => {
    getPosts(index + 20);
  };
  const gotoSearch = () => {
    props.navigation.navigate('Search');
  };
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
        <Header
          name={'HUST Share'}
          size={26}
          color={'#ff0000'}
          onPress={gotoSearch}
        />
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
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }>
        <PostBar
          gotoUserProfile={gotoUserProfile}
          gotoCreatePostScreen={gotoCreatePostScreen}
          avatar={auth.avatar}
          jumToProfile={jumToProfile}
        />

        {posts.map((value, index) => (
          <Post
            key={index}
            user={auth}
            post={value}
            gotoComment={gotoComment}
            closePost={closePost}
            interestedPost={interestedPost}
            gotoPostDetail={gotoPostDetail}
            getPost={getPost}
            gotoProfile={gotoProfile}
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
      </Animated.ScrollView>
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
