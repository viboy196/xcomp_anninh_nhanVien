import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type AuthNotificationType = {
  token?: string;
};

const initialState = {} as AuthNotificationType;

export const AuthNotificationSlice = createSlice({
  name: 'authNotification',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<{token: string}>) {
      state = {
        ...state,
        token: action.payload.token,
      };
      return state;
    },
  },
});

export const {setToken} = AuthNotificationSlice.actions;

export default AuthNotificationSlice.reducer;
