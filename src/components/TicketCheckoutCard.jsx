import { useState, useContext, useEffect } from "react";
import { get, post, put } from "../services/authService";
import { CartContext } from "../context/cart.context";

function TicketCheckoutCard({ quantity, ticket }) {
  //   const [total, setTotal] = useState(0);
  const { cart, addTicket, removeTicket } = useContext(CartContext);

  //   console.log('ticket card --->', quantity, ticket)

  // console.log('cart ---->', cart.tickets)
  // useEffect(() => {
  //     const newTotal = cart.tickets.reduce((acc, ticket) => {
  //     //   console.log('ticket quantity and price--->', ticket.quantity, ticket.ticket.price);
  //       return acc + (ticket.quantity * ticket.ticket.price);
  //     }, 0);

  //     setTotal(newTotal);
  //   }, [cart.tickets]);

  //   console.log('total --->', total)

  return (
    <tr className="text-white bg-gray-900 ">
      <td className="p-4">{ticket && ticket.title}</td>
      <td className="p-4 text-center">{quantity}</td>
      <td className="p-4 text-right">
        {ticket && new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(ticket.price)}
      </td>
      <td className="p-4 text-right">
        {ticket && new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(ticket.price * quantity)}
      </td>

      <td className="p-4 text-center">
        <button
          onClick={() => removeTicket(ticket)}
          className="bg-[#25484E] hover:bg-[#54AC8E] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          aria-label="Remove ticket from cart"
        >
          Remove
        </button>
      </td>
    </tr>
  );
}

export default TicketCheckoutCard;
