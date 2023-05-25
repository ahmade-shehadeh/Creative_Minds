import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: '' || localStorage.getItem("token"),
    userId: null || localStorage.getItem("userId"),
    isLoggedIn: null|| localStorage.getItem("isLoggedIn"),
    user_image: null || localStorage.getItem("user_image"),
    userInfo: null || JSON.parse(localStorage.getItem("userInfo")) || {},
    pooster : null || localStorage.getItem("pooster"),
    language:  localStorage.getItem('language') || null
  },
  reducers: {
    setLogin: (state, action) => {
      console.log(action.payload);
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.user_image = action.payload.user_image;
      state.isLoggedIn = true;
      localStorage.setItem("isLoggedIn",  state.isLoggedIn);
      localStorage.setItem("user_image",  state.user_image);
      localStorage.setItem("token", state.token);
      localStorage.setItem("userId", state.userId);

      console.log("done token and  _userId");
    },
    setLoginGoogel: (state, action) => {
      state.token = action.payload.credential;
      state.userId = action.payload.clientId;
      state.isLoggedIn = true;
      localStorage.setItem("isLoggedIn",  state.isLoggedIn);
      localStorage.setItem("token", state.token);
      localStorage.setItem("userId", state.userId);

      console.log("done token and  _userId",state.isLoggedIn);
    },

    setLogout: (state) => {
      state.token = null;
      state.userId = null;
      state.isLoggedIn = false;
      state.user_image = null;
      localStorage.clear();
    },
    setUserInfo: (state, action) => {
      state.userInfo = jwtDecode(action.payload.token);
      let userInfo = JSON.stringify(state.userInfo);
      localStorage.setItem("userInfo", userInfo);
      localStorage.setItem("userId", state.userInfo.userId);
      console.log("userInfo:", userInfo);
    },
    setUserInfoGoogle: (state, action) => {
      state.userInfo = jwtDecode(action.payload.credential);
      console.log("state.userInfo:", state.userInfo);
    },
    setPooster: (state,action) => {
      state.pooster = action.payload
      localStorage.setItem("pooster",state.pooster)
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem("language",state.language)
    }
  },
});
export const {
  setLogin,
  setLogout,
  setUserInfo,
  setLoginGoogel,
  setUserInfoGoogle,
  setNotification,
  setPooster,
  setLanguage
} = authSlice.actions;

export default authSlice.reducer;
