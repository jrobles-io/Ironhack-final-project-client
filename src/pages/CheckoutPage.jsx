import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../context/cart.context";

import { get } from "../services/authService";
import AddTicket from "../components/AddTicket";
import TicketCheckoutCard from "../components/TicketCheckoutCard";

function CheckoutPage(props) {
  const { user } = useContext(AuthContext);
  const [total, setTotal] = useState(0);
  const [clearedCart, setClearedCart] = useState(null)
  const { cart, getCartData, setCart, removeTicket, addTicket, decreaseAmount } =
    useContext(CartContext);

  useEffect(() => {
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
    // get()
    //.then((response.data) => {
      // setClearedCart(response.data)
      // getCartData()
  //   })
   }

  return (
<div className="flex flex-col items-center bg-black min-h-screen p-10">
  <div className="w-full max-w-4xl mt-8">
    <table className="w-full text-sm text-gray-400">
      <thead className="text-xs uppercase bg-gray-800 text-gray-400">
        <tr>
          <th scope="col" className="py-3 px-6">
            Ticket Title
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
        <tr>
          <td colSpan="3" className="text-right font-bold">
            Total:
          </td>
          <td className="text-right">{`$ ${total}`}</td>
          <td></td> {/* Empty cell for the actions column */}
        </tr>
      </tfoot>
    </table>
  </div>
  {/* <Link to={`/`}> */}
    <button onClick={() => handleSubmit()}className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      Continue to checkout
    </button>
  {/* </Link> */}
</div>


  );
}

export default CheckoutPage;
