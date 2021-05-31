import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import ImageGrid from './ImageGrid';
import {screenHeight, screenWidth} from '../constants';
import ImageView from 'react-native-image-viewing';
const maxHeight = 350;
const maxWidth = Math.floor(screenWidth / 2);
function Comment(props) {
  const {comment} = props;
  const [images, setImages] = useState([]);
  const [visible, setIsVisible] = useState(false);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    let tempImages = comment.image.map(element => {
      return {
        uri: element.url,
      };
    });
    setImages(tempImages);
  }, [comment.image]);
  const choosedPhoto = index => {
    setIndex(index);
    setIsVisible(true);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.avatar}
        onPress={() => {
          props.cmtOnPress(comment.authorId);
        }}>
        <Image
          style={{
            borderRadius: 50,
            borderColor: '#f2f2f2',
            borderWidth: 2,
            width: 50,
            height: 50,
          }}
          source={
            comment.authorAvatar == null ||
            comment.authorAvatar == undefined ||
            comment.authorAvatar == ''
              ? require('../assets/avatar_null.jpg')
              : {uri: comment.authorAvatar}
          }
        />
      </TouchableOpacity>
      <View style={{flexDirection: 'column', flex: 1}}>
        <View style={styles.comment}>
          <View style={{marginHorizontal: 10, marginTop: 5}}>
            <TouchableOpacity
              onPress={() => {
                props.cmtOnPress(comment.authorId);
              }}>
              <Text style={{fontWeight: '700', fontSize: 18}}>
                {comment.authorName}
              </Text>
            </TouchableOpacity>
            {/* {comment.image.map((value, index) => (
          <TouchableOpacity onPress={() => {}} key={index}>
            <View style={styles.imageContainer}>
              <Image source={{uri: value.url}} style={styles.imageContainer} />
            </View>
          </TouchableOpacity>
        ))} */}
            {comment.described != '' ? (
              <Text style={{fontWeight: '500', fontSize: 17, flexShrink: 1}}>
                {comment.described}
              </Text>
            ) : null}
            <View style={{marginVertical: 10}}>
              <ImageGrid
                images={comment.image}
                maxWidth={maxWidth}
                maxHeight={maxHeight}
                choosedPhoto={choosedPhoto}
              />
            </View>
          </View>
        </View>
        <Text
          style={{
            fontWeight: '200',
            fontSize: 13,
            color: 'gray',
            marginLeft: 10,
            marginTop: 5,
          }}>
          {comment.created.slice(0, 10)}
        </Text>
      </View>
      <ImageView
        images={images}
        imageIndex={index}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </View>
  );
}

export default Comment;
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    flexDirection: 'row',
    marginVertical: 10,
  },
  avatar: {
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  comment: {
    flex: 1,
    marginLeft: 5,
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
  },
  imageContainer: {
    marginTop: 5,
    width: 100,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
