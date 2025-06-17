import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';

const AuthRedux = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    isAuthenticated: false,
  },

  reducers: {
    authenticate: (state, action) => {
      state.token = action.payload.token;
    //   state.userId = action.payload.userId;
    //   state.email = action.payload.email;
    //   state.username = action.payload.username;      
      state.isAuthenticated = true;
      AsyncStorage.setItem('token', action.payload);
    },
    // setUser: (state ,action ) => {
    //   state.username = action.payload;
    // },
    logout: (state, action) => {
      state.token = null;
    //   (state.userId === '' && state.username === '')
      console.log('ACTION', state.token);
      state.isAuthenticated = false;
      AsyncStorage.removeItem('token');
    },
  },
});

export const authenticate = AuthRedux.actions.authenticate;
export const setUser = AuthRedux.actions.setUser;
export const logout = AuthRedux.actions.logout;
export default AuthRedux.reducer;
