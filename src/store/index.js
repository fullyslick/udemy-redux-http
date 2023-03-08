
import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import cartSlice from "./cart-slice";

const cartReducer = cartSlice.reducer;

const uiSliceReducer = uiSlice.reducer;

const store = configureStore({
    reducer: { ui: uiSliceReducer, cart: cartReducer }
})


export default store;