// src/api/chatApi.js
import httpClient from "../utils/httpClient";
import endpoints from "../utils/endpoint";

export const chatApi = {
  getMessages: (chatId) => httpClient.get(`${endpoints.chat.byId(chatId)}/messages`),
  sendMessage: (chatId, message) =>
    httpClient.post(`${endpoints.chat.byId(chatId)}/messages`, message),
   getAll: () => httpClient.get(endpoints.chat.list),
};
