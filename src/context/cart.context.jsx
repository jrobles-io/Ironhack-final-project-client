"use client";

import { useEffect, useState, useContext, createContext } from "react";
import { get, post, put } from "../services/authService";
import { AuthContext } from "./auth.context"



const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const { user } = useContext(AuthContext); 
//   const router = useRouter();

const getCartData = () => {
  get('/cart')
  .then((cart) => {
    console.log("Cart ===>", cart.data)
    setCart(cart.data);
  })
  .catch ((error) => {
    console.log(error);
  })
}

  const addTicket = (ticket) => {
    // if (!user) return router.push("/auth/login");
    console.log('ticket --->', ticket);
    // console.log('cart ----->', cart[0])
    !cart
      ? 
      post('/cart', ticket)
      .then((cart) => {
        console.log('cart 2 --->', cart.data)
        setCart(cart.data);
      })
      .catch((err) => {
        console.log(err)
      })
        : put('/cart/update', ticket)
        .then((cart) => {
          console.log('cart 3 --->', cart.data)
          setCart(cart.data);
        })
        .catch((err) => {
          console.log(err)
        })
  };

  const removeTicket = (ticket) => {
    let thisCart = {...cart}
    // let thisCart = {...cart._doc}
    thisCart.tickets = cart.tickets.filter((element) => element._id !== ticket._id)
    console.log("This cart after removing", )
    setCart(thisCart);
    put('/cart/update/tickets', thisCart)
      .then((response) => {
        console.log("This is the new cart", response.data)
        getCartData()
      })
      .catch((err) => {
        console.log(err)
      })
      
  };

  // const increaseQuantity = (ticket) => {
  //   setCart((prev) => ({
  //     ...prev,
  //     tickets: prev.tickets.map((element) => {
  //       return element._id === ticket._id
  //         ? { ...element, quantity: (element.quantity += 1) }
  //         : element;
  //     }),
  //   }));
  // };

  // const decreaseQuantity = (ticket) => {
  //   const ticketToDecrease = cart.tickets.find((element) => element._id === ticket._id);
  //   ticketToDecrease && ticketToDecrease.quantity === 1
  //     ? removeTicket(ticket)
  //     : setCart((prev) => ({
  //         ...prev,
  //         tickets: prev.tickets.map((element) => {
  //           if (element._id === ticket._id) element.quantity -= 1;
  //           return element;
  //         }),
  //       }));
  // };



  useEffect(() => () => {
    getCartData()
}, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        removeTicket,
        // increaseQuantity,
        // decreaseQuantity,
        addTicket,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider }
