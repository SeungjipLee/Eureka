import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const productSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    selectCardId: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { selectCardId } = productSlice.actions;

export default productSlice.reducer;
