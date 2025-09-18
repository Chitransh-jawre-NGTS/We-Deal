import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaPaperPlane, FaUserCircle } from "react-icons/fa";
import { socket } from "../utils/socket";
import { chatApi } from "../api/chatApi";

const ChatRoom = () => {
  const { id: chatId } = useParams();
  const userId = localStorage.getItem("_Id");
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Fetch previous messages
  const fetchMessages = async () => {
    try {
      const res = await chatApi.getMessages(chatId);
      setMessages(res.data || []);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  useEffect(() => {
    if (!chatId) return;

    fetchMessages();

    // Connect to socket
    socket.connect();
    socket.emit("joinChat", chatId);

    // Listen for incoming messages
    const handleReceiveMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };
    socket.on("receiveMessage", handleReceiveMessage);

    // Cleanup on unmount
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.disconnect();
    };
  }, [chatId]);

  const sendMessage = async () => {
    const text = newMsg.trim();
    if (!text) return;

    const message = { chatId, text, sender: userId };

    // Optimistic UI update
    setMessages((prev) => [...prev, message]);
    setNewMsg("");

    socket.emit("sendMessage", message);

    try {
      await chatApi.sendMessage(chatId, { text });
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter") sendMessage();
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
          onClick={sendMessage}
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
