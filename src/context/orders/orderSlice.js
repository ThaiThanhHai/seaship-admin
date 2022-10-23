import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "orders",
  initialState: [],
  reducers: {
    addorderInfo: (state, action) => {
      const orderInfo = {
        info: action.payload,
      };

      state.push(orderInfo);
    },
    addOrderAddress: (state, action) => {
      const orderAddress = {
        address: action.payload,
      };

      state.push(orderAddress);
    },
  },
});

// this is for dispatch
export const { addorderInfo } = orderSlice.actions;
export const { addOrderAddress } = orderSlice.actions;

// this is for configureStore
export default orderSlice.reducer;
