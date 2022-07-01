import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    status: "all",
    meet_number: "0",
  },
  reducers: {
    FILTER_CATEGORY: (state, action) => {
      state.status = action.payload;
    },
    FILTER_MEET_NUMBER: (state, action) => {
      state.meet_number = action.payload;
    },
  },
});

export const { FILTER_CATEGORY, FILTER_MEET_NUMBER } = filterSlice.actions;

export default filterSlice.reducer;
