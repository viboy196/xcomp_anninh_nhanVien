import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Provider} from 'react-redux';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
// import TestTodos from './src/TestScreens/TestTodos';
// import TestLogin from './src/TestScreens/testLogin';
// import LoginScreen from './src/TestScreens/LoginScreen';
// import RegisterScreen from './src/TestScreens/RegisterScreen';

import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './redux/store/store';
import {StatusBar} from 'react-native';
import {tintColorLight} from './constants/Colors';
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar
              animated={true}
              backgroundColor={tintColorLight}
              barStyle={'dark-content'}
              showHideTransition={'slide'}
              hidden={false}
            />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    );
  }
}
