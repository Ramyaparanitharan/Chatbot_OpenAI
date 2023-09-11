const initialState = {
  chatHistory: [], 
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CHAT_MESSAGE':
      return {
        ...state,
        chatHistory: [
          ...state.chatHistory,
          { user: action.payload.userMessage, bot: action.payload.botMessage },
        ],
      };
    default:
      return state;
  }
};

export default chatReducer;
