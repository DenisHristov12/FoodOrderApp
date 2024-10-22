import { useContext } from 'react';
import Modal from '../ui/Modal';
import { CartContext } from '../context/CartContext';
import { currencyFormatter } from '../utils/formatting';
import Button from '../ui/Button';
import { UserContext } from '../context/UserProgressContext';
import CartItem from './CartItem';

function Cart() {
  const { items } = useContext(CartContext);
  const { userProgress, hideCart, showCheckout } = useContext(UserContext);

  const cartTotal = items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity + item.price;
  }, 0);

  return (
    <Modal
      className='cart'
      open={userProgress === 'cart'}
      onClose={userProgress === 'cart' ? hideCart : null}>
      <h2>Your cart</h2>
      <ul>
        {items.map((item) => {
          return <CartItem key={item.id} item={item} />;
        })}
      </ul>
      <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
      <p className='modal-actions'>
        <Button textOnly onClick={hideCart}>
          Close
        </Button>
        {items.length > 0 && (
          <Button onClick={showCheckout}>Go to checkout</Button>
        )}
      </p>
    </Modal>
  );
}

export default Cart;
