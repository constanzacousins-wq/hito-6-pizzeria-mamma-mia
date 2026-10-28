
import { createContext, useState } from "react";

// Creamos el contexto del carrito
export const CartContext = createContext();

// Creamos el proveedor del contexto
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Agregar una pizza al carrito
  const addToCart = (pizza) => {
    setCart((prevCart) => {
      const existe = prevCart.find((item) => item.id === pizza.id);

      if (existe) {
        return prevCart.map((item) =>
          item.id === pizza.id
            ? { ...item, count: item.count + 1 }
            : item
        );
      }

      return [...prevCart, { ...pizza, count: 1 }];
    });
  };

  // Quitar una unidad de pizza
  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? { ...item, count: item.count - 1 }
            : item
        )
        .filter((item) => item.count > 0)
    );
  };

  // Calcular el total de la compra
  const total = cart.reduce(
    (acumulador, pizza) =>
      acumulador + pizza.price * pizza.count,
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
