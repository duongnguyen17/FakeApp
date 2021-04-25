import React from 'react'
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HEADER_HEIGHT = 60;

function AnimatedHeader(props) {
  const insets = useSafeAreaInsets()
  const headerHeight = props.animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [HEADER_HEIGHT + insets.top, insets.top + 44],
    extrapolate: 'clamp'
  })
  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        height: headerHeight,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <Text style={{ fontSize: 26, fontWeight: 'bold', marginLeft: 18 }}>HUST Community</Text>
      <TouchableOpacity style={{ marginRight: 18 }}>
        <MaterialCommunityIcons name='search' size={26} />
      </TouchableOpacity>
    </Animated.View>
  )
}

export default AnimatedHeader