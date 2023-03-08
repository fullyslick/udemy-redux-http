import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const showCart = useSelector(state => state.ui.cartIsVisible);

  const cart = useSelector(state => state.cart);
  /*
  * Send data to server
  * ASYNC CALLS SHOULD NOT BE DONE INSIDE REDUX
  * Here we subscribe to redux state update,
  * once updated, the redux state data is send to server
  */
  useEffect(() => {
    fetch('https://udemy-redux-advanced-db615-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
      method: 'PUT', // PUT request should overwrite existing server data
      body: JSON.stringify(cart)
    })
  }, [cart]);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
