import React, {useState, useEffect, useRef} from 'react';
import {View, Image, Dimensions} from 'react-native';
import {OneImage, TwoImages, ThreeImages, MoreImages} from './ViewImage';

const ImageGrid = props => {
  const {images, maxWidth, maxHeight, choosedPhoto} = props;
  const [imgWidth, setImgWidth] = useState(null);
  const [imgHeight, setImgHeight] = useState(null);
  const update = useRef(null);

  useEffect(() => {
    update.current = true;
    calView();
    return () => {
      update.current = false;
    };
  }, [images]);

  const calView = () => {
    switch (images.length) {
      case 0:
        break;
      case 1:
        Image.getSize(images[0].url, (width, height) => {
          if (width / height < maxWidth / maxHeight) {
            if (update.current) {
              setImgWidth(maxWidth);
              setImgHeight(maxHeight);
            }
          } else {
            if (update.current) {
              setImgHeight(Math.floor(maxWidth * (height / width)));
              setImgWidth(maxWidth);
            }
          }
        });
        break;
      case 2:
        if (update.current) {
          setImgWidth(Math.floor(maxWidth / 2 - 1));
        }

        Image.getSize(images[0].url, (width1, height1) => {
          Image.getSize(images[1].url, (width2, height2) => {
            if (height1 < height2) {
              // console.log(`height2`, height2);
              if (update.current) {
                if (height2 > maxHeight) setImgHeight(maxHeight);
                else {
                  setImgHeight(height2);
                }
              }
            } else {
              // console.log(`height1`, height1);
              if (update.current) {
                if (height1 > maxHeight) setImgHeight(maxHeight);
                else {
                  setImgHeight(height1);
                }
              }
            }
          });
        });
        break;
      case 3:
        if (update.current) {
          setImgWidth(Math.floor(maxWidth / 2 - 1));
          setImgHeight(maxWidth);
        }
        break;
      default:
        if (update.current) {
          setImgWidth(Math.floor(maxWidth / 2 - 1));
          setImgHeight(maxWidth);
        }
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
          choosedPhoto={choosedPhoto}
        />
      ) : images.length === 2 ? (
        <TwoImages
          images={images}
          imgWidth={imgWidth}
          imgHeight={imgHeight}
          maxWidth={maxWidth}
          choosedPhoto={choosedPhoto}
        />
      ) : images.length === 3 ? (
        <ThreeImages
          images={images}
          imgWidth={imgWidth}
          imgHeight={imgHeight}
          maxWidth={maxWidth}
          choosedPhoto={choosedPhoto}
        />
      ) : (
        <MoreImages
          images={images}
          imgWidth={imgWidth}
          imgHeight={imgHeight}
          maxWidth={maxWidth}
          choosedPhoto={choosedPhoto}
        />
      )}
    </View>
  );
};

export default ImageGrid;
