import { Fragment } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';

// Flag used to detect when component loads for the first time.
// It will not be used for re-mounting, or updating, only when the first time this file is parsed
let isInitialLoad = true;

function App() {
  const showCart = useSelector(state => state.ui.cartIsVisible);

  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);

  const dispatch = useDispatch();

  useEffect(() => {
    // This prevents sending data to server on initial app load
    if (isInitialLoad) {
      isInitialLoad = false
      return;
    }

    /*
      * Send data to server
      * ASYNC CALLS SHOULD NOT BE DONE INSIDE REDUX
      * Here we subscribe to redux state update,
      * once updated, the redux state data is send to server
    */
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
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
