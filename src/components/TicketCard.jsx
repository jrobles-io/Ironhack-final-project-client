import { useState } from 'react';

function TicketCard({ title, description, amount, price }) {
  const [counter, setCounter] = useState(0);

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
        <button disabled={counter === 0 ? true : false}>Add to cart</button>  
      </div>
    );
  }
  
  export default TicketCard;
  
  