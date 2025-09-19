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
import { Link } from "react-router-dom";
import { FaSearch, FaEllipsisV, FaShoppingBag } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import { chatApi } from "../../api/chatApi";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setLoading(true);
        const res = await chatApi.getAll();
        setChats(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load chats");
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  const handleDelete = (id) => alert(`Delete chat with ID: ${id}`);
  const handleBlock = (id) => alert(`Block chat with ID: ${id}`);

  if (loading)
    return (
      <p className="text-center mt-20 text-gray-500">Loading chats...</p>
    );

  return (
    <>
      <Navbar showTopBar={false} ShowMobileTop={false} showMobileMenu={false} />
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Header */}
        <header className="text-white md:hidden px-4 py-3 flex items-center justify-between shadow-md sticky top-0 z-50">
          <h1 className="text-3xl font-bold text-gray-700">Chats</h1>
          <div className="flex items-center gap-4 text-xl">
            <FaSearch className="cursor-pointer hover:text-gray-200 transition" />
            <FaEllipsisV className="cursor-pointer hover:text-gray-200 transition" />
          </div>
        </header>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto p-4">
          {chats.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-32 text-center text-gray-500 space-y-4">
              <FaShoppingBag className="text-6xl text-blue-400" />
              <h2 className="text-2xl font-semibold">No chats yet</h2>
              <p className="text-gray-400 max-w-xs">
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
                className="flex items-center gap-3 p-4 border-b bg-white hover:bg-blue-50 transition relative"
              >
                <Link to={`/chatroom/${chat._id}`} className="flex-1 min-w-0 flex items-center gap-3">
                  {/* Avatar */}
                  <img
                    src={chat.avatar || "/default-avatar.png"}
                    alt={chat.name}
                    className="w-20 h-20  object-cover"
                  />
                  <div className="min-w-0">
                    <h4 className="font-semibold text-gray-800 truncate">
                      {chat.name}
                    </h4>
                    <p className="text-sm text-gray-600 truncate">
                      {chat.lastMessage?.text || ""}
                    </p>
                  </div>
                </Link>

                <div className="relative ml-3">
                  <FaEllipsisV
                    className="text-gray-600 cursor-pointer"
                    onClick={() =>
                      setMenuOpen(menuOpen === chat._id ? null : chat._id)
                    }
                  />
                  {menuOpen === chat._id && (
                    <div className="absolute right-0 top-6 w-32 bg-white shadow-md rounded-md text-sm z-50">
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => handleDelete(chat._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => handleBlock(chat._id)}
                      >
                        Block
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Chats;
