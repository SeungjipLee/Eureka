import { configureStore } from "@reduxjs/toolkit";
import cardSlice from "../slices/cardSlice";
import productSlice from "../slices/productSlice";
import staticSlice from "../slices/staticSlice";
import userSlice from "../slices/userSlice";

export const store = configureStore({
  reducer: {
    cardList: cardSlice,
    productList: productSlice,
    staticList: staticSlice,
    userInfo: userSlice,
  },
});
