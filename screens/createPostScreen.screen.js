import React, {useRef, useState, useLayoutEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
  Keyboard,
  Button,
  ToastAndroid,
} from 'react-native';
import {screenWidth, screenHeight} from '../constants';
import {launchImageLibrary} from 'react-native-image-picker';
import {TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import {addPost} from '../redux/actions/post.action';
//hàm tạo form data
export const createFormData = (photo, body = {}) => {
  const data = new FormData();
  if (photo != null) {
    data.append('image', {
      name: photo.fileName,
      type: photo.type,
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });
  }
  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });
  // const data = {};
  // if (photo != null) {
  //   data.image = {
  //     name: photo.fileName,
  //     type: photo.type,
  //     uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
  //   };
  // }
  // Object.keys(body).forEach(key => {
  //   data[key] = body[key];
  // });
  //console.log(`data`, data);
  return data;
};

const CreatePostScreen = props => {
  const {user} = props;
  const input = useRef();
  const [photo, setPhoto] = useState(null);
  const [tag, setTag] = useState(null);
  const [described, setDescribed] = useState('');
  const choosedPhoto = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response) {
        //console.log(`response`, response);
        setPhoto(response);
      }
    });
  };

  const submit = () => {
    const check = checkContent();
    if (photo == null && !check) {
      ToastAndroid.show('bai viet khong co noi dung', ToastAndroid.SHORT);
    } else {
      const data = createFormData(photo, {described: described});
      // gọi đến dispatch
      props.addPost(user.token, data);
      props.navigation.navigate('TabBar');
    }
  };
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <View style={{marginRight: 10}}>
          <Button onPress={() => submit()} title="Submit" />
        </View>
      ),
    });
  }, [props.navigation, photo, described]);
  const checkContent = () => {
    const boo = described.replace(/\s/g, '').length;
    return !!boo;
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
              source={
                user.avatar == null ||
                user.avatar == undefined ||
                user.avatar == ''
                  ? require('../assets/avatar_null.jpg')
                  : {uri: user.avatar}
              }
            />
            <Text style={{marginLeft: 10, fontWeight: 'bold', fontSize: 20}}>
              {user.username}
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
            onChangeText={text => {
              setDescribed(text);
            }}
          />
          {photo == null ? null : (
            <View>
              <Image
                style={{width: 200, height: 300}}
                source={{uri: photo.uri}}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
      {/* <View style={{marginBottom: 20, width: screenWidth, marginTop: 3}}>
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
      </View> */}
    </View>
  );
};

const mapStateToProp = state => ({
  user: {
    _id: state.auth._id,
    username: state.auth.username,
    avatar: state.auth.avatar,
    token: state.auth.token,
  },
});
const mapDispatchToProp = {
  addPost,
};
export default connect(mapStateToProp, mapDispatchToProp)(CreatePostScreen);

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
