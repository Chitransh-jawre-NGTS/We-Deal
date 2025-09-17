import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaPaperPlane, FaUserCircle } from "react-icons/fa";
import { socket } from "../utils/socket";
import { chatApi } from "../api/chatApi"; // ✅ import API

const ChatRoom = () => {
  const { id: chatId } = useParams();
  const userId = localStorage.getItem("_Id");
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  // Fetch previous messages from backend
  const fetchMessages = async () => {
    try {
      const res = await chatApi.getMessages(chatId); // ✅ use API
      setMessages(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!chatId) return;

    fetchMessages();

    socket.connect();
    socket.emit("joinChat", chatId);

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.disconnect();
    };
  }, [chatId]);

  const sendMessage = async () => {
  if (!newMsg.trim()) return;

  const message = { chatId, text: newMsg }; // remove sender
  socket.emit("sendMessage", message);

  try {
    await chatApi.sendMessage(chatId, { text: newMsg }); // only send text
  } catch (err) {
    console.error("Failed to send message to backend:", err);
  }

  setNewMsg("");
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
        {messages.map((msg) => (
          <div
            key={msg._id || msg.id}
            className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-2xl shadow-sm ${
              msg.sender === userId
                ? "ml-auto bg-blue-600 text-white rounded-br-none"
                : "mr-auto bg-gray-200 text-gray-800 rounded-bl-none"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

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
          onClick={sendMessage}
          className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
