import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import {screenWidth, screenHeight} from '../constants';
import {launchImageLibrary} from 'react-native-image-picker';
import {TouchableWithoutFeedback} from 'react-native';

//hàm tạo form data
const createFormData = (photo, body = {}) => {
  const data = new FormData();
  data.append('photo', {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};

const CreatePostScreen = () => {
  const input = useRef();
  const [photo, setPhoto] = useState(null);
  const [tag, setTag] = useState(null);
  const [content, setContent] = useState('');

  const choosedPhoto = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response) {
        setPhoto(response);
      }
    });
  };

  const submit = () => {
    if (photo == null && checkContent) {
      ToastAndroid.show('bai viet khong co noi dung', ToastAndroid.SHORT);
    } else {
      const data = createFormData(photo, {tag: tag, content: content});
      // gọi đến dispatch
    }
  };

  const checkContent = () => {
    return content.replace(/\s/g, '').length;
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          if (input.current.isFocused()) {
            Keyboard.dismiss();
          } else {
            input.current.focus();
          }
        }}>
        <View
          style={{width: screenWidth - 10, height: (16 * screenHeight) / 20}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                marginLeft: 10,
                marginTop: 10,
              }}
              source={require('../assets/avatar.jpg')}
            />
            <Text style={{marginLeft: 10, fontWeight: 'bold', fontSize: 20}}>
              Duong Nguyen
            </Text>
          </View>
          <View style={{marginTop: 10}}>
            <TouchableOpacity style={styles.button} onPress={choosedPhoto}>
              <Text style={{marginLeft: 5, color: 'gray'}}>Add Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={{marginLeft: 5, color: 'gray'}}>Add Tag</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            ref={input}
            style={{marginTop: 30}}
            placeholder={'Write somthings'}
            multiline={true}
            onEndEditing={() => {
              Keyboard.dismiss();
            }}
          />
        </View>
      </TouchableWithoutFeedback>
      <View style={{marginBottom: 20, width: screenWidth, marginTop: 3}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#66ccff',
            width: 120,
            height: 45,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: screenWidth / 2,
          }}
          onPress={submit}>
          <Text style={{fontSize: 26, color: '#ffffff', fontWeight: '700'}}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreatePostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    marginVertical: 2,
    alignItems: 'center',
  },
  button: {
    borderWidth: 2,
    borderColor: '#f2f2f2',
    marginTop: 5,
    marginLeft: 10,
    borderRadius: 10,
    width: 80,
    height: 30,
  },
});
