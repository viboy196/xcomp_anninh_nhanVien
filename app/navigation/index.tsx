/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {ColorSchemeName} from 'react-native';

import {RootStackParamList} from './types';
import LinkingConfiguration from './LinkingConfiguration';

import MainScreen from '../screens/main';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';

// import {setToken} from '../redux/features/notification/AuthNotificationSlice1';
// import {addNotification} from '../redux/features/notification/NotificationSlice';
import {useAppDispatch, useAppSelector} from '../redux/store/hooks';
import messaging from '@react-native-firebase/messaging';

import VideoTest from '../components/Video';
import {NotificationServices} from '../services/NotificationServices';
import ApiRequest from '../utils/api/Main/ApiRequest';
import {
  addNotification,
  NotificationType,
} from '../redux/features/notification/NotificationSlice';
// import {useRef, useState} from 'react';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('unsubscribe', remoteMessage);
      let time = remoteMessage.sentTime
        ? remoteMessage.sentTime
        : new Date().getTime();

      const item: NotificationType = {
        title: remoteMessage.notification?.title
          ? remoteMessage.notification?.title
          : '',
        body: remoteMessage.notification?.body
          ? remoteMessage.notification?.body
          : '',
        time,
        isClick: false,
        data: remoteMessage.data,
      };
      console.log(item);

      dispatch(addNotification({noti: item}));
      NotificationServices.onDisplayNotification(
        remoteMessage.notification?.title,
        remoteMessage.notification?.body,
        remoteMessage.data,
      );
    });

    return unsubscribe;
  }, [dispatch]);
  const auth = useAppSelector(state => state.auth);
  React.useEffect(() => {
    NotificationServices.getTokenFirebase().then(token => {
      if (auth.token) {
        ApiRequest.ActivateApp({
          tokenFirebase: token,
          tokenAuth: auth.token,
          typeApp: 'nhanvien',
        }).then(res => {
          console.log('ActivateApp', res.status, res.errorMessage);
        });
      }
    });
  }, [auth.token]);

  console.log('RootNavigator', auth);

  return (
    <Stack.Navigator>
      {auth.token === undefined ? (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
      ) : (
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{headerShown: false}}
        />
      )}

      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CallWebRtc"
        component={VideoTest}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
