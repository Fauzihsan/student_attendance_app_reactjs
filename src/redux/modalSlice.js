import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    add: false,
    import: false,
  },
  reducers: {
    MODAL_ADD: (state, action) => {
      state.add = action.payload;
    },
    MODAL_IMPORT: (state, action) => {
      state.import = action.payload;
    },
  },
});

export const { MODAL_ADD, MODAL_IMPORT, MODAL_UPDATE, MODAL_DELETE } = modalSlice.actions;

export default modalSlice.reducer;
