"use client";

import { useEffect, useState, useContext, createContext } from "react";
import { get, post, put } from "../services/authService";
import { AuthContext } from "./auth.context"

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const { user } = useContext(AuthContext); 
//   const router = useRouter();

  const updateCartDB = async () => {
    try {
      await put(`/cart/update`, cart);
    } catch (error) {
      console.log(error);
    }
  };

  const addTicket = (ticket) => {
    if (!user) return router.push("/auth/login");
    console.log('ticket --->', ticket);
    cart
      ? cart.tickets.find((element) => element._id === ticket._id)
        ? increaseQuantity(ticket)
        : setCart((prev) => ({
            ...prev,
            tickets: [...prev.tickets, { ...ticket, quantity: 1 }],
          }))
      : setCart([{ ...ticket, quantity: 1 }]);
  };

  const removeTicket = (ticket) => {
    setCart((prev) => ({
      ...prev,
      tickets: prev.tickets.filter((element) => element._id !== ticket._id),
    }));
  };

  const increaseQuantity = (ticket) => {
    setCart((prev) => ({
      ...prev,
      tickets: prev.tickets.map((element) => {
        return element._id === ticket._id
          ? { ...element, quantity: (element.quantity += 1) }
          : element;
      }),
    }));
  };

  const decreaseQuantity = (ticket) => {
    const ticketToDecrease = cart.tickets.find((element) => element._id === ticket._id);
    ticketToDecrease && ticketToDecrease.quantity === 1
      ? removeTicket(ticket)
      : setCart((prev) => ({
          ...prev,
          tickets: prev.tickets.map((element) => {
            if (element._id === ticket._id) element.quantity -= 1;
            return element;
          }),
        }));
  };

  useEffect(() => {
    async function fetchUserCart() {
      try {
        const response = await get(`/cart`);
        if (!response.data) {
          setCart(null);
          return;
        }
        setCart(response.data);
        return;
      } catch (error) {
        console.log(error);
      }
    }
    user && fetchUserCart();
  }, [user]);

  useEffect(() => {
    console.log(cart);
    cart && updateCartDB();
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        removeTicket,
        increaseQuantity,
        decreaseQuantity,
        addTicket,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("context must be used inside a provider");
  }
  return context;
}