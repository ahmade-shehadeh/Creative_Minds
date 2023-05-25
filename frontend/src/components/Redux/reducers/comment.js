import { createSlice } from "@reduxjs/toolkit";

export const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
    userpostId:null
  },
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    setuserpostId: (state, action) => {
      state.userpostId = action.payload;
    },
  },
});

export const { setComments,setuserpostId } = commentSlice.actions;
export default commentSlice.reducers;
