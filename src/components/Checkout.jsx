import { useContext } from 'react';
import Modal from '../ui/Modal';
import { CartContext } from '../context/CartContext';
import { currencyFormatter } from '../utils/formatting';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { UserContext } from '../context/UserProgressContext';
import useHttp from '../hooks/useHttp';
import Error from './Error';

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

function Checkout() {
  const cartCtx = useContext(CartContext);
  const { userProgress, hideCheckout } = useContext(UserContext);

  const { data, isLoading, error, sendRequest, clearData } = useHttp(
    'http://localhost:3000/orders',
    requestConfig
  );

  const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity + item.price;
  }, 0);

  function handleFinish() {
    hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const entries = Object.fromEntries(formData.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: entries,
        },
      })
    );
  }

  if (data && !error) {
    return (
      <Modal open={userProgress === 'checkout'} onClose={handleFinish}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get to you with more details via email within the next few
          minutes.
        </p>
        <p className='modal-actions'>
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgress === 'checkout'} onClose={hideCheckout}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label='Full name' type='text' id='name' />
        <Input label='E-Mail Address' type='email' id='email' />
        <Input label='Street' type='text' id='street' />
        <div className='control-row'>
          <Input label='Postal Code' type='text' id='postal-code' />
          <Input label='City' type='text' id='city' />
        </div>

        {error && <Error title='Failed to submit order!' message={error} />}

        <p className='modal-actions'>
          {isLoading ? (
            <span>Sending order data...</span>
          ) : (
            <>
              <Button type='button' textOnly onClick={hideCheckout}>
                Close
              </Button>
              <Button>Submit Order</Button>{' '}
            </>
          )}
        </p>
      </form>
    </Modal>
  );
}

export default Checkout;
