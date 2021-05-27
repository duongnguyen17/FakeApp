import React, {useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
function Comment(props) {
  const {comment} = props;
  // useEffect(() => {
  //   console.log(`comment`, comment);
  // }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.avatar}>
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
      <View style={styles.comment}>
        <TouchableOpacity>
          <Text style={{fontWeight: '700', fontSize: 18}}>
            {comment.authorName}
          </Text>
        </TouchableOpacity>
        {comment.image.map((value, index) => (
          <TouchableOpacity onPress={() => {}} key={index}>
            <View style={styles.imageContainer}>
              <Image source={{uri: value.url}} style={styles.imageContainer} />
            </View>
          </TouchableOpacity>
        ))}
        <Text style={{fontWeight: '500', fontSize: 17}}>
          {comment.described.slice(0, 10)}
        </Text>
        <Text style={{fontWeight: '200', fontSize: 13, color: 'gray'}}>
          {comment.created}
        </Text>
      </View>
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
    marginHorizontal: 5,
  },
  imageContainer: {
    marginTop: 5,
    width: 100,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
