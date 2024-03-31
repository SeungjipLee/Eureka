import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  twovalue: null,
};

export const staticSlice = createSlice({
  name: "staticList",
  initialState,
  reducers: {
      top5Category:(state, action) => {
        state.twovalue = action.payload;
      }
  },
});

export const { top5Category } =
staticSlice.actions;

export default staticSlice.reducer;
