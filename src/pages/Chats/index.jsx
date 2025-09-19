// // src/pages/Chats.jsx
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaSearch, FaEllipsisV, FaCheckCircle } from "react-icons/fa";
// import Navbar from "../../components/Navbar";

// // Sample avatars
// const avatars = [
//   "https://i.pravatar.cc/150?img=1",
//   "https://i.pravatar.cc/150?img=2",
//   "https://i.pravatar.cc/150?img=3",
//   "https://i.pravatar.cc/150?img=4",
//   "https://i.pravatar.cc/150?img=5",
// ];

// const chats = [
//   {
//     id: 1,
//     name: "Rahul Sharma",
//     lastMsg: "Hey, is this still available?",
//     time: "2:45 PM",
//     unread: 2,
//     avatar: avatars[0],
//     verified: true,
//   },
//   {
//     id: 2,
//     name: "Anjali Gupta",
//     lastMsg: "Can you share more pictures?",
//     time: "1:30 PM",
//     unread: 0,
//     avatar: avatars[1],
//     verified: false,
//   },
//   {
//     id: 3,
//     name: "Amit Verma",
//     lastMsg: "Price negotiable?",
//     time: "Yesterday",
//     unread: 1,
//     avatar: avatars[2],
//     verified: true,
//   },
// ];

// const Chats = () => {
//   const [menuOpen, setMenuOpen] = useState(null);

//   const handleDelete = (id) => {
//     alert(`Delete chat with ID: ${id}`);
//   };

//   const handleBlock = (id) => {
//     alert(`Block chat with ID: ${id}`);
//   };

//   return (
//    <>
//    <Navbar showTopBar={false} showMobileMenu={false}/> 
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       {/* Header */}
//       <header className=" text-white px-4 py-3 flex items-center justify-between shadow-md sticky top-0 z-50">
//         <h1 className="text-3xl font-bold text-gray-700">Chats</h1>
//         <div className="flex items-center gap-4 text-xl">
//           <FaSearch className="cursor-pointer hover:text-gray-200 transition" />
//           <FaEllipsisV className="cursor-pointer hover:text-gray-200 transition" />
//         </div>
//       </header>

//       {/* Chat List */}
//       <div className="flex-1 overflow-y-auto">
//         {chats.map((chat) => (
//           <div
//             key={chat.id}
//             className="flex items-center gap-3 p-4 border-b bg-white hover:bg-blue-50 transition relative"
//           >
//             {/* Avatar */}
//             <div className="relative">
//               <img
//                 src={chat.avatar}
//                 alt={chat.name}
//                 className="w-12 h-12 rounded-full object-cover border"
//               />
//               {/* Verification badge */}
//               {chat.verified && (
//                 <FaCheckCircle className="absolute -top-1 -right-1 text-blue-500 bg-white rounded-full text-lg" />
//               )}
//               {/* Online indicator */}
//               <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
//             </div>

//             {/* Chat Details (Link around text only, not menu) */}
//             <Link
//               to={`/chatroom/${chat.id}`}
//               className="flex-1 min-w-0"
//             >
//               <div className="flex justify-between items-center">
//                 <h4 className="font-semibold text-gray-800 truncate">
//                   {chat.name}
//                 </h4>
//                 <span className="text-xs text-gray-400">{chat.time}</span>
//               </div>
//               <p className="text-sm text-gray-600 truncate">{chat.lastMsg}</p>
//             </Link>

//             {/* Unread Badge */}
//             {chat.unread > 0 && (
//               <span className="ml-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
//                 {chat.unread}
//               </span>
//             )}

//             {/* Action Menu */}
//             <div className="relative ml-3">
//               <FaEllipsisV
//                 className="text-gray-600 cursor-pointer"
//                 onClick={() => setMenuOpen(menuOpen === chat.id ? null : chat.id)}
//               />
//               {menuOpen === chat.id && (
//                 <div className="absolute right-0 top-6 w-32 bg-white shadow-md rounded-md text-sm z-50">
//                   <button
//                     className="w-full text-left px-4 py-2 hover:bg-gray-100"
//                     onClick={() => handleDelete(chat.id)}
//                   >
//                     Delete
//                   </button>
//                   <button
//                     className="w-full text-left px-4 py-2 hover:bg-gray-100"
//                     onClick={() => handleBlock(chat.id)}
//                   >
//                     Block
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div></>

//   );
// };

// export default Chats;












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

  if (loading)
    return (
      <LoadingPage/>
    );

  return (
    <>
      <Navbar showTopBar={false} ShowMobileTop={false} showMobileMenu={false} />
      <div className="h-screen max-h-screen bg-gray-100 flex flex-col md:flex-row">
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
          <div className="flex-1 overflow-y-auto">
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
                  className={`flex items-center gap-3 p-4 border-b hover:bg-blue-50 cursor-pointer relative ${
                    selectedChat?._id === chat._id ? "bg-blue-100" : ""
                  }`}
                  onClick={() => handleChatClick(chat)}
                >
                  {/* Avatar */}
                  <img
                    src={chat.avatar || "/default-avatar.png"}
                    alt={chat.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-gray-800 truncate">
                      {chat.name}
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
                      <button className="w-full px-4 py-2 hover:bg-gray-100">
                        Delete
                      </button>
                      <button className="w-full px-4 py-2 hover:bg-gray-100">
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
                  src={selectedChat.avatar || "/default-avatar.png"}
                  alt={selectedChat.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <h2 className="font-semibold text-gray-800">
                  {selectedChat.name}
                </h2>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-2 rounded-lg max-w-xs ${
                      msg.sender === "me"
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
