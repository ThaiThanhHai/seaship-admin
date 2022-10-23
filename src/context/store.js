import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./orders/orderSlice";

export default configureStore({
  reducer: {
    orders: orderReducer,
  },
});
