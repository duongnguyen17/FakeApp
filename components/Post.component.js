import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {screenHeight, screenWidth} from '../constants';
function Post(props) {
  const [isEnabled, setIsEnabled] = useState(props.post.isClosed);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <TouchableOpacity style={styles.post}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.customListView}>
          <TouchableOpacity onPress={props.gotoUserProfile}>
            <Image
              style={styles.avatar}
              source={{uri: props.post.autorAvatar}}
            />
          </TouchableOpacity>
          <View style={styles.infoWrapper}>
            <View style={styles.namesWrapper}>
              <TouchableOpacity onPress={props.gotoUserProfile}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  {props.post.authorName}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{color: 'gray', fontSize: 14}}>
                {props.post.created}
              </Text>
            </View>
          </View>
        </View>
        <Switch
          //disabled={true}
          trackColor={{false: '#767577', true: '#cceeff'}}
          thumbColor={isEnabled ? '#66ccff' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{right: 20}}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.paragraph}>{props.post.described}</Text>
      </View>
      <TouchableOpacity onPress={props.gotoUserProfile}>
        <View style={styles.imageContainer}>
          {/* <Image style={{height:300}} source={{uri: 'https://ctt-sis.hust.edu.vn/Content/Anh/avatar.JPG'}}/> */}
        </View>
      </TouchableOpacity>
      <View horizontal={true} style={styles.reactionContainer}>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons
            name="bookmark-outline"
            color="#66ccff"
            backgroundColor="#fff"
            size={18}
            style={{marginLeft: 10}}
          />
          <Text style={{fontSize: 12, color: 'gray'}}>
            {props.post.interestedNum}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 20,
          }}>
          <Text style={{fontSize: 12, color: 'gray'}}>
            {props.post.commentNum} comments
          </Text>
        </View>
        <TouchableOpacity
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
        </TouchableOpacity>
      </View>
      <View style={styles.commentContainer}>
        <TouchableOpacity style={styles.likeIcon}>
          <MaterialCommunityIcons
            size={26}
            name="bookmark-outline"
            color="#66ccff"
          />
        </TouchableOpacity>
        <View style={styles.commentInput}>
          <TouchableOpacity
            style={styles.commentInputWrapper}
            onPress={props.gotoComment}>
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
    flex: 1,
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
