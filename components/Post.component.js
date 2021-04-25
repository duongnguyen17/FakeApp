import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Switch } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
function Post() {
  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => setIsEnabled(previousState => !previousState)
  return (
    <View style={styles.post}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={styles.customListView}>
          <Image style={styles.avatar} source={require('../assets/anh_20173069.jpg')} />
          <View style={styles.infoWrapper}>
            <View style={styles.namesWrapper}>
              <TouchableOpacity >
                <Text style={{ fontSize: 16, fontWeight: '500' }}>Duong Nguyen</Text>
              </TouchableOpacity>
            </View>
            <View >
              <Text style={{ color: '#333', fontSize: 14 }}>time</Text>
            </View>
          </View>
        </View>
        <Switch
          //disabled={true}
          trackColor={{ false: "#767577", true: "#cceeff" }}
          thumbColor={isEnabled ? "#66ccff" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{ right: 20 }}

        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.paragraph}>content</Text>
      </View>
      <TouchableOpacity >
        <View style={styles.imageContainer}>
          {/* <Image style={{height:300}} source={{uri: 'https://ctt-sis.hust.edu.vn/Content/Anh/anh_20173069.JPG'}}/> */}
        </View>
      </TouchableOpacity>
      <View horizontal={true} style={styles.reactionContainer}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}><MaterialCommunityIcons
          name="thumbs-up"
          color="#66ccff"
          backgroundColor="#fff"
          size={20}
          style={{ marginLeft: 10 }}
        /><Text style={{ fontSize: 12, color: 'gray' }}>147</Text></TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}><MaterialCommunityIcons
          lineBreakMode={false}
          name="comment-alt"
          color="gray"
          backgroundColor="white"
        /><Text style={{ fontSize: 12, color: 'gray' }}>12 comments</Text></TouchableOpacity>
        <TouchableOpacity style={{
          position: 'absolute',
          fontSize: 14,
          padding: 10,
          right: 10
        }}>
          <Text style={{ fontSize: 12, textAlignVertical: 'center', color: 'gray' }}>18 Share</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.commentContainer}>
        <TouchableOpacity style={styles.likeIcon}>
          <MaterialCommunityIcons size={23} name="thumbs-up" color="#66ccff" />
        </TouchableOpacity>
        <View style={styles.commentInput}>
          <TouchableOpacity style={styles.commentInputWrapper}>
            <Text>Comment...</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.shareIcon}>
          <MaterialCommunityIcons name="share-alt" color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Post
const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  customListView: {
    padding: 15,
    width: screenWidth - 40,
    flexDirection: 'row'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50
  },
  infoWrapper: {
    marginLeft: 8
  },
  namesWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  extraInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  post: {
    marginTop: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { height: 0, width: 0 },
  },
  commentInputWrapper: {
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    borderRadius: 20,
    paddingHorizontal: 15
  },
  paragraph: {

  },
  contentContainer: {
    paddingHorizontal: 15
  },
  imageContainer: {
    marginTop: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  reactionContainer: {
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center'
  },
  shareIcon: {
  },
  commentContainer: {
    flexDirection: 'row',
    padding: 10,
    borderColor: "red",
    borderStyle: 'dashed',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  likeIcon: {
  },
  commentInput: {
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 20,
    marginLeft: 10,
    height: 30,
    width: screenWidth - 15 * 2 - 60,
  },
  btnSendComment: {
    width: 30,
    height: 30,
    textAlign: 'center',
    lineHeight: 30
  }
})