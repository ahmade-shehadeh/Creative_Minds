import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    myPosts: [],
    totalPages: 1,
    currentPage: 1,
  },
  reducers: {
    setPost: (state, action) => {
      state.posts = action.payload;
      state.totalPages=action.payload;
      state.currentPage=action.payload;
    },
    setMyPost: (state, action) => {
      state.myPosts = action.payload;
      console.log(state.myPosts);
    },
    deletePost: (state, action) => {
      state.myPosts = state.myPosts.filter(
        (post, i) => post.id != action.payload
      );
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

export const { setPost, deletePost, updatePost, setMyPost } = postSlice.actions;
export default postSlice.reducers;
