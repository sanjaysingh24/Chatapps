import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  selectedUser: null,
  username:null,
  id:null,
  online:null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.log(action.payload);
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.id = action.payload.id;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('username',action.payload.user);
      localStorage.setItem('id',action.payload.id);
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
  
      const {user,username,online} = action.payload;
   
      state.selectedUser = user;
      state.username = username;
      state.online = online ;

      localStorage.setItem('selectedUser',user);
    }
  },
});

export const { loginSuccess, logout,selectedUser } = authSlice.actions;
export default authSlice.reducer;
