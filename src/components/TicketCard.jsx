import { useState, useContext } from "react";
import { get, post, put } from "../services/authService";
import { CartContext } from "../context/cart.context";

function TicketCard({ title, description, amount, price, _id }) {
  const [counter, setCounter] = useState(0);
  const { cart, addTicket } = useContext(CartContext)

  const handleAddToCart = (e) => {
    const requestBody = { counter, _id };
    //put('/cart/update', requestBody)
        addTicket(requestBody)

        setCounter(0);
        console.log("cart context --->", cart);

  };

  return (
    <div className="bg-gray-900 shadow-md rounded-lg p-6 mb-4 text-white">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <h4 className="font-medium">Description:</h4>
      <p className="mb-2">{description}</p>

      {/* Inline Amount and Price */}
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium">Amount:</h4>
        <p>{amount}</p>
      </div>
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-medium">Price:</h4>
        <p>{`$ ${price}`}</p>
      </div>

      <div className="flex items-center space-x-2 mb-4">
        <button
          onClick={() => {
            if (counter > 0) setCounter(counter - 1);
          }}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
        >
          -
        </button>

        <strong>{counter}</strong>

        <button
          onClick={() => {
            if (counter < amount && counter < 8) setCounter(counter + 1);
          }}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline"
        >
          +
        </button>
      </div>

      <button
        disabled={counter === 0}
        onClick={handleAddToCart}
        className={`bg-[#25484E] ${counter !== 0 && "hover:bg-[#54AC8E]"} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50`}
      >
        Add to cart
      </button>
    </div>
  );
}

export default TicketCard;
