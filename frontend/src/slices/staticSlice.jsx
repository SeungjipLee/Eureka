import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  twovalue: null,
  value: null,
  list: [],
};

export const staticSlice = createSlice({
  name: "staticList",
  initialState,
  reducers: {
    top5Category: (state, action) => {
      state.twovalue = action.payload;
    },
    benefitTop5Category: (state, action) => {
      state.value = action.payload;
    },
    tagList: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { top5Category, benefitTop5Category, tagList } =
  staticSlice.actions;

export default staticSlice.reducer;
