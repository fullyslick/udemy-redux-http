import { Fragment } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Notification from './components/UI/Notification';
import { sendCartData } from './store/cart-actions';

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

    dispatch(sendCartData(cart));
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
