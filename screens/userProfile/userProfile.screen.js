import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Text, Button, Animated, View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ActionSheet from "react-native-actions-sheet";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { logout } from '../../redux/actions/auth.action';
import { screenHeight, screenWidth } from '../../constants'

import AnimatedHeader from '../../components/animatedHeader.component'
import Post from '../../components/post.component'

function UserProfileScreen(props) {
  const actionSheetRef = useRef()
  const offset = useRef(new Animated.Value(0)).current
  return (
    <SafeAreaView>
      {/* <AnimatedHeader animatedValue={offset} name={'Profile'} size={23} /> */}
      <ScrollView style={{ marginHorizontal: 5, marginVertical: 10 }}>
        {/* profile card */}
        <View style={styles.profileCard}>
          <View style={{ flexDirection: 'row' }}>
            <Image style={styles.avatar} source={require('../../assets/avatar.jpg')} />
            <View style={{ height: 120, flex: 1, marginHorizontal: 10, marginTop: 20 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold' }}>Born:  </Text>
                <Text>18/3/1999</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold' }}>Home town:  </Text>
                <Text>Thái Bình</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold' }}>Address:  </Text>
                <Text style={{ flex: 1 }}>số nhà 45, nghách 55, ngõ Chùa Liên Phái</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={{ position: 'absolute', right: 20, top: 10 }}
            onPress={() => {
              actionSheetRef.current.show()
            }}
          >
            <MaterialCommunityIcons name='account-settings' size={20} />
          </TouchableOpacity>
          <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
            <Text>Sinh Viên năm 4, HUST
              {'\n'}
              Chuyên giới thiệu phòng trọ tốt cho các bạn sinh viên
              </Text>
          </View>
        </View>
        <Post />
        <Post />
        <Post />
        <Post />
      </ScrollView>
      <ActionSheet ref={actionSheetRef} >
        <TouchableOpacity style={styles.option} onPress={() => {
          actionSheetRef.current.hide()
          props.navigation.navigate('ChangeProfile')
        }}>
          <Text style={styles.textOption}>Change profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}
          onPress={() => {
            actionSheetRef.current.hide()
            props.logout(props.token)
          }}>
          <Text style={{ ...styles.textOption, color: 'red' }}>Logout</Text>
        </TouchableOpacity>
      </ActionSheet>
    </SafeAreaView>
  );
}

const mapStateToProp = state => {
  return {
    token: state.user.token,
  };
};

const mapDispatchToProp = {
  logout,
};

export default connect(mapStateToProp, mapDispatchToProp)(UserProfileScreen);

const styles = StyleSheet.create({
  constainer: {

  },
  profileCard: {
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 10
  },
  avatar: {
    borderRadius: 70,
    width: 120,
    height: 120,
    marginLeft: 10,
    marginTop: 20
  },
  option: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginBottom: 2
  },
  textOption: {
    fontSize: 20,
    fontWeight: '600'
  }
})