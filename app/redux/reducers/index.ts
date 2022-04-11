import {combineReducers} from 'redux';

import authNotificationReducer from '../features/notification/AuthNotificationSlice1';
// import notificationReducer from '../features/notification/NotificationSlice';

import authReducer from '../features/auth/authSlices';
import registerReducer from '../features/register/registerSlices';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {persistStore, persistReducer} from 'redux-persist';

export default combineReducers({
  auth: authReducer,
  register: registerReducer,
  authNotification: authNotificationReducer,
  //   notification: notificationReducer,
});
