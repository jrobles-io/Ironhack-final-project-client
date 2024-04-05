import { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/cart.context";
import Confetti from "react-confetti";

import { get } from "../services/authService";
import TicketCheckoutCard from "../components/TicketCheckoutCard";

function CheckoutPage() {
  const [total, setTotal] = useState(0);
  const [clearedCart, setClearedCart] = useState(null);
  const { cart, getCartData, removeTicket, decreaseAmount } =
    useContext(CartContext);

  useEffect(() => {
    getCartData();
  }, []);

  useEffect(() => {
    // Recalculate the total whenever the cart data changes
    const newTotal = cart
      ? cart.tickets.reduce((acc, ticket) => {
          return acc + ticket.quantity * ticket.ticket.price;
        }, 0)
      : 0;
    setTotal(newTotal);
  }, [cart]);

  //   console.log("total --->", total);
  const handleSubmit = () => {
    decreaseAmount();
    get("/cart/checkout")
      .then((response) => {
        setClearedCart(response.data);
        getCartData();
        console.log("clearedCart---->", response.data);
      })
      .catch((err) => {
        console.log(err);
        // response.json(err);
      });
  };

  return (
    <div className="flex flex-col items-center bg-black min-h-screen p-10">
      <div className="w-full max-w-4xl mt-8">
        <table className="w-full text-sm text-gray-400">
          {cart && (
            <thead className="text-xs uppercase bg-gray-800 text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Ticket
                </th>
                <th scope="col" className="py-3 px-6 text-center">
                  Quantity
                </th>
                <th scope="col" className="py-3 px-6 text-right">
                  Price
                </th>
                <th scope="col" className="py-3 px-6 text-right">
                  Total
                </th>
                <th scope="col" className="py-3 px-6 text-center">
                  Actions
                </th>
              </tr>
            </thead>
          )}
          <tbody>
            {cart &&
              cart.tickets.map((ticket) => (
                <TicketCheckoutCard
                  key={ticket._id}
                  quantity={ticket.quantity}
                  ticket={ticket.ticket}
                  removeTicket={removeTicket}
                />
              ))}
          </tbody>
          <tfoot className="text-white">
            {cart && (
              <tr>
                <td colSpan="3" className="text-right font-bold pr-6">
                  Total:
                </td>
                <td className="text-right font-bold">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(total)}
                </td>
              </tr>
            )}
          </tfoot>
        </table>
      </div>
      {cart && (
        <button
          onClick={() => handleSubmit()}
          className="mt-8 bg-[#25484E] hover:bg-[#54AC8E] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Complete Purchase
        </button>
      )}

      {clearedCart && (
        <>
          <Confetti width={window.innerWidth} height={window.innerHeight} />
          <div className="fixed inset-0 text-center bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl text-white max-w-md mx-auto">
              <h3 className="text-lg font-bold mb-4 text-center">
                Congratulations on your purchase!
              </h3>
              {clearedCart.tickets.map((ticket, index) => (
                <div key={index} className="mb-2 flex justify-between">
                  <span className="text-md whitespace-nowrap text-left">
                    {ticket.ticket.title}
                  </span>
                  <span className="text-md text-right">{`x${ticket.quantity}`}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CheckoutPage;
