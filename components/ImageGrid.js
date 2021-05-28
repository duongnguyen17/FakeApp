import React, {useState, useEffect} from 'react';
import {View, Image, Dimensions} from 'react-native';
import {OneImage, TwoImages, ThreeImages, MoreImages} from './ViewImage';

const ImageGrid = ({images, maxWidth, maxHeight}) => {
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
          if (width / height < maxWidth / maxHeight) {
            setImgWidth(maxWidth);
            setImgHeight(maxHeight);
          } else {
            setImgHeight(Math.floor(maxWidth * (height / width)));
            setImgWidth(maxWidth);
          }
        });
        break;
      case 2:
        setImgWidth(Math.floor(maxWidth / 2 - 1));
        Image.getSize(images[0].url, (width1, height1) => {
          Image.getSize(images[1].url, (width2, height2) => {
            if (height1 < height2) {
              // console.log(`height2`, height2);
              if (height2 > maxHeight) setImgHeight(maxHeight);
              else {
                setImgHeight(height2);
              }
            } else {
              // console.log(`height1`, height1);
              if (height1 > maxHeight) setImgHeight(maxHeight);
              else {
                setImgHeight(height1);
              }
            }
          });
        });
        break;
      case 3:
        setImgWidth(Math.floor(maxWidth / 2 - 1));
        setImgHeight(maxWidth);
        break;
      default:
        setImgWidth(Math.floor(maxWidth / 2 - 1));
        setImgHeight(maxWidth);
        break;
    }
  };

  return (
    <View>
      {images.length === 0 ? null : images.length === 1 ? (
        <OneImage
          images={images}
          imgWidth={imgWidth}
          imgHeight={imgHeight}
          maxWidth={maxWidth}
        />
      ) : images.length === 2 ? (
        <TwoImages
          images={images}
          imgWidth={imgWidth}
          imgHeight={imgHeight}
          maxWidth={maxWidth}
        />
      ) : images.length === 3 ? (
        <ThreeImages
          images={images}
          imgWidth={imgWidth}
          imgHeight={imgHeight}
          maxWidth={maxWidth}
        />
      ) : (
        <MoreImages
          images={images}
          imgWidth={imgWidth}
          imgHeight={imgHeight}
          maxWidth={maxWidth}
        />
      )}
    </View>
  );
};

export default ImageGrid;
