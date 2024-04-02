import { useState } from 'react';
import { get, post, put } from "../services/authService";
import { useCartContext } from '../context/cart.context';

function TicketCard({ title, description, amount, price, _id }) {
  const [counter, setCounter] = useState(0);
  const cartContext = useCartContext();

  const handleAddToCart = (e) => {
    const requestBody = { counter, _id, title };
    //cartContext.addTicket('/cart/update', requestBody)
    cartContext.addTicket(requestBody)
      .then((response) => {
        console.log('Added ticket to cart --->', requestBody)
        setCounter(0);
        console.log('cart context --->', cartContext);
      })
      .catch((error) => console.log('Add ticket to cart failed', error));
  };

    return (
      <div className="TicketCard card">
        <h3>{title}</h3>
        <h4>Description:</h4>
        <p>{description}</p>
        <h4>Amount:</h4>
        <p>{amount}</p>
        <h4>Price:</h4>
        <p>{`$ ${price}`}</p>
        <button onClick={() => {if (counter > 0) setCounter(counter - 1)}}>-</button>
          <strong>{counter}</strong>
        <button onClick={() => {if (counter < amount && counter < 8) setCounter(counter + 1)}}>+</button>  
        <button disabled={counter === 0 ? true : false} onClick={handleAddToCart}>Add to cart</button>  
      </div>
    );
  }
  
  export default TicketCard;
  
  