import { createSlice } from "@reduxjs/toolkit";

// Create a slice for managing notifications
const notificationsSlice = createSlice({
  name: "notifications", // Name of the slice
  initialState: {
    notifications: [], // Initial state for notifications
  },
  reducers: {
    addNotification(state, action) {
      // Add a new notification to the notifications array
      state.notifications.unshift(action.payload);
    },
  },
});

// Export the reducer function and action creator
export const { addNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
