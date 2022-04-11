import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import uuid from 'react-native-uuid';
export type Task = {
  id: string;
  task: string;
};
interface Tasks {
  task_list: Array<Task>;
}

const initialState = {
  task_list: [],
  count: 0,
} as Tasks;

export const todoSlice = createSlice({
  name: 'todos',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<{task: string}>) {
      state = {
        ...state,
        task_list: [
          ...state.task_list,
          {id: uuid.v4() as string, task: action.payload.task},
        ],
      };
      return state;
    },
    removeTodo: (state, action: PayloadAction<{id: string}>) => {
      state = {
        ...state,
        task_list: state.task_list.filter(
          todo => todo.id !== action.payload.id,
        ),
      };
      return state;
    },
  },
});

export const {addTodo, removeTodo} = todoSlice.actions;

export default todoSlice.reducer;
