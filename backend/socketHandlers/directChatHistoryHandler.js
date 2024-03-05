import Conversation from '../models/conversation'
import { updateChatHistory } from "./updates/chat";


const directChatHistoryHandler = async (socket, data) => {
    try {
      const { userId } = socket.user;
      const { receiverUserId } = data;
  
      const conversation = await Conversation.findOne({
        participants: { $all: [userId, receiverUserId] },
        type: "DIRECT",
      });
  
      if (conversation) {
        updateChatHistory(conversation._id.toString(), socket.id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  export { directChatHistoryHandler}