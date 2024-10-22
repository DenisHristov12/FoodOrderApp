import Cart from './components/Cart';
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
      </CartContextProvider>
    </UserProgressContext>
  );
}

export default App;
