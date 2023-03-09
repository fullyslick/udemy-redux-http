import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

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

// Custom action that is used to make async calls and then update the reducer.
// This don't violate the NO ASYNC CALLS IN A REDUCER policy, because we do not make the async calls in the reducer
export const sendCartData = (cart) => {
    // when sendData is called like dispatch(sendData()), the returned function also has access to dispatch
    return (dispatch) => {

    const sendData = async () => {
        dispatch(uiActions.showNotification({
          status: 'pending',
          title: 'Pending',
          message: 'Sending data....'
        }));
  
        const response = await fetch('https://udemy-redux-advanced-db615-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
          method: 'PUT', // PUT request should overwrite existing server data
          body: JSON.stringify(cart)
        });
  
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
  
        dispatch(uiActions.showNotification({
          status: 'success',
          title: 'Success',
          message: 'Data has been sent to server'
        }));
      };
  
  
      sendData().catch(err => {
        dispatch(uiActions.showNotification({
          status: 'error',
          title: 'Error',
          message: err.message
        }));
      });
    }
};

export const cartActions = cartSlice.actions;

export default cartSlice;