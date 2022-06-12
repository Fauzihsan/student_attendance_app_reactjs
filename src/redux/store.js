import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import filterReducer from "./filterSlice";
import modalReducer from "./modalSlice";

export default configureStore({
  reducer: {
    search: searchReducer,
    filter: filterReducer,
    modal: modalReducer,
  },
});
