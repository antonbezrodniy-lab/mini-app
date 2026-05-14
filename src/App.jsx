import { useState } from "react";
import "./App.css";

export default function App() {
  const [cart, setCart] = useState([]);

  const add = (name, price) => {
    setCart([...cart, { name, price }]);
  };

  const total = cart.reduce((a, b) => a + b.price, 0);

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>🍣 Sushi Mini App</h1>

      <h2>Меню</h2>

      <button onClick={() => add("Филадельфия", 8)}>Филадельфия - 8€</button>
      <br /><br />
      <button onClick={() => add("Калифорния", 7)}>Калифорния - 7€</button>
      <br /><br />
      <button onClick={() => add("Спайси", 9)}>Спайси - 9€</button>

      <hr />

      <h2>🛒 Корзина</h2>
      {cart.length === 0 ? (
        <p>Пусто</p>
      ) : (
        cart.map((i, index) => (
          <p key={index}>
            {i.name} - {i.price}€
          </p>
        ))
      )}

      <h3>💰 Total: {total}€</h3>
    </div>
  );
}