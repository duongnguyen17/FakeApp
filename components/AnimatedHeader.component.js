import React from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function AnimatedHeader(props) {
  // const headerHeight = props.headerHeight.interpolate({
  //   inputRange: [0, 50],
  //   outputRange: [0, 50],
  //   extrapolate: 'clamp',
  // });
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
      <TouchableOpacity style={{marginRight: 18}}>
        <MaterialIcons name="search" size={props.size} />
      </TouchableOpacity>
    </View>
  );
}

export default AnimatedHeader;

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // overflow: 'hidden',
    height: 65,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});
