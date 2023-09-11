import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import chaticon from "../images/headset_mic.svg";
import { addChatMessage } from "../redux/chatActions";

function Chatbot() {
  const API_KEY = "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";
  const dispatch = useDispatch();

  const chatHistory = useSelector((state) => state.chat.chatHistory);


  const [input, setInput] = useState("");

  const fetchData = async (input) => {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        prompt: `Complete this sentence: "${input}"`,
        model: 'text-davinci-002',
        max_tokens: 50,
        n: 1,
        stop: ".",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return response.data.choices[0].text;
  };

  async function handleClick() {
    try {
      const completedSentence = await fetchData(input);
      dispatch(addChatMessage(input, completedSentence));
      setInput("");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container">
      <div className="">
        <div>
          <img src={chaticon} alt="chaticon" />
          <h2> How Can I Help You ? </h2>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            rows={5}
            placeholder="Type here..."
          />
        </div>
        <button className="button" onClick={handleClick}>
          Chat
        </button>
        <div className="chat-history">
          {chatHistory.map((message, index) => (
            <div key={index} className="chat-message">
              <div className="user-message">User: {message.user}</div>
              <div className="bot-message">Bot: {message.bot}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
