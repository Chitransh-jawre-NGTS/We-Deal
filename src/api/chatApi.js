// src/api/chatApi.js
import httpClient from "../utils/httpClient";
import endpoints from "../utils/endpoint";

export const chatApi = {
  // ✅ Get messages of a chat
  getMessages: (chatId) =>
    httpClient.get(`${endpoints.chat.byId(chatId)}/messages`),

  // ✅ Send a message in a chat
  sendMessage: (chatId, message) =>
    httpClient.post(`${endpoints.chat.byId(chatId)}/messages`, message),

  // ✅ Get all chats of the logged-in user
  getAll: () => httpClient.get(endpoints.chat.list),

  // ✅ Start/find chat for a product
  findOrCreateByProduct: (productId) =>
    httpClient.post(endpoints.chat.findOrCreateByProduct(productId)),
};
