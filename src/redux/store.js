import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSliice";
import { profileSlice } from "./slices/profileSlice";
import { courseSlice } from "./slices/courseSlice";
import { cartSlice } from "./slices/addtoCartSlice";
import { viewLectureSlice } from "./slices/viewLectureSlice";



export const store = configureStore({
    reducer:{
        auth:authSlice.reducer,
        profile:profileSlice.reducer,  
        course:courseSlice.reducer,
        cart:cartSlice.reducer,
        lecture:viewLectureSlice.reducer, 

    }
})
