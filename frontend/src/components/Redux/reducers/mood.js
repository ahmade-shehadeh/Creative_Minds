import { createSlice } from "@reduxjs/toolkit";

export const MoodSlice = createSlice({
  name: "mood",
  initialState: {
    mood: null || localStorage.getItem("mood"),
  },
  reducers: {
    changeMood: (state, action) => {
      state.mood = action.payload;
      localStorage.setItem("mood", state.mood);

    },
  },
});

export const { changeMood } = MoodSlice.actions;
export default MoodSlice.reducers;
