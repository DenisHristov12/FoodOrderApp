import { useContext } from 'react';
import Modal from '../ui/Modal';
import { CartContext } from '../context/CartContext';
import { currencyFormatter } from '../utils/formatting';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { UserContext } from '../context/UserProgressContext';

function Checkout() {
  const cartCtx = useContext(CartContext);
  const { userProgress, hideCheckout } = useContext(UserContext);

  const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity + item.price;
  }, 0);

  return (
    <Modal open={userProgress === 'checkout'} onClose={hideCheckout}>
      <form>
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label='Full name' type='text' id='full-name' />
        <Input label='E-Mail Address' type='email' id='email' />
        <Input label='Street' type='text' id='street' />
        <div className='control-row'>
          <Input label='Postal Code' type='text' id='postal-code' />
          <Input label='City' type='text' id='city' />
        </div>

        <p className='modal-actions'>
          <Button type='button' textOnly onClick={hideCheckout}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}

export default Checkout;
