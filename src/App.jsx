import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Header from './components/Header';
import Meals from './components/Meals';
import CartContextProvider from './context/CartContext';
import UserProgressContext from './context/UserProgressContext';

function App() {
  return (
    <UserProgressContext>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressContext>
  );
}

export default App;
