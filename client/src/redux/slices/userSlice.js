import { createSlice } from "@reduxjs/toolkit";

const user = sessionStorage.getItem("userInfo")
  ? JSON.parse(sessionStorage.getItem("userInfo"))
  : null;
const initialState = {
  userInfo: user,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      sessionStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.userInfo = null;
      sessionStorage.removeItem("userInfo");
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
