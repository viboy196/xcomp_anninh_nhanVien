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
import ChiTietSoDoScreen from '../screens/ChiTietSoDo';
import DoChiSoScreen from '../screens/DoChiSo';
import KhuVucDoScreen from '../screens/KhuVucDo';
import DoNuocScreen from '../screens/DoNuoc';

// import {setToken} from '../redux/features/notification/AuthNotificationSlice1';
// import {addNotification} from '../redux/features/notification/NotificationSlice';
import {useAppSelector} from '../redux/store/hooks';
// import messaging from '@react-native-firebase/messaging';

import VideoTest from '../components/Video';
// import {NotificationServices} from '../services/NotificationServices';
// import ApiRequest from '../utils/api/Main/ApiRequest';
// import {
//   addNotification,
//   NotificationType,
// } from '../redux/features/notification/NotificationSlice';
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
  // const dispatch = useAppDispatch();

  // React.useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log('unsubscribe', remoteMessage);
  //     let time = remoteMessage.sentTime
  //       ? remoteMessage.sentTime
  //       : new Date().getTime();

  //     const item: NotificationType = {
  //       title: remoteMessage.notification?.title
  //         ? remoteMessage.notification?.title
  //         : '',
  //       body: remoteMessage.notification?.body
  //         ? remoteMessage.notification?.body
  //         : '',
  //       time,
  //       isClick: false,
  //       data: remoteMessage.data,
  //     };
  //     console.log(item);

  //     dispatch(addNotification({noti: item}));

  //     try {
  //       const data = JSON.parse(item.data.info);
  //       console.log(item);
  //       if (data.roomId && data.stateToken) {
  //         if (NotificationServices.WebRtc) {
  //           NotificationServices.WebRtc({
  //             roomId: data.roomId,
  //             stateToken: data.stateToken,
  //           });
  //         }
  //       }
  //     } catch (error) {
  //       console.log('fail convert ');
  //     }
  //     NotificationServices.onDisplayNotification(
  //       remoteMessage.notification?.title,
  //       remoteMessage.notification?.body,
  //       remoteMessage.data,
  //     );
  //   });

  //   return unsubscribe;
  // }, [dispatch]);
  const auth = useAppSelector(state => state.auth);
  // React.useEffect(() => {
  //   NotificationServices.getTokenFirebase().then(token => {
  //     if (auth.token) {
  //       ApiRequest.ActivateApp({
  //         tokenFirebase: token,
  //         tokenAuth: auth.token,
  //         typeApp: 'nhanvien',
  //       }).then(res => {
  //         console.log('ActivateApp', res.code, res.errorMessage);
  //       });
  //     }
  //   });
  // }, [auth.token]);

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
        name="KhuVucDoScreen"
        component={KhuVucDoScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChiTietSoDoScreen"
        component={ChiTietSoDoScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="DoChiSo"
        component={DoChiSoScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="CallWebRtc"
        component={VideoTest}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DoNuoc"
        component={DoNuocScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
