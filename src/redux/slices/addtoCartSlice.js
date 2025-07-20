import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
  totalAmount: localStorage.getItem("totalAmount")
    ? JSON.parse(localStorage.getItem("totalAmount"))
    : 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart: (state, value) => {
        if(state.cartItems.some((item) => item._id === value.payload._id)){
            toast.error("Course is already added");
            return;
        }
      state.cartItems.push(value.payload);
      state.totalItems += 1;
      state.totalAmount += value.payload.price;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
      localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
      toast.success("Course added to your cart");
    },
    removeFromCart: (state, value) => {
      state.cartItems =  state.cartItems.filter((item) => item._id !== value.payload._id);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      state.totalItems -= 1;
      state.totalAmount -= value.payload.price;
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
      localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
      toast.error("Course removed from your cart");
    },
    resetCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalItems = 0;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
      localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
      toast.error("Your cart has been cleared");
    },
  },
});

export const {addtoCart,removeFromCart,resetCart} = cartSlice.actions;
export default cartSlice.reducer;