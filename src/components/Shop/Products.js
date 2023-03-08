import ProductItem from './ProductItem';
import classes from './Products.module.css';


const DUMMY_PRODUCTS = [
  {
    id: 'fds12',
    title: 'Pencil',
    price: 1.90,
    description: 'A simple pencil'
  },
  {
    id: 'fds1542',
    title: 'Chair',
    price: 18.90,
    description: 'Standard char'
  },
]

const Products = (props) => {

  const productItems = DUMMY_PRODUCTS.map(product => (
    <ProductItem
      key={product.id}
      id={product.id}
      title={product.title}
      price={product.price}
      description={product.description}
    />
  ));
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {productItems}
      </ul>
    </section>
  );
};

export default Products;
