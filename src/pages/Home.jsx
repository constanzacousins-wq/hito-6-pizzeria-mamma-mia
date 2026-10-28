
import { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import CardPizza from "../components/CardPizza";
import { pizzas as pizzasLocales } from "../pizzas";
import { CartContext } from "../context/CartContext";

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const obtenerPizzas = async () => {
      try {
        const respuesta = await fetch(
          "https://hito-4-pizzeria-api.onrender.com/api/pizzas"
        );

        if (!respuesta.ok) {
          throw new Error("Error al cargar las pizzas");
        }

        const datos = await respuesta.json();

        const pizzasConImagen = datos.map((pizza) => {
          const pizzaLocal = pizzasLocales.find(
            (item) => item.id.toLowerCase() === pizza.id.toLowerCase()
          );

          return {
            ...pizza,
            img: pizzaLocal?.img || pizza.img,
          };
        });

        setPizzas(pizzasConImagen);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerPizzas();
  }, []);

  return (
    <>
      <Header />

      <div className="pizza-container">
        {pizzas.map((pizza) => (
          <CardPizza
            key={pizza.id}
            id={pizza.id}
            name={pizza.name}
            price={pizza.price}
            ingredients={pizza.ingredients}
            img={pizza.img}
            addToCart={() => addToCart(pizza)}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
