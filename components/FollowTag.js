import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
const FollowTag = props => {
  const {userData} = props;

  return (
    <TouchableOpacity style={styles.tag}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{uri: userData.avatar}}
          style={{width: 50, height: 50, borderRadius: 50}}
        />
        <Text style={{fontWeight: 'bold', marginLeft: 10}}>
          {userData.username}
        </Text>
      </View>
      <TouchableOpacity
        style={{justifyContent: 'center', alignItems: 'center', width: 100}}
        onPress={() => {
          props.followOther(userData._id);
        }}>
        <SimpleLineIcons name={'user-unfollow'} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default FollowTag;

const styles = StyleSheet.create({
  tag: {flexDirection: 'row'},
});
