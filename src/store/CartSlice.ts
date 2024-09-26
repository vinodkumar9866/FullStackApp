import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../interfaces/product";

const initialState: { data: IProduct[] } = {
  data: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItems(state, action) {
      state.data = action.payload;
    },
    // removeCartItems(state, action) {
    //   return state.data.filter((item: IProduct) => item.id !== action.payload);
    // },
  },
});

export const { addCartItems } = cartSlice.actions;
export default cartSlice.reducer;
