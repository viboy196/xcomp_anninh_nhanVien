import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {RoomState} from '../screens/main/TabTwoScreen';
export class NotificationServices {
  static WebRtc?: (item: RoomState) => void;
  static async onDisplayNotification(
    title: string = '',
    body: string = '',
    data: any = '',
  ) {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      visibility: AndroidVisibility.PUBLIC,
      importance: AndroidImportance.HIGH,
      vibration: true,
      lights: true,
    });

    // Display a notification
    await notifee.displayNotification({
      title: title,
      body: body,
      data: data ? data : null,
      android: {
        channelId,
        chronometerDirection: 'up',
        // onlyAlertOnce: true,
        // smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
      },
    });
  }
  static async getTokenFirebase(): Promise<string> {
    let token = '';
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Authorization status:', authStatus);
      token = await messaging().getToken();
    }
    return token;
  }
}
