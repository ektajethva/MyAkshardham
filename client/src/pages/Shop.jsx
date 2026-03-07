import { ShoppingCart } from "lucide-react";
import { Button } from "../components/ui/button";

const products = [
  { id: 1, name: "Tulsi Mala", price: 250, image: "🪷" },
  { id: 2, name: "Bhagavad Gita", price: 350, image: "📖" },
  { id: 3, name: "Brass Diya Set", price: 499, image: "🪔" },
  { id: 4, name: "Marble Murti", price: 1500, image: "🙏" },
  { id: 5, name: "Puja Thali", price: 799, image: "🍂" },
  { id: 6, name: "Incense Sticks", price: 99, image: "🌸" },
];

export default function ShopPage() {
  return (
    <div className="container mx-auto px-4 py-8">

      <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
        Temple Shop
      </h1>

      <p className="text-muted-foreground mb-8">
        Sacred items for your daily worship
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-card rounded-xl shadow-card hover:shadow-card-hover transition-shadow p-5 text-center"
          >
            <div className="text-5xl mb-4">{product.image}</div>

            <h3 className="font-semibold text-foreground mb-1">
              {product.name}
            </h3>

            <p className="text-primary font-bold mb-4">
              ₹{product.price}
            </p>

            <Button size="sm" variant="outline" className="w-full">
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add to Cart
            </Button>

          </div>
        ))}
      </div>

    </div>
  );
}