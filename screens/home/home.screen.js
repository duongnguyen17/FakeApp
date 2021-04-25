import React, { useRef } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Platform, StatusBar, Animated } from 'react-native';

import AnimatedHeader from '../../components/AnimatedHeader.component'
import PostBar from '../../components/PostBar.components';
import Post from '../../components/Post.component';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function HomeScreen(props) {
  const offset = useRef(new Animated.Value(0)).current

  // const gotoUserProfile=() => {
  //   // props.navigation.navigate('UserProfile', {_id: userId})
  // }
  // const onFullPostToolPressHandler = () => {

  // };
  // const onPhotoUploaderPressHandler = () => {

  // }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <AnimatedHeader animatedValue={offset} />
        <ScrollView bounces={false} style={styles.listContainter}>
          <PostBar />
          {/* // gotoUserProfile={()=>{gotoUserProfile()}}
          // onFullPostToolPressHandler={onFullPostToolPressHandler}
          // onPhotoUploaderPressHandler={onPhotoUploaderPressHandler} */}

          {/* {props.posts.map((post, index) => ( */}
          {/* post={post} key={index}  */}
          {/* ))} */}
          <Post />
          <Post />
          <Post />
          <Post />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  listContainter: {

  }
});
