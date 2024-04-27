import { createSlice } from '@reduxjs/toolkit'

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    points: 0,
    hashTask1: 0,
    hashTask2: 0,
    hashTask3: 0,
    steganographyTask1: 0,
  },
  reducers: {
    addPoints: (state, {payload}) => {
      state.points = payload.points;
      state.hashTask1 = payload.hashTask1;
      state.hashTask2 = payload.hashTask2;
      state.hashTask3 = payload.hashTask3;
      state.steganographyTask1 = payload.steganographyTask1;
      localStorage.setItem('tasks', JSON.stringify(state));
    },
    updateTask: (state, action) => {
      const newState = { ...state, ...action.payload };
      localStorage.setItem('tasks', JSON.stringify(newState));
      return newState;
    },
  }
});

export const { addPoints, updateTask } = tasksSlice.actions;