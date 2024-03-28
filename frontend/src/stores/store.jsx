import { configureStore } from "@reduxjs/toolkit";
import cardSlice from "../slices/cardSlice";
import productSlice from "../slices/productSlice";

export const store = configureStore({
  reducer: {
    cardList: cardSlice,
    productList: productSlice,
  },
});
