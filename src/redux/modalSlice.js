import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    add: false,
    import: false,
    update: false,
    delete: false,
  },
  reducers: {
    MODAL_ADD: (state, data) => {
      state.add = data;
    },
    MODAL_IMPORT: (state, action) => {
      state.import = action.payload;
    },
    MODAL_UPDATE: (state, action) => {
      state.update = action.payload;
    },
    MODAL_DELETE: (state, action) => {
      state.delete = action.payload;
    },
  },
});

export const { MODAL_ADD, MODAL_IMPORT, MODAL_UPDATE, MODAL_DELETE } = modalSlice.actions;

export default modalSlice.reducer;
