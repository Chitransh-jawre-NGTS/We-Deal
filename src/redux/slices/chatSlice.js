// src/redux/slices/chatSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { chatApi } from "../../api/chatApi";

// Async thunks
export const fetchAllChats = createAsyncThunk(
  "chat/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await chatApi.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (chatId, { rejectWithValue }) => {
    try {
      const response = await chatApi.getMessages(chatId);
      return { chatId, messages: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ chatId, text }, { rejectWithValue }) => {
    try {
      const response = await chatApi.sendMessage(chatId, { text });
      return { chatId, message: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const findOrCreateChat = createAsyncThunk(
  "chat/findOrCreate",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await chatApi.findOrCreateByProduct(productId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteChat = createAsyncThunk(
  "chat/delete",
  async (chatId, { rejectWithValue }) => {
    try {
      await chatApi.delete(chatId);
      return chatId;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice
const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    messages: {},           // { [chatId]: [] }
    loadingChats: false,
    loadingMessages: false,
    errorChats: null,
    errorMessages: null,
  },
  reducers: {
    clearChatError: (state) => {
      state.errorChats = null;
    },
    clearMessages: (state, action) => {
      delete state.messages[action.payload];
    },
    addIncomingMessage: (state, action) => {
      const { chatId, message } = action.payload;
      if (!state.messages[chatId]) state.messages[chatId] = [];
      state.messages[chatId].push(message);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all chats
      .addCase(fetchAllChats.pending, (state) => {
        state.loadingChats = true;
        state.errorChats = null;
      })
      .addCase(fetchAllChats.fulfilled, (state, action) => {
        state.loadingChats = false;
        state.chats = action.payload;
      })
      .addCase(fetchAllChats.rejected, (state, action) => {
        state.loadingChats = false;
        state.errorChats = action.payload;
      })

      // Fetch messages
      .addCase(fetchMessages.pending, (state) => {
        state.loadingMessages = true;
        state.errorMessages = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loadingMessages = false;
        state.messages[action.payload.chatId] = action.payload.messages;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loadingMessages = false;
        state.errorMessages = action.payload;
      })

      // Send message
      .addCase(sendMessage.pending, (state) => {
        state.errorMessages = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const { chatId, message } = action.payload;
        if (!state.messages[chatId]) state.messages[chatId] = [];
        state.messages[chatId].push(message);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.errorMessages = action.payload;
      })

      // Find or create chat
      .addCase(findOrCreateChat.pending, (state) => {
        state.loadingChats = true;
        state.errorChats = null;
      })
      .addCase(findOrCreateChat.fulfilled, (state, action) => {
        state.loadingChats = false;
        const chatExists = state.chats.find(
          (c) => c._id === action.payload._id
        );
        if (!chatExists) state.chats.push(action.payload);
      })
      .addCase(findOrCreateChat.rejected, (state, action) => {
        state.loadingChats = false;
        state.errorChats = action.payload;
      })

      // Delete chat
      .addCase(deleteChat.fulfilled, (state, action) => {
        state.chats = state.chats.filter((chat) => chat._id !== action.payload);
        delete state.messages[action.payload];
      })
      .addCase(deleteChat.rejected, (state, action) => {
        state.errorChats = action.payload;
      });
  },
});

export const { clearChatError, clearMessages, addIncomingMessage } = chatSlice.actions;
export default chatSlice.reducer;
