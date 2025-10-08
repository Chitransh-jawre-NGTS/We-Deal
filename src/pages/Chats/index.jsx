import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaEllipsisV, FaShoppingBag, FaPaperPlane } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import { chatApi } from "../../api/chatApi";
import LoadingPage from "../../components/LoadingPage";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const navigate = useNavigate();

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setLoading(true);
        const res = await chatApi.getAll();
        setChats(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);
  useEffect(() => {
    // Show spinner for 2 seconds
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleChatClick = (chat) => {
    if (isMobile) {
      navigate(`/chatroom/${chat._id}`);
    } else {
      setSelectedChat(chat);
      // Fake messages for demo
      setMessages([
        { id: 1, text: "Hello!", sender: "other" },
        { id: 2, text: "Hi, how are you?", sender: "me" },
      ]);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const msg = { id: Date.now(), text: newMessage, sender: "me" };
    setMessages((prev) => [...prev, msg]);
    setNewMessage("");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar showTopBar={false} ShowMobileTop={false} showMobileMenu={false} />
      <div className="h-auto max-h-screen bg-gray-100 flex flex-col md:flex-row">
        {/* Left Chat List */}
        <aside className="w-full md:w-1/3 lg:w-1/4 border-r bg-white flex flex-col">
          {/* Header */}
          <header className="px-4 py-3 flex items-center justify-between border-b">
            <h1 className="text-xl font-bold text-gray-800">Chats</h1>
            <div className="flex items-center gap-4 text-lg text-gray-600">
              <FaSearch className="cursor-pointer hover:text-gray-800 transition" />
              <FaEllipsisV className="cursor-pointer hover:text-gray-800 transition" />
            </div>
          </header>

          {/* Chat List - scrollable */}
          <div className="flex-1 mt-5 overflow-y-auto">
            {chats.length === 0 ? (
              <div className="flex flex-col items-center justify-center mt-20 text-center text-gray-500 space-y-4 p-6">
                <FaShoppingBag className="text-6xl text-blue-400" />
                <h2 className="text-2xl font-semibold">No chats yet</h2>
                <p className="text-gray-400 text-sm">
                  You currently don’t have any chats. Browse listings and start
                  conversations with sellers!
                </p>
                <Link
                  to="/"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Browse Listings
                </Link>
              </div>
            ) : (
              chats.map((chat) => (
                <div
                  key={chat._id}
                  className={`flex items-center gap-3 p-4 border-b hover:bg-blue-50 cursor-pointer relative ${selectedChat?._id === chat._id ? "bg-blue-100" : ""
                    }`}
                  onClick={() => handleChatClick(chat)}
                >
                  {/* Avatar */}
                  <img
                    src={chat.otherUser.avatar || "/default-avatar.png"}
                    alt={chat.otherUser.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-gray-800 truncate">
                      {chat.otherUser.name}
                    </h4>
                    <p className="text-sm text-gray-600 truncate">
                      {chat.lastMessage?.text || "No messages yet"}
                    </p>
                  </div>

                  <FaEllipsisV
                    className="text-gray-600 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(menuOpen === chat._id ? null : chat._id);
                    }}
                  />


                  {menuOpen === chat._id && (
                    <div className="absolute right-0 top-12 w-32 bg-white shadow-md rounded-md text-sm z-50">
                      <button
                        className="w-full px-4 py-2 hover:bg-gray-100"
                        onClick={async (e) => {
                          e.stopPropagation(); // prevent triggering chat click
                          const confirmDelete = window.confirm(
                            "Are you sure you want to delete this chat?"
                          );
                          if (!confirmDelete) return;

                          try {
                            // Call API to delete chat
                            await chatApi.delete(chat._id);

                            // Update state
                            setChats((prev) => prev.filter((c) => c._id !== chat._id));

                            // Close menu
                            setMenuOpen(null);

                            // Clear selected chat if it was deleted
                            if (selectedChat?._id === chat._id) setSelectedChat(null);
                          } catch (err) {
                            console.error("Failed to delete chat:", err);
                            alert("Failed to delete chat. Please try again.");
                          }
                        }}
                      >
                        Delete
                      </button>

                      <button
                        className="w-full px-4 py-2 hover:bg-gray-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert("Block functionality coming soon!");
                        }}
                      >
                        Block
                      </button>
                    </div>
                  )}

                </div>
              ))
            )}
          </div>
        </aside>

        {/* Right Chat Window (Desktop Only, fixed full height) */}
        <main className="hidden md:flex flex-col flex-1 bg-gray-50 h-150">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b bg-white flex items-center gap-3">
                <img
                  src={selectedChat.otherUser.avatar || "/default-avatar.png"}
                  alt={selectedChat.otherUser.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <h2 className="font-semibold text-gray-800">
                  {selectedChat.otherUser.name}
                </h2>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-2 rounded-lg max-w-xs ${msg.sender === "me"
                      ? "bg-blue-500 text-white self-end ml-auto"
                      : "bg-gray-200 text-gray-800"
                      }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              {/* Input Box */}
              <div className="p-3 border-t bg-white flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type a message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </>
          ) : (
            <div className="m-auto text-center text-gray-400">
              <div className="text-6xl mb-4">💬</div>
              <h2 className="text-xl font-semibold">
                Select a chat to view conversation
              </h2>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Chats;
