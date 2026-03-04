import "./ShopPage.css";
import { ShoppingCart } from "lucide-react";

const products = [
  { id: 1, name: "Tulsi Mala", price: 250, image: "/images/tulsi.jpg" },
  { id: 2, name: "Bhagavad Gita", price: 350, image: "/images/gita.jpg" },
  { id: 3, name: "Brass Diya Set", price: 499, image: "/images/diya.jpg" },
  { id: 4, name: "Marble Murti", price: 1500, image: "/images/murti.jpg" },
  { id: 5, name: "Puja Thali", price: 799, image: "/images/thali.jpg" },
  { id: 6, name: "Incense Sticks", price: 99, image: "/images/sticks.jpg" },
];

function ShopPage() {

  const handleCart = (product) => {
    alert(`${product.name} added to cart ✅`);
  };

  return (
    <div className="shop-container">

      <h1 className="shop-title">Shop Here Now...</h1>
      <p className="shop-subtitle">
        Sacred items for your daily worship
      </p>

      <div className="shop-grid">

        {products.map((p) => (
          <div key={p.id} className="shop-card">

            <img
              src={p.image}
              alt={p.name}
              className="shop-image"
            />

            <h3 className="shop-name">{p.name}</h3>
            <p className="shop-price">₹{p.price}</p>

            <button
              className="shop-btn"
              onClick={() => handleCart(p)}
            >
              <ShoppingCart size={16} />
              Add to Cart
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ShopPage;