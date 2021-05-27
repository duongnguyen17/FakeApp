import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Provider} from 'react-redux';
import Store from './redux/store/store';

import LoginScreen from './screens/auth/login.screen';
import SignupScreen from './screens/auth/signup.screen';
import HomeScreen from './screens/home/home.screen';
import UserProfileScreen from './screens/userProfile/userProfile.screen';
import NotificationScreen from './screens/notifications/notification.screen';
import ChangeProfileScreen from './screens/userProfile/changeProfile.screen';
import Comment from './screens/comments.screen';
import CreatePostScreen from './screens/createPostScreen.screen';
import PostDetail from './screens/PostDetail';

const Stack = createStackNavigator();
const MainTab = createBottomTabNavigator();
const MainStack = createStackNavigator();

const HomeTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureResponseDistance: {vertical: 800},
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const NotificationTab = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Notification" component={NotificationScreen} />
    </Stack.Navigator>
  );
};

const ProfileTab = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile" component={UserProfileScreen} />
    </Stack.Navigator>
  );
};

const TabBar = () => {
  return (
    <MainTab.Navigator tabBarOptions={{showLabel: false}}>
      <MainTab.Screen
        name="HomeTab"
        component={HomeTab}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="home"
              size={40}
              color={focused ? '#318bfb' : '#ddd'}
            />
          ),
        }}
      />
      <MainTab.Screen
        name="NotificationTab"
        component={NotificationTab}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="bell"
              size={40}
              color={focused ? '#318bfb' : '#ddd'}
            />
          ),
        }}
      />
      <MainTab.Screen
        name="ProfileTab"
        component={ProfileTab}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="account"
              size={40}
              color={focused ? '#318bfb' : '#ddd'}
            />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};
const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <MainStack.Navigator initialRouteName="LoginScreen">
          <MainStack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              title: 'Login',
              headerStyle: {
                backgroundColor: '#1a73e8',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <MainStack.Screen
            name="SignupScreen"
            component={SignupScreen}
            options={{
              title: 'Signup',
              headerStyle: {
                backgroundColor: '#1a73e8',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <MainStack.Screen
            name="TabBar"
            component={TabBar}
            options={{headerShown: false}}
          />
          <MainStack.Screen name="UserProfile" component={UserProfileScreen} />
          <MainStack.Screen
            name="ChangeProfile"
            component={ChangeProfileScreen}
          />
          <MainStack.Screen name="Comment" component={Comment} />
          <MainStack.Screen
            name="CreatePostScreen"
            component={CreatePostScreen}
          />
          <MainStack.Screen name="PostDetail" component={PostDetail} />
        </MainStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
