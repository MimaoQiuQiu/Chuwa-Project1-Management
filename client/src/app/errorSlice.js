import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  message: null,
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    addError: (state, action) => {
      state.message = action.payload;
    },
    removeError: (state, action) => {
      state.message = null;
    },
  },
});

export const { addError, removeError } = errorSlice.actions;

export default errorSlice.reducer;
