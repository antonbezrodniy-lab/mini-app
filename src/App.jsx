import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [cart, setCart] = useState([]);
  const [step, setStep] = useState("menu");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  // LOAD CART
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // SAVE CART
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const add = (name, price) => {
    setCart(prev => [...prev, { name, price }]);
  };

  const total = cart.reduce((a, b) => a + b.price, 0);

  const checkout = async () => {
    if (!address || !phone) return alert("Заполни данные");

    await fetch("https://mini-app-zeta-rouge.vercel.app/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart, total, address, phone })
    });

    setCart([]);
    localStorage.removeItem("cart");
    setStep("done");
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>🍣 Sushi Wolt</h1>

      {step === "menu" && (
        <>
          <h2>Меню</h2>

          <button onClick={() => add("Филадельфия", 8)}>Филадельфия 8€</button><br />
          <button onClick={() => add("Калифорния", 7)}>Калифорния 7€</button><br />
          <button onClick={() => add("Спайси", 9)}>Спайси 9€</button>

          <hr />

          <h2>🛒 Корзина</h2>
          {cart.length === 0 ? <p>Пусто</p> : null}

          {cart.map((i, idx) => (
            <p key={idx}>{i.name} - {i.price}€</p>
          ))}

          <h3>💰 Total: {total}€</h3>

          {cart.length > 0 && (
            <button onClick={() => setStep("checkout")}>
              Оформить заказ
            </button>
          )}
        </>
      )}

      {step === "checkout" && (
        <>
          <h2>📦 Доставка</h2>

          <input
            placeholder="Адрес"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <br /><br />

          <input
            placeholder="Телефон"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br /><br />

          <button onClick={checkout}>
            Подтвердить заказ
          </button>
        </>
      )}

      {step === "done" && (
        <>
          <h2>✅ Заказ принят</h2>
          <button onClick={() => setStep("menu")}>
            Вернуться в меню
          </button>
        </>
      )}
    </div>
  );
}