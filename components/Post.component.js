import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import FbGrid from 'react-native-fb-image-grid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {screenHeight, screenWidth} from '../constants';
function Post(props) {
  const {
    post,
    user,
    gotoUserProfile,
    gotoComment,
    closePost,
    getPost,
    interestedPost,
    gotoPostDetail,
  } = props;
  const [isClosed, setIsClosed] = useState(props.post.isClosed);
  const [isInterested, setIsInterested] = useState(() => {
    let is = props.post.interestedList.includes(user._id);
    return !!is;
  });
  // useEffect(() => {
  //   console.log(`post.image`, post.image);
  // }, []);
  return (
    <TouchableOpacity
      style={styles.post}
      onPress={() => {
        getPost(post._id);
        gotoPostDetail(post._id);
      }}>
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
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
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
          style={{right: 20, opacity: user._id != post.authorId ? 0.25 : 1}}>
          <Switch
            disabled={user._id != post.authorId}
            trackColor={{false: '#767577', true: '#cceeff'}}
            thumbColor={!isClosed ? '#66ccff' : '#f4f3f4'}
            onValueChange={() => {
              setIsClosed(!isClosed);
              closePost(post._id);
            }}
            value={!isClosed}
            style={{marginVertical: 4, marginHorizontal: 4}}
          />
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.paragraph}>{post.described}</Text>
      </View>
      {/* {post.image.length == 0 ? null : (
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.imageContainer}>
            <FbGrid images={post.image} />
          </View>
        </TouchableOpacity>
      )} */}
      {post.image.map((value, index) => (
        <TouchableOpacity onPress={() => {}} key={index}>
          <View style={styles.imageContainer}>
            <Image source={{uri: value.url}} style={styles.imageContainer} />
          </View>
        </TouchableOpacity>
      ))}

      <View horizontal={true} style={styles.reactionContainer}>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
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
        {/* <TouchableOpacity
          style={{
            position: 'absolute',
            fontSize: 14,
            padding: 10,
            right: 10,
          }}>
          <Text
            style={{fontSize: 12, textAlignVertical: 'center', color: 'gray'}}>
            18 Share
          </Text>
        </TouchableOpacity> */}
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
            style={{marginHorizontal: 4, marginVertical: 4}}
          />
        </TouchableOpacity>
        <View style={styles.commentInput}>
          <TouchableOpacity
            style={styles.commentInputWrapper}
            onPress={() => {
              //console.log(`object`);
              getPost(post._id);
              gotoComment(post._id);
            }}>
            <Text>Comment...</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.shareIcon}>
          <MaterialCommunityIcons name="share" color="gray" size={26} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default Post;

const styles = StyleSheet.create({
  customListView: {
    padding: 15,
    width: screenWidth - 40,
    flexDirection: 'row',
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
  extraInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  post: {
    marginTop: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {height: 0, width: 0},
    borderRadius: 10,
  },
  commentInputWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  paragraph: {},
  contentContainer: {
    paddingHorizontal: 15,
  },
  imageContainer: {
    marginTop: 5,
    width: 100,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reactionContainer: {
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    marginTop: 20,
  },
  shareIcon: {},
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
    height: 30,
    width: screenWidth - 100,
  },
  btnSendComment: {
    width: 30,
    height: 30,
    textAlign: 'center',
    lineHeight: 30,
  },
});
