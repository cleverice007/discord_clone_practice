import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userDetails: localStorage.getItem('userDetails')
    ? JSON.parse(localStorage.getItem('userDetails'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
      localStorage.setItem('userDetails', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userDetails = null; 
      localStorage.removeItem('userDetails');
    },
  },
});

export const { setUserDetails, logout } = authSlice.actions;
export default authSlice.reducer;
