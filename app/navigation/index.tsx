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
import {/*useAppDispatch ,*/ useAppSelector} from '../redux/store/hooks';

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
  const auth = useAppSelector(state => state.auth);
  //   const notificationData = useAppSelector(state => state.authNotification);
  //   const [state, setState] = React.useState(null);

  //   console.log('notificationData', notificationData.token);

  //   const fetchMyAPI = React.useCallback(
  //     async (notiToken: string, token: string) => {
  //       console.log('notification activeApp');

  //       const res = await ActivateApp(notiToken, token);
  //       if (res.status) {
  //         console.log('ActivateApp suscess');
  //       }
  //     },
  //     [],
  //   );
  //   React.useEffect(() => {
  //     if (auth.token && notificationData.token) {
  //       console.log('start active app');

  //       fetchMyAPI(notificationData.token, auth.token);
  //     }
  //   }, [notificationData.token, auth.token]);

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
    </Stack.Navigator>
  );
}
