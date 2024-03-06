import store from '../store';
import { setMessages } from '../slices/chatSlice';

const updateChatHistoryIfSameConversationActive = ({
  participants,
  usersInConversation, 
  messages,
}) => {
  const result = participants.every(participantId => {
    return usersInConversation.includes(participantId);
  });

  if (result) {
    store.dispatch(setMessages(messages));
  }
};

const updateDirectChatHistoryIfActive = (data) => {
    const { participants, messages } = data;
  
    // find id of user from token and id from active conversation
    const receiverId = store.getState().chat.chosenChatDetails?.id;
    const userId = store.getState().auth.userDetails._id;
  
    if (receiverId && userId) {
      const usersInCoversation = [receiverId, userId];
  
      updateChatHistoryIfSameConversationActive({
        participants,
        usersInCoversation,
        messages,
      });
    }
  };

  export { updateDirectChatHistoryIfActive}