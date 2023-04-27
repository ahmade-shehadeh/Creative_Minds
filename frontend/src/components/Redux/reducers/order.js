import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: [],
  },
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
    },

    reducers:{
        setOrder:(state,action)=>{
            state.order = action.payload;
        }
        
    }

  },
});


export const { setOrder } = orderSlice.actions;
export default orderSlice.reducers;
