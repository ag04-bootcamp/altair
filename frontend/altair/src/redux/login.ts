import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  id: null,
  userName: null,
  fullName: null,
  profilePicture: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logIn: (state, { payload }) => {
      state.isLoggedIn = true;
      state.id = payload;
    },

    signUp: (state) => {
      state.isLoggedIn = true;
    },

    logOut: (state) => {
      state.isLoggedIn = false;
      state.id = null;
      state.userName = "";
    },

    setName: (state, { payload }) => {
      state.userName = payload;
    },
    setFullName: (state, { payload }) => {
      state.fullName = payload;
    },
    setProfilePicture: (state, { payload }) => {
      state.profilePicture = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  logIn,
  logOut,
  signUp,
  setName,
  setFullName,
  setProfilePicture,
} = loginSlice.actions;

export default loginSlice.reducer;
