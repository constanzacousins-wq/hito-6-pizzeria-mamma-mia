
const CardPizza = ({
  name,
  price,
  ingredients,
  img,
  addToCart,
}) => {
  return (
    <div className="pizza-card">
      <img src={img} alt={name} />

      <div className="pizza-info">
        <h3>Pizza {name}</h3>

        <p>Ingredientes:</p>

        <ul className="ingredients">
          {ingredients.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>

        <h4>Precio: ${price.toLocaleString("es-CL")}</h4>

        <div className="card-buttons">
          <button>Ver Más 👀</button>

          <button onClick={addToCart}>
            Añadir 🛒
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPizza;
