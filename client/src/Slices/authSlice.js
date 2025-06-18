import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  selectedUser: null,
  username:null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('username',action.payload.user);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.selectedUser = null;
      state.username=null;
      localStorage.removeItem('token');
      localStorage.removeItem('selectedUser');
    },
    selectedUser:(state,action)=>{
      
      const {user,username} = action.payload;
   
      state.selectedUser = user;
      state.username = username;

      localStorage.setItem('selectedUser',user);
    }
  },
});

export const { loginSuccess, logout,selectedUser } = authSlice.actions;
export default authSlice.reducer;
