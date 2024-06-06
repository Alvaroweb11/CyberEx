import { createSlice } from '@reduxjs/toolkit'

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    status: null,
    points: 0,
    hashEasyTask1: 0,
    hashEasyTask2: 0,
    hashEasyTask3: 0,
    hashHardTask1: 0,
    hashHardTask2: 0,
    steganographyEasyTask1: 0,
    steganographyHardTask1: 0,
    phishingEasyTask1: 0,
    phishingHardTask1: 0,
  },
  reducers: {
    addPoints: (state, {payload}) => {
      state.status = "checked";
      state.points = payload.points;
      state.hashEasyTask1 = payload.hashEasyTask1;
      state.hashEasyTask2 = payload.hashEasyTask2;
      state.hashEasyTask3 = payload.hashEasyTask3;
      state.hashHardTask1 = payload.hashHardTask1;
      state.hashHardTask2 = payload.hashHardTask2;
      state.steganographyEasyTask1 = payload.steganographyEasyTask1;
      state.steganographyHardTask1 = payload.steganographyHardTask1;
      state.phishingEasyTask1 = payload.phishingEasyTask1;
      state.phishingHardTask1 = payload.phishingHardTask1;
      localStorage.setItem('tasks', JSON.stringify(state));
    },
    updateTask: (state, action) => {
      const newState = { ...state, ...action.payload };
      localStorage.setItem('tasks', JSON.stringify(newState));
      return newState;
    }
  }
});

export const { addPoints, updateTask } = tasksSlice.actions;