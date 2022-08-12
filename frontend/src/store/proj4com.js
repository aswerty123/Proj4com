import { createSlice } from "@reduxjs/toolkit";

const proj4comSlice = createSlice({
  name: "proj4com",
  initialState: {
    // authTokens: {},
    // user: {},
    // loading: true,
  },
  reducers: {
    // storeAuthTokenAndUserInfo(state, action) {
    //   state.authTokens = action.payload.authTokens;
    //   state.user = action.payload.user;
    // },
    // setLoading(state, action) {
    //   state.loading = action.payload.laoding;
    // },
  },
});

export const proj4comActions = proj4comSlice.actions;

export default proj4comSlice.reducer;
