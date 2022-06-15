import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import filterReducer from "./filterSlice";
import modalReducer from "./modalSlice";
import prodiReducer from "./prodiSlice";

export default configureStore({
  reducer: {
    search: searchReducer,
    filter: filterReducer,
    modal: modalReducer,
    prodi: prodiReducer,
  },
});
