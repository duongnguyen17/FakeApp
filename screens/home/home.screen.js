import React from 'react';
import {View, StyleSheet, ScrollView, SafeAreaView, Platform, StatusBar} from 'react-native';

import PostBar from '../../components/PostBar.components';
import Post from '../../components/Post.component';

function HomeScreen(props) {

  // const gotoUserProfile=() => {
  //   // props.navigation.navigate('UserProfile', {_id: userId})
  // }
  // const onFullPostToolPressHandler = () => {
    
  // };
  // const onPhotoUploaderPressHandler = () => {
    
  // }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView bounces={false} style={styles.listContainter}>
        <PostBar/>
          {/* // gotoUserProfile={()=>{gotoUserProfile()}}
          // onFullPostToolPressHandler={onFullPostToolPressHandler}
          // onPhotoUploaderPressHandler={onPhotoUploaderPressHandler} */}

        {/* {props.posts.map((post, index) => ( */}
          {/* <Post /> */}
          {/* post={post} key={index}  */}
        {/* ))} */}
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  }
});
