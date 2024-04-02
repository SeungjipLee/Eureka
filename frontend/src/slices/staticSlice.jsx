import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  twovalue: null,
  value: null,
};

export const staticSlice = createSlice({
  name: "staticList",
  initialState,
  reducers: {
      top5Category:(state, action) => {
        state.twovalue = action.payload;
      },
      benefitTop5Category:(state, action) => {
        state.value = action.payload;
      }
  },
});

export const { top5Category ,benefitTop5Category } =
staticSlice.actions;

export default staticSlice.reducer;
