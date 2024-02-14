import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: null,
    uid: null,
    email: null,
    username: null,
    token: null,
    msg: null
  },
  reducers: {
    login: (state, {payload}) => {
      state.status = "authenticated";
      state.uid = payload.uid;
      state.username = payload.username;
      state.email = payload.email;
      state.msg = null;
      state.token = payload.token;
      localStorage.setItem('user', JSON.stringify(state));
    },
    logout: (state, {payload}) => {
      state.status = "not-authenticated";
      state.uid = null;
      state.email = null;
      state.username = null;
      state.token = null;
      state.msg = payload?.msg;
      localStorage.clear();
    },
    checkingCredentials: (state) => {
      state.status = "checking";
    }
  }
});

export const { login, logout, checkingCredentials } = authSlice.actions;