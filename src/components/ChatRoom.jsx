// src/pages/ChatRoom.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaPaperPlane, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../utils/socket";
import {
  fetchMessages,
  sendMessage,
  addIncomingMessage,
} from "../redux/slices/chatSlice";

const ChatRoom = () => {
  const dispatch = useDispatch();
  const { id: chatId } = useParams();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user._id;

  const messages = useSelector(
    (state) => state.chat.messages[chatId] || []
  );

  const [newMsg, setNewMsg] = useState("");
  const messagesEndRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch + socket setup
  useEffect(() => {
    if (!chatId) return;
    dispatch(fetchMessages(chatId));

    if (!socket.connected) socket.connect();

    socket.emit("joinChat", chatId);

    const handleReceiveMessage = (msg) => {
      // ✅ prevent duplicate: skip if it's our own msg
      if (msg.sender !== userId) {
        dispatch(addIncomingMessage({ chatId, message: msg }));
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.emit("leaveChat", chatId);
    };
  }, [chatId, dispatch, userId]);

  // Send message
  const sendMessageHandler = async () => {
    const text = newMsg.trim();
    if (!text) return;

    const payload = { chatId, text, sender: userId };

    // Optimistic update
    dispatch(addIncomingMessage({ chatId, message: payload }));

    socket.emit("sendMessage", payload);

    await dispatch(sendMessage(payload));

    setNewMsg("");
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter") sendMessageHandler();
  };

  return (
    <div className="h-screen w-auto flex flex-col bg-gray-50">
      {/* Header */}
      <header className="flex items-center bg-blue-600 text-white p-4 shadow-md sticky top-0 z-50">
        <Link to="/chat" className="mr-3">
          <FaArrowLeft className="text-xl" />
        </Link>
        <div className="flex items-center gap-2">
          <FaUserCircle className="text-2xl" />
          <h2 className="text-lg font-semibold">Chat {chatId}</h2>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={msg._id || msg.id || idx}
            className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-2xl shadow-sm break-words ${
              msg.sender === userId
                ? "ml-auto bg-blue-600 text-white rounded-br-none text-right"
                : "mr-auto bg-gray-200 text-gray-800 rounded-bl-none text-left"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 flex items-center border-t bg-white">
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          onKeyDown={handleEnterPress}
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessageHandler}
          disabled={!newMsg.trim()}
          className={`p-3 rounded-full transition ${
            newMsg.trim()
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
