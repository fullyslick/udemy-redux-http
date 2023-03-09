import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const getCartData = () => {
    return async (dispatch) => {

        const fetchData = async () => {
            const response = await fetch('https://udemy-redux-advanced-db615-default-rtdb.europe-west1.firebasedatabase.app/cart.json');

            if(!response.ok) {
                throw new Error('Fetching data failed');
            }

            const responseData = await response.json();

            return responseData;        
        }
        
        try {
           const cartData = await fetchData();
        
           dispatch(cartActions.replaceCart({
            items: cartData.items || [], // Solves issue when cart is empty after all items are removed
            totalQuantity: cartData.totalQuantity
           }));

        } catch (err) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error',
                message: err.message
              }));
        }
    }
}
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