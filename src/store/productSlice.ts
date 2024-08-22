import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { statusCodes } from "../utils/statusCodes";

const initialState = {
  data: [],
  status: statusCodes.IDLE,
};

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    // fetchProducts(state, action) {
    //   state.data = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = statusCodes.IDLE;
      })
      .addCase(getProducts.pending, (state, action) => {
        state.status = statusCodes.LOADING;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = statusCodes.ERROR;
      });
  },
});

export const getProducts = createAsyncThunk("product/get", async () => {
  const data = await fetch("https://fakestoreapi.com/products").then((res) =>
    res.json()
  );
  return data;
});

// export const { fetchProducts } = productSlice.actions;
export default productSlice.reducer;

// export function getProducts() {
//   return async function getProductsToThunk(dispatch, getState) {
//     const data = await fetch("https://fakestoreapi.com/products").then((res) =>
//       res.json()
//     );
//     console.log(data);
//     dispatch(fetchProducts(data));
//   };
// }
