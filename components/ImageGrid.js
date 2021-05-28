import React, {useState, useEffect} from 'react';
import {View, Image, Dimensions} from 'react-native';
import {OneImage, TwoImages, ThreeImages, MoreImages} from './ViewImage';
const MAX_HEIGHT = 450;
const SCREEN_WIDTH = Dimensions.get('screen').width;

const ImageGrid = ({images}) => {
  const [imgWidth, setImgWidth] = useState(null);
  const [imgHeight, setImgHeight] = useState(null);

  useEffect(() => {
    calView();
  }, []);

  const calView = () => {
    switch (images.length) {
      case 0:
        break;
      case 1:
        Image.getSize(images[0].url, (width, height) => {
          if (width / height < SCREEN_WIDTH / MAX_HEIGHT) {
            setImgWidth(SCREEN_WIDTH);
            setImgHeight(MAX_HEIGHT);
          } else {
            setImgHeight(Math.floor(SCREEN_WIDTH * (height / width)));
            setImgWidth(SCREEN_WIDTH);
          }
        });
        break;
      case 2:
        setImgWidth(Math.floor(SCREEN_WIDTH / 2 - 1));
        Image.getSize(images[0].url, (width, height) => {
          setImgHeight(height);
        });
        Image.getSize(images[1].url, (width, height) => {
          if (imgHeight > height) setImgHeight(height);
        });
        break;
      case 3:
        setImgWidth(Math.floor(SCREEN_WIDTH / 2 - 1));
        setImgHeight(SCREEN_WIDTH);

        break;
      default:
        setImgWidth(Math.floor(SCREEN_WIDTH / 2 - 1));
        setImgHeight(SCREEN_WIDTH);
        break;
    }
  };

  return (
    <View>
      {images.length === 0 ? null : images.length === 1 ? (
        <OneImage images={images} imgWidth={imgWidth} imgHeight={imgHeight} />
      ) : images.length === 2 ? (
        <TwoImages images={images} imgWidth={imgWidth} imgHeight={imgHeight} />
      ) : images.length === 3 ? (
        <ThreeImages
          images={images}
          imgWidth={imgWidth}
          imgHeight={imgHeight}
        />
      ) : (
        <MoreImages images={images} imgWidth={imgWidth} imgHeight={imgHeight} />
      )}
    </View>
  );
};

export default ImageGrid;
