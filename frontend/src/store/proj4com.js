import { createSlice } from "@reduxjs/toolkit";

const proj4comSlice = createSlice({
  name: "proj4com",
  initialState: {
    authTokens: {},
    user: {},
  },
  reducers: {
    storeAuthTokenAndUserInfo(state, action) {
      state.authTokens = action.payload.authTokens;
      state.user = action.payload.user;
    },
  },
});

export const proj4comActions = proj4comSlice.actions;

export default proj4comSlice.reducer;
