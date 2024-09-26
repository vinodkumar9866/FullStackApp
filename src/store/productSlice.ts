import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../interfaces/product";

const initialState: { data: IProduct[] } = {
  data: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts: (state, action) => {
      state.data = action.payload;
    },
  },
});
export const { addProducts } = productSlice.actions;
export default productSlice.reducer;
