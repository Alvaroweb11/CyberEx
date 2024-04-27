import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/auth'
import { tasksSlice } from './slices/auth'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    tasks: tasksSlice.reducer
  },
});