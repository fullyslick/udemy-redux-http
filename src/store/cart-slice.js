import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
    items: [],
    totalQuantity: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;

            const foundItem = state.items.find(item => item.title === newItem.title);

            if (foundItem) {
                foundItem.qty++;
                foundItem.totalPrice = foundItem.totalPrice + newItem.price;
            } else {
                state.items.push({
                    id: newItem.id,
                    title: newItem.title,
                    qty: 1,
                    price: newItem.price,
                    totalPrice: newItem.price,                    
                });
            }

            state.totalQuantity++;
        },
        removeItem(state, action) {
            const id = action.payload;
            const foundItem = state.items.find(item => item.id === id);        

            if (foundItem) {
                if (foundItem.qty === 1) {
                    state.items = state.items.filter(item => item.id !== id);
                } else {
                    foundItem.qty--;
                    foundItem.totalPrice = foundItem.totalPrice - foundItem.price;
                }

                state.totalQuantity--;
            }
        }
    }
});

export const cartActions = cartSlice.actions;

export default cartSlice;