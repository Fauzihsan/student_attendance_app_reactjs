import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    value: "",
  },
  reducers: {
    SEARCH_KEYWORDS: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { SEARCH_KEYWORDS } = searchSlice.actions;

export default searchSlice.reducer;
