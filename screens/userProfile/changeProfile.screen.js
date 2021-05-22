import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { screenHeight, screenWidth } from '../../constants'

function ChangeProfileScreen() {
  const intro = useRef()
  const { control, handleSubmit } = useForm()

  const submit = (data) => {

  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <View style={{ height: 15 * screenHeight / 20, width: 18 * screenWidth / 20, flexDirection: 'column' }} >
          <TouchableOpacity style={styles.avatar}>
            <Image
              style={{
                alignSelf: 'center',
                borderRadius: 70,
                borderColor: '#f2f2f2',
                borderWidth: 2,
                width: 120,
                height: 120,
                position: 'absolute'
              }}
              source={require('../../assets/avatar.jpg')} />
            <View style={{ backgroundColor: 'f2f2f2' }}>
              <MaterialCommunityIcons name='camera' size={26} color={'black'} />
            </View>
          </TouchableOpacity>
          <View style={{ height: 120, flex: 1, marginHorizontal: 10, marginTop: 20 }}>
            <View style={styles.inputBar}>
              <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>Born:  </Text>
              <TextInput style={{ flex: 1 }} />
            </View>
            <View style={styles.inputBar}>
              <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>Home town:  </Text>
              <TextInput />
            </View>
            <View style={styles.inputBar}>
              <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>Address:  </Text>
              <TextInput style={{ flex: 1 }} />
            </View>
          </View>
          <Text style={{ alignSelf: 'center', fontSize: 26, fontWeight: 'bold' }}>Introduce</Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#f2f2f2',
              marginHorizontal: 10,
              height: 5 * screenHeight / 20,
              borderRadius: 10,
              marginBottom: 20
            }}
            onPress= {() => {
              intro.current.focus()
            }}
          >
            <TextInput
              ref={intro}
              multiline={true}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#66ccff',
            width: 120,
            borderRadius: 10,
            alignItems: 'center',
            marginLeft: screenWidth / 4
          }}
          onPress={(control) => {
            submit(control)
          }}>
          <Text style={{ fontSize: 26, color: '#ffffff', fontWeight: '700' }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
export default ChangeProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    width: 19 * screenWidth / 20,
    height: 17 * screenHeight / 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    alignSelf: 'center',
    borderRadius: 70,
    borderColor: '#f2f2f2',
    borderWidth: 2,
    width: 120,
    height: 120,
    marginTop: 20,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#f2f2f2',
    height: 40,
    marginBottom: 2
  }
})