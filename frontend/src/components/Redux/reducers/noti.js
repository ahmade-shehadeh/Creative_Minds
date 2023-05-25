import { createSlice } from "@reduxjs/toolkit";

export const notiSlice = createSlice({
  name: "notification",
  initialState: {
    notification: [],
    counterNotification:0,
  },
  reducers: {
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
    setCounterNotification:(state, action)=> {
      state.notification = action.payload;
      let a = 0
      for (let i = 0; i < state.notification.length; i++) {
        if(state.notification[i].status == 'create_order'||
          state.notification[i].status =='accept_order'||
          state.notification[i].status =='accepted_order'||
          state.notification[i].status =='canceld_order'||
          state.notification[i].status =='order_canceld'
      ){
        a++
      }
      }
      state.counterNotification = a
      // console.log(state.counterNotification);
    },
    cancelNotification: (state, action) => {
      // console.log("ssssssssssssss",action.payload);
      state.notification = state.notification.filter((notification, index) => {
        return notification.id != action.payload;
      });
    },
  },
});


export const { setNotification ,setCounterNotification,cancelNotification} = notiSlice.actions;
export default notiSlice.reducers;
