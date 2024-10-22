import { useContext } from 'react';
import Button from '../ui/Button';
import { currencyFormatter } from '../utils/formatting';
import { CartContext } from '../context/CartContext';

function MealItem({ meal }) {
  const { addItem } = useContext(CartContext);

  function handleAddMealToCart() {
    addItem(meal);
  }

  return (
    <li className='meal-item'>
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className='meal-item-price'>
            {currencyFormatter.format(meal.price)}
          </p>
          <p className='meal-item-description'>{meal.description}</p>
        </div>
        <p className='meal-item-actions'>
          <Button onClick={handleAddMealToCart}>Add to cart</Button>
        </p>
      </article>
    </li>
  );
}

export default MealItem;
