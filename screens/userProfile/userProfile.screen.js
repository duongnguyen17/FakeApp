import React from 'react';
import {connect} from 'react-redux';
import {View, Text, Button} from 'react-native';
import {logout} from '../../redux/actions/auth.action';

function UserProfileScreen(props) {
  return (
    <View>
      <Text>User Profile</Text>
      <Button
        title="Logout"
        onPress={() => {
          props.logout(props.token);
        }}
      />
    </View>
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
