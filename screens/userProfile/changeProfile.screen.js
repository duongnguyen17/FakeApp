import React, {useRef, useState, useLayoutEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  Button,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {screenHeight, screenWidth} from '../../constants';
import {launchImageLibrary} from 'react-native-image-picker';
import {changeUserInfor, getUserInfor} from '../../redux/actions/user.action';
import {getListPost} from '../../redux/actions/post.action';
import {connect} from 'react-redux';

const createFormData = (photo, body = {}) => {
  const data = new FormData();
  if (photo != null) {
    data.append('avatar', {
      name: photo.fileName,
      type: photo.type,
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });
  }
  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });
  return data;
};
const ChangeProfileScreen = props => {
  const {auth, user} = props;
  const introInput = useRef();
  const [photo, setPhoto] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [homeTown, setHomeTown] = useState(user.homeTown);
  const [address, setAddress] = useState(user.address);
  const [born, setBorn] = useState(user.born);
  const [intro, setIntro] = useState(user.intro);

  const choosedPhoto = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response) {
        //console.log(`response`, response);
        setPhoto(response);
      }
    });
  };
  const submit = () => {
    const data = createFormData(photo, {
      username: username,
      homeTown: homeTown,
      address: address,
      born: born,
      intro: intro,
    });
    // gọi đến dispatch
    //console.log(`data`, data);
    props.changeUserInfor(auth.token, data);
    props.navigation.navigate('TabBar');
  };
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <View style={{marginRight: 10}}>
          <Button onPress={() => submit()} title="Submit" />
        </View>
      ),
    });
  }, [props.navigation, photo, born, username, address, homeTown, intro]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.form}>
        <View style={{marginHorizontal: 5, flexDirection: 'column', flex: 1}}>
          <TouchableOpacity
            style={styles.avatar}
            onPress={() => {
              choosedPhoto();
            }}>
            <Image
              style={{
                alignSelf: 'center',
                borderRadius: 70,
                borderColor: '#f2f2f2',
                borderWidth: 2,
                width: 120,
                height: 120,
                position: 'absolute',
              }}
              source={
                photo == null
                  ? user.avatar == null ||
                    user.avatar == undefined ||
                    user.avatar == ''
                    ? require('../../assets/avatar_null.jpg')
                    : {uri: user.avatar}
                  : {uri: photo.uri}
              }
            />
            <View style={{backgroundColor: 'f2f2f2'}}>
              <MaterialCommunityIcons name="camera" size={26} color={'black'} />
            </View>
          </TouchableOpacity>
          <View style={{marginVertical: 20, marginHorizontal: 10}}>
            <View style={styles.inputBar}>
              <Text style={{fontWeight: 'bold', marginLeft: 10}}>
                Username:{' '}
              </Text>
              <TextInput
                style={{flex: 1}}
                defaultValue={user.username}
                onChangeText={text => {
                  setUsername(text);
                }}
              />
            </View>
            <View style={styles.inputBar}>
              <Text style={{fontWeight: 'bold', marginLeft: 10}}>Born: </Text>
              <TextInput
                style={{flex: 1}}
                defaultValue={user.born}
                onChangeText={text => {
                  setBorn(text);
                }}
              />
            </View>
            <View style={styles.inputBar}>
              <Text style={{fontWeight: 'bold', marginLeft: 10}}>
                Home town:{' '}
              </Text>
              <TextInput
                style={{flex: 1}}
                defaultValue={user.homeTown}
                onChangeText={text => {
                  setHomeTown(text);
                }}
              />
            </View>
            <View style={styles.inputBar}>
              <Text style={{fontWeight: 'bold', marginLeft: 10}}>
                Address:{' '}
              </Text>
              <TextInput
                style={{flex: 1}}
                defaultValue={user.address}
                onChangeText={text => {
                  setAddress(text);
                }}
              />
            </View>
          </View>
          <Text style={{fontSize: 24, fontWeight: 'bold', alignSelf: 'center'}}>
            Introduce
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#f2f2f2',
              marginHorizontal: 10,
              marginVertical: 10,
              height: 100,
              borderRadius: 10,
              marginBottom: 20,
            }}
            onPress={() => {
              introInput.current.focus();
            }}>
            <TextInput
              ref={introInput}
              multiline={true}
              defaultValue={user.intro}
              onChangeText={text => {
                setIntro(text);
              }}
            />
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity
          style={{
            backgroundColor: '#66ccff',
            width: 120,
            borderRadius: 10,
            alignItems: 'center',
            marginLeft: screenWidth / 4,
          }}
          onPress={control => {
            submit(control);
          }}>
          <Text style={{fontSize: 26, color: '#ffffff', fontWeight: '700'}}>
            Submit
          </Text>
        </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView>
  );
};
const mapStateToProp = state => ({
  auth: {
    token: state.auth.token,
  },
  user: state.user.userData,
});
const mapDispatchToProp = {
  changeUserInfor,
  getListPost,
  getUserInfor,
};
export default connect(mapStateToProp, mapDispatchToProp)(ChangeProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  avatar: {
    alignSelf: 'center',
    borderRadius: 70,
    borderColor: '#f2f2f2',
    borderWidth: 2,
    width: 120,
    height: 120,
    marginTop: 5,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#f2f2f2',
    height: 40,
    marginBottom: 2,
  },
});
