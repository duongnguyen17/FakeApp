import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function Header(props) {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: props.size,
          fontWeight: 'bold',
          color: props.color,
          marginLeft: 18,
        }}>
        {props.name}
      </Text>
      <TouchableOpacity
        style={{marginRight: 18}}
        onPress={() => {
          props.onPress();
        }}>
        <MaterialIcons name="search" size={props.size} />
      </TouchableOpacity>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
