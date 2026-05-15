import { useEffect, useState } from "react";
import "./App.css";

const menu = [
  {
    id: 1,
    name: "SUSHI BURGER",
    price: 12,
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d"
  },
  {
    id: 2,
    name: "SUSHI BOXEN",
    price: 18,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c"
  },
  {
    id: 3,
    name: "INSIDE OUT ROLLS",
    price: 11,
    image: "https://images.unsplash.com/photo-1617196039897-7b0c0d1b63d5"
  },
  {
    id: 4,
    name: "BOSS ROLLS",
    price: 14,
    image: "https://images.unsplash.com/photo-1607301405390-d831c242f59b"
  },
  {
    id: 5,
    name: "BAKED ROLLS",
    price: 13,
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754"
  },
  {
    id: 6,
    name: "MEGA MAKI",
    price: 10,
    image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252"
  },
  {
    id: 7,
    name: "VEGAN BOSS MENÜ",
    price: 15,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
  },
  {
    id: 8,
    name: "NIGIRI",
    price: 9,
    image: "https://images.unsplash.com/photo-1582450871972-ab5ca7d2b59d"
  },
  {
    id: 9,
    name: "GUNKAN",
    price: 9,
    image: "https://images.unsplash.com/photo-1615361200141-f45040f367be"
  },
  {
    id: 10,
    name: "MAKI",
    price: 7,
    image: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234"
  },
  {
    id: 11,
    name: "FRIED MAKI",
    price: 11,
    image: "https://images.unsplash.com/photo-1583623025817-d180a2221d0a"
  },
  {
    id: 12,
    name: "FRIED ROLLS",
    price: 12,
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754"
  },
  {
    id: 13,
    name: "SALATE",
    price: 6,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
  },
  {
    id: 14,
    name: "VORSPEISEN",
    price: 8,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947"
  },
  {
    id: 15,
    name: "POKE BOWLS",
    price: 14,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
  },
  {
    id: 16,
    name: "BAO BUNS",
    price: 10,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"
  },
  {
    id: 17,
    name: "DESSERTS",
    price: 6,
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b"
  },
  {
    id: 18,
    name: "EXTRAS",
    price: 3,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591"
  },
  {
    id: 19,
    name: "GETRÄNKE",
    price: 4,
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e"
  }
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("menu");

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index) => {
    const copy = [...cart];
    copy.splice(index, 1);
    setCart(copy);
  };

  const total = cart.reduce((a, b) => a + b.price, 0);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        paddingBottom: 100,
        fontFamily: "sans-serif"
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background: "white",
          padding: 20,
          fontSize: 28,
          fontWeight: "bold",
          position: "sticky",
          top: 0,
          zIndex: 10
        }}
      >
        🍣 Sushi Wolt
      </div>

      {/* MENU */}
      {page === "menu" && (
        <div style={{ padding: 20 }}>
          {menu.map((item) => (
            <div
              key={item.id}
              style={{
                background: "white",
                borderRadius: 20,
                marginBottom: 20,
                overflow: "hidden",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100%",
                  height: 220,
                  objectFit: "cover"
                }}
              />

              <div style={{ padding: 15 }}>
                <h2>{item.name}</h2>

                <p style={{ fontSize: 18 }}>
                  💰 {item.price}€
                </p>

                <button
                  onClick={() => addToCart(item)}
                  style={{
                    width: "100%",
                    padding: 14,
                    background: "black",
                    color: "white",
                    border: "none",
                    borderRadius: 12,
                    fontSize: 16
                  }}
                >
                  Добавить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CART */}
      {page === "cart" && (
        <div style={{ padding: 20 }}>
          <h1>🛒 Корзина</h1>

          {cart.length === 0 && <p>Корзина пустая</p>}

          {cart.map((item, index) => (
            <div
              key={index}
              style={{
                background: "white",
                padding: 15,
                borderRadius: 15,
                marginBottom: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div>
                <strong>{item.name}</strong>
                <p>{item.price}€</p>
              </div>

              <button
                onClick={() => removeFromCart(index)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: 10,
                  padding: "8px 12px"
                }}
              >
                X
              </button>
            </div>
          ))}

          <h2>💰 Total: {total}€</h2>

          {cart.length > 0 && (
            <button
              style={{
                width: "100%",
                padding: 16,
                background: "#00c853",
                color: "white",
                border: "none",
                borderRadius: 15,
                fontSize: 18
              }}
            >
              Оформить заказ
            </button>
          )}
        </div>
      )}

      {/* BOTTOM NAVIGATION */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "white",
          display: "flex",
          justifyContent: "space-around",
          padding: 15,
          borderTop: "1px solid #ddd"
        }}
      >
        <button
          onClick={() => setPage("menu")}
          style={{
            background: "none",
            border: "none",
            fontSize: 18
          }}
        >
          🍣 Меню
        </button>

        <button
          onClick={() => setPage("cart")}
          style={{
            background: "none",
            border: "none",
            fontSize: 18
          }}
        >
          🛒 Корзина ({cart.length})
        </button>
      </div>
    </div>
  );
}