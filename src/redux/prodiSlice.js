import { createSlice } from "@reduxjs/toolkit";

export const prodiSlice = createSlice({
  name: "prodi",
  initialState: {
    id: "",
    name: "",
  },
  reducers: {
    ID_PRODI: (state, action) => {
      state.id = action.payload;
    },
    NAME_PRODI: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { ID_PRODI, NAME_PRODI } = prodiSlice.actions;

export default prodiSlice.reducer;
