import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, TouchableOpacity, Text} from 'react-native';
import {connect} from 'react-redux';
import FollowTag from '../components/FollowTag';
import {getUserInfor, followOther} from '../redux/actions/user.action';
const FollowList = props => {
  const {auth, follows} = props;
  const [followList, setFollowList] = useState([]);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    fetchData(index);
  }, [index]);
  const fetchData = async index => {
    let arrIdTemp = follows.slice(index, index + 15);
    let arrUserTemp = await Promise.all(
      arrIdTemp.map(async value => {
        let userData = await props.getUserInfor(auth.token, value);
        return userData;
      }),
    );
    let result = followList.concat(arrUserTemp);
    setFollowList(result);
  };

  const followOther = async userId => {
    await props.followOther(auth.token, userId);
  };
  return (
    <SafeAreaView>
      <ScrollView>
        {followList.map((value, index) => (
          <FollowTag key={index} userData={value} followOther={followOther} />
        ))}
        {followList.length === 0 ? (
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 20,
              marginTop: 20,
              fontWeight: 'bold',
            }}>
            Bạn chưa follow ai
          </Text>
        ) : (
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
              flex: 1,
              backgroundColor: '#fff',
              borderRadius: 10,
            }}
            onPress={() => {
              setIndex(index + 15);
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 24,
                color: '#3399ff',
                marginVertical: 10,
              }}>
              More
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
const mapStateToProp = state => ({
  auth: {
    token: state.auth.token,
    _id: state.auth._id,
    avatar: state.auth.avatar,
  },
  follows: state.user.userData.followList,
});

const mapDispatchToProp = {
  getUserInfor,
  followOther,
};

export default connect(mapStateToProp, mapDispatchToProp)(FollowList);
