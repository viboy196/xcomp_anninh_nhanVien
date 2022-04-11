import {InputRegister} from '../../../utils/api/apiTypes';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RegisterApi} from '../../../utils/api';
import {UsersState} from '../auth/authSlices';

const initialState = {
  loading: 'idle',
  token: undefined,
} as UsersState;

export const registerAsync = createAsyncThunk(
  'register/register',
  // if you type your function argument here
  async (input: InputRegister) => {
    return await RegisterApi(input);
  },
);

const register = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(registerAsync.pending, state => {
        state = {...state, loading: 'pending'};
        return state;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
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
            token: action.payload.errorMessage,
          };
        }
        return state;
      });
  },
});

export default register.reducer;
