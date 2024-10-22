import { createContext, useState } from 'react';

export const UserContext = createContext();

function UserProgressContext({ children }) {
  const [userProgress, setUserProgress] = useState('');

  function showCart() {
    setUserProgress('cart');
  }

  function hideCart() {
    setUserProgress('');
  }

  function showCheckout() {
    setUserProgress('checkout');
  }

  function hideCheckout() {
    setUserProgress('');
  }

  return (
    <UserContext.Provider
      value={{ userProgress, showCart, hideCart, showCheckout, hideCheckout }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProgressContext;
