import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token:localStorage.getItem("token") ? localStorage.getItem("token")  : null,
    loading:false,
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setToken:(state,value)=>{
            state.token = value.payload;
            localStorage.setItem("token",value.payload);
             
        },
        removeToken:(state,value)=>{
            state.token  = null;
            localStorage.removeItem("token");
        },
        setLoading:(state,value)=>{
            state.loading = value.payload;
        }
    }
})

export const {setToken,removeToken,setLoading}  = authSlice.actions;
export default authSlice.reducer;