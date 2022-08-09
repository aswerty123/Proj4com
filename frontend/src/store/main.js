import { configureStore } from "@reduxjs/toolkit";
import proj4comReducer from "./proj4com";

const store = configureStore({
  reducer: { proj4com: proj4comReducer },
});

export default store;
