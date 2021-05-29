import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import ImageView from 'react-native-image-viewing';

const ImageDetail = ({images}) => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    let tempImages = props.images.map(element => {
      return {
        source: {uri: element.url},
      };
    });
    setImages(tempImages);
  }, []);

  return <SafeAreaView>
    <ImageView/>
  </SafeAreaView>;
};

export default ImageDetail;
