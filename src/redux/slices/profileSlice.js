import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("accountType") ? JSON.parse(localStorage.getItem("accountType")) : null,
  firstName: localStorage.getItem("firstName") ? JSON.parse(localStorage.getItem("firstName")) : null,
  lastName: localStorage.getItem("lastName") ? JSON.parse(localStorage.getItem("lastName")) : null,
  image: localStorage.getItem("image") ? JSON.parse(localStorage.getItem("image")) : null,
  userId: localStorage.getItem("userId") ? JSON.parse(localStorage.getItem("userId")) : null,
  email: localStorage.getItem("email") ? JSON.parse(localStorage.getItem("email")) : null,
  additionalDetails:localStorage.getItem("additionalDetails") ? JSON.parse(localStorage.getItem("additionalDetails")) : null,
  loading:false
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser: (state, value) => {
      state.user = value.payload;
      localStorage.setItem("accountType", JSON.stringify(value.payload));
    },
    setFirstName: (state, value) => {
      state.firstName = value.payload;
      localStorage.setItem("firstName", JSON.stringify(value.payload));
    },
    setLastName: (state, value) => {
      state.lastName = value.payload;
      localStorage.setItem("lastName", JSON.stringify(value.payload));
    },
    setImageUrl: (state, value) => {
      state.image = value.payload;
      localStorage.setItem("image", JSON.stringify(value.payload));
    },
    setUserId: (state, value) => {
      state.userId = value.payload;
      localStorage.setItem("userId", JSON.stringify(value.payload));
    },
    setEmail: (state, value) => {
      state.email = value.payload;
      localStorage.setItem("email", JSON.stringify(value.payload));
    },
    setAdditionalDetails:(state,value)=>{
      state.additionalDetails = value.payload;
      localStorage.setItem("additionalDetails",JSON.stringify(value.payload));
    },
    setLoading:(state,value)=>{
      state.loading = value.payload;
    }
  },
});

export const { setUser, setEmail, setFirstName, setImageUrl, setLastName, setUserId ,setAdditionalDetails,setLoading} = profileSlice.actions;
export default profileSlice.reducer;
