export const addChatMessage = (userMessage, botMessage) => ({
    type: 'ADD_CHAT_MESSAGE',
    payload: { userMessage, botMessage },
  });
  