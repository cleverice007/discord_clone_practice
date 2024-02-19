import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setUserDetails: (state, action) => {
        state.userInfo = action.payload;
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      },
      logout: (state) => {
        state.userInfo = null;
        localStorage.removeItem('userInfo');
      },
    },
  });
  
  export const { setUserDetails, logout } = authSlice.actions;
  
  export default authSlice.reducer;