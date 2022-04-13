/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './app/App';
// import VideoTest from './app/test/Video';

import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
// import {getNotification} from './app/services/RESTnotification';
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Nhận message', remoteMessage);
  // await getNotification();
});

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;

  if (type === EventType.PRESS) {
    console.log('User pressed an action with the id: ', pressAction.id);
    // navigate here
  }
  await notifee.cancelNotification(notification.id);
  console.log('background-event');
});

AppRegistry.registerComponent(appName, () => App);
