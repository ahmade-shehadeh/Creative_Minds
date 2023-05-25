import { createSlice } from "@reduxjs/toolkit";

export const NotificationSlice = createSlice({
  name: "notification",
  initialState: {
    myNotification: [],
  },
  reducers: {
    setmyNotification: (state, action) => {
        state.myNotification = action.payload;
        console.log("sssssssss");
      },
  },
});
export const { setmyNotification} = NotificationSlice.actions;
export default NotificationSlice.reducers;
