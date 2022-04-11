import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import {LoginApi} from '../../../utils/api';

export type UsersState = {
  token?: string;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  errorMessage?: string;
};
const initialState = {
  loading: 'idle',
  token: undefined,
} as UsersState;

export const loginAsync = createAsyncThunk(
  'auth/login',
  // if you type your function argument here
  async (input: {phone: string; password: string}) => {
    return await LoginApi(input);
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut(state) {
      state = {
        ...state,
        token: undefined,
      };
      return state;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginAsync.pending, state => {
        state = {...state, loading: 'pending'};
        return state;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        console.log('loginAsync fulfilled', action.payload);

        if (action.payload.status === true) {
          state = {
            ...state,
            loading: 'succeeded',
            token: action.payload.result,
          };
        } else {
          state = {
            ...state,
            loading: 'failed',
            token: undefined,
            errorMessage: action.payload.errorMessage,
          };
        }
        return state;
      });
  },
});
export const {logOut} = authSlice.actions;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

export default persistReducer(persistConfig, authSlice.reducer);
