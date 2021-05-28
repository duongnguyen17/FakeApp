import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';

export const OneImage = ({images, imgWidth, imgHeight, maxWidth}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{uri: images[0].url}}
        style={{width: imgWidth, height: imgHeight}}
      />
    </View>
  );
};
export const TwoImages = ({images, imgWidth, imgHeight, maxWidth}) => {
  return (
    <View
      style={[
        styles.container,
        {flexDirection: 'row', justifyContent: 'space-between'},
      ]}>
      <Image
        source={{uri: images[0].url}}
        style={{width: imgWidth, height: imgHeight}}
      />
      <Image
        source={{uri: images[1].url}}
        style={{width: imgWidth, height: imgHeight}}
      />
    </View>
  );
};
export const ThreeImages = ({images, imgWidth, imgHeight, maxWidth}) => {
  return (
    <View
      style={[
        styles.container,
        {flexDirection: 'row', justifyContent: 'space-between'},
      ]}>
      <Image
        source={{uri: images[0].url}}
        style={{width: imgWidth, height: imgHeight}}
      />
      <View
        style={{
          flexDirection: 'column',
          height: maxWidth,
          justifyContent: 'space-between',
        }}>
        <Image
          source={{uri: images[1].url}}
          style={{width: imgWidth, height: imgWidth}}
        />
        <Image
          source={{uri: images[2].url}}
          style={{width: imgWidth, height: imgWidth}}
        />
      </View>
    </View>
  );
};
export const MoreImages = ({images, imgWidth, imgHeight, maxWidth}) => {
  return (
    <View
      style={[
        styles.container,
        {flexDirection: 'row', justifyContent: 'space-between'},
      ]}>
      <Image
        source={{uri: images[0].url}}
        style={{width: imgWidth, height: imgHeight}}
      />
      <View
        style={{
          flexDirection: 'column',
          height: maxWidth,
          justifyContent: 'space-between',
        }}>
        <Image
          source={{uri: images[1].url}}
          style={{width: imgWidth, height: imgWidth}}
        />
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={{uri: images[2].url}}
            style={{width: imgWidth, height: imgWidth, opacity: 0.8}}
          />
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 20,
              position: 'absolute',
            }}>
            +{images.length - 2}
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
