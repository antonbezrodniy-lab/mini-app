import { useMemo, useState } from "react";

const logo = "/web-logo.jpg";

const menu = [
  {
    id: 1,
    name: "SUSHI BURGER",
    desc: "Frischer Lachs, Avocado und Spezialsoße",
    price: 12,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1200",
    category: "Burger",
  },
  {
    id: 2,
    name: "SUSHI BOX",
    desc: "24 frische Sushi Mix",
    price: 18,
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1200",
    category: "Boxen",
  },
  {
    id: 3,
    name: "INSIDE OUT ROLLS",
    desc: "Crunchy Rolls mit Frischkäse",
    price: 11,
    image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?q=80&w=1200",
    category: "Rolls",
  },
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("Alle");

  const add = (item) => {
    setCart((prev) => {
      const exist = prev.find((c) => c.id === item.id);

      if (exist) {
        if (exist.qty >= 5) return prev;
        return prev.map((c) =>
          c.id === item.id ? { ...c, qty: c.qty + 1 } : c
        );
      }

      return [...prev, { ...item, qty: 1 }];
    });
  };

  const filtered =
    category === "Alle"
      ? menu
      : menu.filter((i) => i.category === category);

  const totalQty = useMemo(
    () => cart.reduce((s, i) => s + i.qty, 0),
    [cart]
  );

  const total = useMemo(
    () => cart.reduce((s, i) => s + i.qty * i.price, 0),
    [cart]
  );

  const payNow = async () => {
  try {
    const res = await fetch(
      "https://repository-name-sushi-backend-public-4.onrender.com/create-checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart,
          total,
          address: "Test Address",
          phone: "Test Phone",
        }),
      }
    );

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("NO URL FROM SERVER");
    }
  } catch (err) {
    console.log(err);
    alert("FETCH ERROR");
  }
};
      );

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("NO URL FROM SERVER");
      }
    } catch (err) {
      console.log(err);
      alert("FETCH ERROR");
    }
  };

  return (
    <div className="app">
      <div className="header">

        {/* 🍣 LOGO (FIXED CENTER + SIZE) */}
        <img
          src={logo}
          alt="logo"
          style={{
            height: "60px",
            width: "auto",
            objectFit: "contain",
            display: "block",
            margin: "0 auto",
          }}
        />

        <div className="categories">
          <button onClick={() => setCategory("Alle")}>Alle</button>
          <button onClick={() => setCategory("Burger")}>Burger</button>
          <button onClick={() => setCategory("Boxen")}>Boxen</button>
          <button onClick={() => setCategory("Rolls")}>Rolls</button>
        </div>
      </div>

      <div className="menu">
        {filtered.map((i) => (
          <div key={i.id} className="card">
            <img src={i.image} alt="" />
            <div className="card-body">
              <h3>{i.name}</h3>
              <p>{i.desc}</p>
              <b>{i.price}€</b>
              <button onClick={() => add(i)}>+ Add</button>
            </div>
          </div>
        ))}
      </div>

      {totalQty > 0 && (
        <div className="cartBar">
          <div>🛒 {totalQty} | {total}€</div>

          <button onClick={payNow}>
            💳 PAY NOW
          </button>
        </div>
      )}
    </div>
  );
}