import { Button } from "../components/ui/button";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useEffect, useState } from "react";
import axios from "axios";

// const products = [
//   { id: 1, name: "Tulsi Mala", price: 250, image: "🪷" },
//   { id: 2, name: "Bhagavad Gita", price: 350, image: "📖" },
//   { id: 3, name: "Brass Diya Set", price: 499, image: "🪔" },
//   { id: 4, name: "Marble Murti", price: 1500, image: "🙏" },
//   { id: 5, name: "Puja Thali", price: 799, image: "🍂" },
//   { id: 6, name: "Incense Sticks", price: 99, image: "🌸" },
// ];

export default function ShopPage() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [addedId, setAddedId] = useState(null);

  const fetchProducts = async () => {
    try{
      const res = await axios.get("http://localhost:5000/Product/getPro");
      setProducts(res.data)
    }catch{
      console.log("Failed to load Product ",error);
    }
  }

  useEffect(() => {
   fetchProducts();
  }, [])
  

  const handleAdd = (p) => {
   const product = {
    id: p.product_id,
    name: p.product_name,
    price: p.price,
    image: p.image
  };

  addToCart(product);

  setAddedId(p.product_id);
  setTimeout(() => setAddedId(null), 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
        Temple Shop
      </h1>
      <p className="text-muted-foreground mb-8">
        Sacred items for your daily worship
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {products.map((p) => (
          <div
            key={p.product_id}
            className="bg-card rounded-xl shadow-card hover:shadow-card-hover transition-shadow p-5 text-center"
          >
            {/* <div className="text-5xl mb-4">{p.image}</div> */}
             <img
              src={p.image}
              alt={p.product_name}
              className="h-24 w-24 mx-auto object-cover rounded-lg mb-4"
            />

            <h3 className="font-semibold text-foreground mb-1">{p.product_name}</h3>

            <p className="text-sm text-muted-foreground mb-2">
              {p.description}
            </p>

            <p className="text-primary font-bold mb-4">₹{p.price}</p>

            <Button
              size="sm"
              variant={addedId === p.product_id ? "default" : "outline"}
              className="w-full"
              onClick={() => handleAdd(p)}
            >
              {addedId === p.product_id ? (
                <>
                  <Check className="h-4 w-4 mr-1" /> Added
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4 mr-1" /> Add to Cart
                </>
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}