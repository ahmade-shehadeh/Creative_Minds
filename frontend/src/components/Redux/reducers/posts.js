import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
  },
  reducers: {
    setPost: (state, action) => {
      state.posts = action.payload;
    },
    deletePost: (state, action) => {
      state.posts.forEach((post, i) => {
        if (post.id == action.payload) {
          state.posts.splice(i, 1);
        }
      });
    },
    updatePost: (state, action) => {
      state.posts.map((post, i) => {
        if (post.id == action.payload.id) {
          post.title = action.payload.title;
          post.description = action.payload.description;
          return post;
        }
      });
    },
  },
});

export const { setPost, deletePost, updatePost } = postSlice.actions;
export default postSlice.reducers;
