// src/pages/ChatRoom.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPaperPlane, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../utils/socket";
import {
  fetchMessages,
  sendMessage,
  addIncomingMessage,
} from "../redux/slices/chatSlice";

const ChatRoom = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id: chatId } = useParams(); // ✅ destructured correctly
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user._id;

  const messages = useSelector(
    (state) => state.chat.messages[chatId] || [] // ✅ use chatId
  );
  const [newMsg, setNewMsg] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  // Fetch messages and setup socket
  useEffect(() => {
    if (!chatId) return;

    dispatch(fetchMessages(chatId));

    if (!socket.connected) {
      socket.connect();
    }

    // Join the chat room
    socket.emit("joinChat", chatId, (ack) => {
      if (!ack?.success) console.error("Failed to join chat", ack?.message);
    });

    const handleReceiveMessage = (msg) => {
      dispatch(addIncomingMessage({ chatId, message: msg }));
    };
    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.emit("leaveChat", chatId); // leave room instead of disconnecting
    };
  }, [chatId, dispatch]);

  // Send message
  const sendMessageHandler = async () => {
    const text = newMsg.trim();
    if (!text) return;

    if (!userId) {
      alert("User not found. Please login again.");
      return;
    }

    const payload = { chatId, text, sender: userId };

    // Optimistic UI update
    dispatch(addIncomingMessage({ chatId, message: payload }));

    // Emit via socket
    socket.emit("sendMessage", payload, (ack) => {
      if (!ack?.success) console.error("Message not sent", ack?.message);
    });

    // Send to API
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
                ? "ml-auto bg-blue-600 text-white rounded-br-none"
                : "mr-auto bg-gray-200 text-gray-800 rounded-bl-none"
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
