import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    value: "",
  },
  reducers: {
    FILTER_CATEGORY: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { FILTER_CATEGORY } = filterSlice.actions;

export default filterSlice.reducer;
