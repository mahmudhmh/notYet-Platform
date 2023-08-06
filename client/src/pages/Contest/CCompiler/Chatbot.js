import React, { useState } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (message) => {
    // Add the new message to the array of messages
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const handleToggleWindow = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseWindow = () => {
    setIsOpen(false);
  };

  return (
    <div className="chatbot-container">
      <button className="toggle-button" onClick={handleToggleWindow}>
        {isOpen ? "Hide Chatbot" : "!YET Solution Tips"}
      </button>
      <div className={`chatbot-window ${isOpen ? "open" : "closed"}`}>
        <button className="exit-button" onClick={handleCloseWindow}>
          X
        </button>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
        <iframe
          src={`https://ora.sh/embed/8687450a-6001-49f8-ae8a-08b686352d47`}
          width="100%"
          height="100%"
          style={{ border: "0", borderRadius: "4px" }}
        />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="chat-input">
      <input
        type="text"
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
      />
      <button
        onClick={() => {
          onSendMessage(message);
          setMessage("");
        }}
      >
        Send
      </button>
    </div>
  );
};

export default Chatbot;
