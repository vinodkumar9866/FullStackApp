import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import CartSlice from "./CartSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    cart: CartSlice,
    products: productSlice,
    user: userSlice,
  },
});

export type StoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
