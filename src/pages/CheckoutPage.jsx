import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../context/cart.context";

import { get } from "../services/authService";
import AddTicket from "../components/AddTicket";
import TicketCard from "../components/TicketCard";

function CheckoutPage(props) {
  // const [cart, setCart] = useState(null);
  const { user } = useContext(AuthContext);
  const { cart, getCartData, setCart, removeTicket, addTicket } = useContext(CartContext);

//   console.log('tickets ---->', cart.tickets[0].ticket)
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 justify-center">
        {cart &&
          cart.tickets.map((ticket) => (
            <TicketCard key={cart.tickets._id} {...ticket.ticket} />
          ))}
      </div>
    </div>
  );
}

export default CheckoutPage;
