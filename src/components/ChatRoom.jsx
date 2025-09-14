// src/pages/ChatRoom.jsx
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaPaperPlane, FaUserCircle } from "react-icons/fa";

const ChatRoom = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! Is this still available?", sender: "other" },
    { id: 2, text: "Yes, it’s available.", sender: "me" },
  ]);
  const [newMsg, setNewMsg] = useState("");
  const [hasUserSentFirstMsg, setHasUserSentFirstMsg] = useState(
    messages.some((msg) => msg.sender === "me")
  );

  const sendMessage = (text = null) => {
    const messageToSend = text || newMsg;
    if (messageToSend.trim() === "") return;

    setMessages([
      ...messages,
      { id: Date.now(), text: messageToSend, sender: "me" },
    ]);
    setNewMsg("");
    setHasUserSentFirstMsg(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="flex items-center bg-blue-600 text-white p-4 shadow-md sticky top-0 z-50">
        <Link to="/chat" className="mr-3">
          <FaArrowLeft className="text-xl" />
        </Link>
        <div className="flex items-center gap-2">
          <FaUserCircle className="text-2xl" />
          <h2 className="text-lg font-semibold">User {id}</h2>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-2xl shadow-sm ${
              msg.sender === "me"
                ? "ml-auto bg-blue-600 text-white rounded-br-none"
                : "mr-auto bg-gray-200 text-gray-800 rounded-bl-none"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Quick Action Buttons (visible until user sends first message) */}
      {!hasUserSentFirstMsg && (
        <div className="p-3 flex gap-3 border-t bg-white">
          <button
            onClick={() => sendMessage("Hi 👋")}
            className="flex-1 py-2 rounded-full border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition"
          >
            Send Hi
          </button>
          <button
            onClick={() => sendMessage("I’d like to make an offer 💰")}
            className="flex-1 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Make an Offer
          </button>
        </div>
      )}

      {/* Input */}
      <div className="p-3 flex items-center border-t bg-white">
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => sendMessage()}
          className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
