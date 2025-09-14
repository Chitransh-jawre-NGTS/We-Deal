import React, { useState, useEffect, useRef } from "react";
import { Send, Bot, User } from "lucide-react";
import { motion } from "framer-motion";

const faqResponses = {
  "how to post ad": "To post an ad, go to 'Sell' on the navbar, fill in your product details, and click Submit.",
  "how to become seller": "Go to 'Become a Seller' page, fill out the form, and wait for admin approval.",
  "is my data safe": "Yes! We use encryption and secure servers to keep your data safe.",
  "payment options": "You can make payments via UPI, Net Banking, Debit/Credit Cards, or Cash on Delivery (if available).",
  "contact support": "You can reach our support team from the 'Help Center' section in the menu.",
};

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    { type: "bot", text: "👋 Hi, I’m your smart assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (msgText = input) => {
    if (!msgText.trim()) return;

    // Add user message
    const userMsg = { type: "user", text: msgText };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Bot typing
    setIsTyping(true);

    // Find response
    const lower = msgText.toLowerCase();
    let response =
      "🤔 Hmm, I’m not sure about that. Please check the Help Center for more info.";
    Object.keys(faqResponses).forEach((key) => {
      if (lower.includes(key)) {
        response = faqResponses[key];
      }
    });

    // Simulate delay
    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "bot", text: response }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="max-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center ">
      <div className="w-full max-w-2xl bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl flex flex-col h-[75vh] border border-gray-200">
        {/* Header */}
        <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-2xl flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
            <Bot className="w-5 h-5" />
          </div>
          <h2 className="font-semibold text-lg">Smart Assistant</h2>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-end gap-2 ${
                msg.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.type === "bot" && (
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <p
                className={`px-4 py-2 rounded-2xl max-w-[70%] text-sm leading-relaxed ${
                  msg.type === "user"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </p>
              {msg.type === "user" && (
                <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-700" />
                </div>
              )}
            </motion.div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="px-4 py-2 bg-gray-100 rounded-2xl rounded-bl-none">
                <span className="animate-pulse">Bot is typing...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Reply Chips */}
        <div className="px-4 py-2 flex flex-wrap gap-2 border-t bg-gray-50">
          {Object.keys(faqResponses).map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="px-3 py-1.5 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Box */}
        <div className="p-3 border-t flex items-center gap-2 bg-white rounded-b-2xl">
          <input
            type="text"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={() => handleSend()}
            className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:opacity-90 transition"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
