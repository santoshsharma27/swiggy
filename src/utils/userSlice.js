import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserName: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const { addUserName } = userSlice.actions;

export default userSlice.reducer;

export const getUsername = (state) => state.user.userName;
