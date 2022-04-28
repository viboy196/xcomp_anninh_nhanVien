import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type NotificationType = {
  title: string;
  body: string;
  isClick: boolean;
  data: any;
  time: number;
};

export type NotificationsType = {
  notifications: Array<NotificationType>;
  numNotSee: number;
};
const initialState = {
  notifications: [],
  numNotSee: 0,
} as NotificationsType;

export const NotificationSlice = createSlice({
  name: 'notification',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<{noti: NotificationType}>) {
      state = {
        ...state,
        notifications: [action.payload.noti, ...state.notifications],
        numNotSee: state.numNotSee + 1,
      };
      return state;
    },
    updateNotification(state, action: PayloadAction<{noti: NotificationType}>) {
      const index = state.notifications.findIndex(
        it => it.time === action.payload.noti.time,
      );
      console.log('updateNotification index:', action.payload.noti);

      const arr = [
        ...state.notifications.slice(0, index),
        action.payload.noti,
        ...state.notifications.slice(index + 1),
      ];
      state = {...state, notifications: arr, numNotSee: state.numNotSee - 1};
      return state;
    },
    removeNotification() {
      return {notifications: [], numNotiView: 0, numNotSee: 0};
    },

    removeCountNotifi(state) {
      return {...state, numNotSee: 0};
    },
    setNotification(
      state,
      action: PayloadAction<{noti: Array<NotificationType>}>,
    ) {
      state = {...state, notifications: action.payload.noti};
      return state;
    },
  },
});

export const {
  addNotification,
  updateNotification,
  removeNotification,
  removeCountNotifi,
  setNotification,
} = NotificationSlice.actions;

export default NotificationSlice.reducer;
