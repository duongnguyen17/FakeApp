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
import PostBar from '../../components/postBar.components';
import Post from '../../components/post.component';

function HomeScreen(props) {
  const [posts, setPosts] = useState([
    {
      interestedList: [],
      commentList: [],
      _id: '60a29f1162def138fc24f97d',
      authorId: '608d8b95142eaa0d0060b8f3',
      described: 'test thử23432432',
      image: [],
      created: '2021-05-17T16:51:29.838Z',
      isClosed: false,
      interestedNum: 0,
      commentNum: 0,
      authorName: 'test1',
      authorAvatar:
        'http://res.cloudinary.com/do4l7xob6/image/upload/v1619889815/v3lanly9k1kbkev9mfr3.jpg',
      __v: 0,
    },
    {
      interestedList: [],
      commentList: [],
      _id: '60a29f1262def138fc24f97e',
      authorId: '608d8b95142eaa0d0060b8f3',
      described: 'test thử23432432',
      image: [],
      created: '2021-05-17T16:51:30.920Z',
      isClosed: false,
      interestedNum: 0,
      commentNum: 0,
      authorName: 'test1',
      authorAvatar:
        'http://res.cloudinary.com/do4l7xob6/image/upload/v1619889815/v3lanly9k1kbkev9mfr3.jpg',
      __v: 0,
    },
  ]);
  // let headerHeight = useRef(new Animated.Value(0)).current;

  const gotoUserProfile = id => {
    props.navigation.navigate('UserProfile', {id: id});
  };
  const gotoComment = id => {
    props.navigation.navigate('Comment', {id: id});
  };
  const gotoCreatePostScreen = () => {
    props.navigation.navigate('CreatePostScreen');
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
      >
        <PostBar
          gotoUserProfile={gotoUserProfile}
          gotoCreatePostScreen={gotoCreatePostScreen}
        />

        {posts.map((value, index) => (
          <Post
            key={index}
            post={value}
            gotoUserProfile={gotoUserProfile}
            gotoComment={gotoComment}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  listContainter: {
    marginHorizontal: 5,
  },
});
