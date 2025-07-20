import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseAllData:localStorage.getItem("courseAllData") ? JSON.parse(localStorage.getItem("courseAllData")) : null,
    courseSectionData:localStorage.getItem("courseSectionData") ? JSON.parse(localStorage.getItem("courseSectionData")) : null,
    courseTotalLectures:localStorage.getItem("courseTotalLectures") ? JSON.parse(localStorage.getItem("courseTotalLectures")) : 0,
    courseCompletedLectures:localStorage.getItem("courseCompletedLectures") ? JSON.parse(localStorage.getItem("courseCompletedLectures")) : 0,
    allReviews:localStorage.getItem("allReviews") ? JSON.parse(localStorage.getItem("allReviews")) : null,
}

export const viewLectureSlice = createSlice({
    name:"lecture",
    initialState,
    reducers:{
        setViewCourseAllData:(state,value)=>{
            state.courseAllData = value.payload;
            localStorage.setItem("courseAllData",JSON.stringify(value.payload));
        },
        setViewSectionData:(state,value)=>{
            state.courseSectionData = value.payload;
            localStorage.setItem("courseSectionData",JSON.stringify(value.payload));
        },
        setTotalLectures:(state,value)=>{
            state.courseTotalLectures = value.payload;
            localStorage.setItem("courseTotalLectures",JSON.stringify(value.payload));
        },
        setCompletedLectures:(state,value)=>{
            state.courseCompletedLectures = value.payload;
            localStorage.setItem("courseCompletedLectures",JSON.stringify(value.payload));
        },
        setAllReviews:(state,value)=>{
            state.allReviews = value.payload;
            localStorage.setItem("allReviews",JSON.stringify(value.payload));
        }
    }
})

export const {setViewCourseAllData,setViewSectionData,setTotalLectures,setCompletedLectures,setAllReviews} = viewLectureSlice.actions;

export default viewLectureSlice.reducer;