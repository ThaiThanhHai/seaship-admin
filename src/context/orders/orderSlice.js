import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "orders",
  initialState: [],
  reducers: {
    addOrder: (state, action) => {
      state.push(action.payload);
    },
  },
});

// this is for dispatch
export const { addOrder } = orderSlice.actions;

// this is for configureStore
export default orderSlice.reducer;
