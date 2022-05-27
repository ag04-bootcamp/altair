import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  options: [],
};

export const measurementSlice = createSlice({
  name: "measurement",
  initialState,
  reducers: {
    add: (state: any, action) => {
      state.options = action.payload;
      // state = state.options.push(action.payload);
    },

    remove: (state: any, action) => {
      state = state.options.filter((mes) => (mes = action.payload));
    },
  },
});

// Action creators are generated for each case reducer function
export const { add, remove } = measurementSlice.actions;

export default measurementSlice.reducer;
