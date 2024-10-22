import { useContext } from 'react';
import logo from '../assets/logo.jpg';
import Button from '../ui/Button';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserProgressContext';

function Header() {
  const { items } = useContext(CartContext);
  const { showCart } = useContext(UserContext);

  const totalItems = items.reduce((totalNumber, item) => {
    return totalNumber + item.quantity;
  }, 0);

  function handleShowCart() {
    showCart();
  }

  return (
    <header id='main-header'>
      <div id='title'>
        <img src={logo} alt='A restaurant' />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart ({totalItems})
        </Button>
      </nav>
    </header>
  );
}

export default Header;
