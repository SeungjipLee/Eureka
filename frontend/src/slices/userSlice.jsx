import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    getUerInfo: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { getUerInfo } = userSlice.actions;

export default userSlice.reducer;
