import { createSlice } from '@reduxjs/toolkit';

export const chatTypes = {
  DIRECT: "DIRECT",
  GROUP: "GROUP",
};


const initialState = {
    chosenChatDetails: null,
    chatType: null,
    messages: [],
  };
  

  const chatSlice = createSlice({
    name: 'chat', 
    initialState,
    reducers: { 
      setChosenChatDetails: (state, action) => {
        state.chosenChatDetails = action.payload.chatDetails;
        state.chatType = action.payload.chatType;
        state.messages = []; 
      },
      setMessages: (state, action) => {
        state.messages = action.payload;
        console.log("Updating messages in Redux store", action.payload); 
      },
    },
  });


  export const { setChosenChatDetails, setMessages } = chatSlice.actions;
  export default chatSlice.reducer;