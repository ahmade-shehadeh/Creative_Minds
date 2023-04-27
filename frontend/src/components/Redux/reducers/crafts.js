import { createSlice } from "@reduxjs/toolkit";

export const craftsSlice = createSlice({
  name: "craft",
  initialState: {
    craft: [],
  },
  reducers: {
    setCrafts: (state, action) => {
      state.craft = action.payload;
    },
  },
});

export const { setCrafts } = craftsSlice.actions;
export default craftsSlice.reducers;
