import store from '../store';
import { setMessages } from '../slices/chatSlice';

const updateChatHistoryIfSameConversationActive = ({
  participants,
  usersInConversation,
  messages,
}) => {

  
  const result = participants.every(participantId =>
    usersInConversation.includes(participantId)
  );

  if (result) {
    store.dispatch(setMessages(messages));
  } else {
    console.log("No update to Redux store as conversation participants do not match");
  }
};

const updateDirectChatHistoryIfActive = (data) => {
  const { participants, messages } = data;

  const chatState = store.getState().chat;
  const authState = store.getState().auth;

  console.log(authState.userDetails);

  const receiverId = chatState.chosenChatDetails.id;
  const userId = authState.userDetails.id;

  const usersInConversation = [receiverId, userId];
  console.log("Updating chat history for users:", usersInConversation);

  updateChatHistoryIfSameConversationActive({
    participants,
    usersInConversation,
    messages,
  });
};



  export { updateDirectChatHistoryIfActive}