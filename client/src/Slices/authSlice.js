import { createSlice,createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import axios  from 'axios';
import { authuser } from '../../utils/Api/userapi';
const initialState = {
  user: null,
  token: localStorage.getItem('ut') || null,
  selectedUser: null,
  username:null,
  id:null,
  online:null,
   status: 'idle',
  
};



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.id = action.payload.id;
      localStorage.setItem('ut',action.payload.token);
      localStorage.setItem('username',action.payload.user);
      localStorage.setItem('id',action.payload.id);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.selectedUser = null;
      state.username=null;
      localStorage.removeItem('ut');
      localStorage.removeItem('selectedUser');
      localStorage.removeItem('id');
      localStorage.removeItem('username')
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
