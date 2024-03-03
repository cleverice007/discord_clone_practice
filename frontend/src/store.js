import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice'; 
import authReducer from './slices/authSlice';
import friendReducer from './slices/friendSlice';
import chatReducer from './slices/chatSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    friends: friendReducer,
    chat: chatReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), 
});

export default store;
