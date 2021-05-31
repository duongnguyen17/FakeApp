import React from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SwipeImage = props => {
  const {images} = props;
  //console.log(`images`, images);
  return (
    <View style={styles.container}>
      <Swiper style={styles.swiper} showsButtons={true}>
        {images.map(element => (
          <View style={{flex: 1}}>
            <Image style={styles.image} source={{uri: element.url}} />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export default SwipeImage;
const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT,
    width: '100%',
  },
  swiper: {},
  image: {flex: 1},
});
