import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  id: null,
  userName: null,
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
  },
});

// Action creators are generated for each case reducer function
export const { logIn, logOut, signUp, setName } = loginSlice.actions;

export default loginSlice.reducer;
