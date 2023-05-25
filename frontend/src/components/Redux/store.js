import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "./reducers/auth";
import { postSlice } from "./reducers/posts";
import {craftsSlice } from "./reducers/crafts";
import {orderSlice } from "./reducers/order";
import {commentSlice} from "./reducers/comment";
import { MoodSlice } from "./reducers/mood";
import { notiSlice } from "./reducers/noti";

export default configureStore ({
    reducer :{
        auth:  authSlice.reducer,
        post:  postSlice.reducer,
        craft: craftsSlice.reducer,
        order: orderSlice.reducer,
        comments:commentSlice.reducer,
        Mood:MoodSlice.reducer,
        noti : notiSlice.reducer,
    }
})