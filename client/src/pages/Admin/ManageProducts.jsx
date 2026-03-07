import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2 } from "lucide-react";

const products = [
  { id: 1, name: "Tulsi Mala", price: 250 },
  { id: 2, name: "Bhagavad Gita", price: 350 },
  { id: 3, name: "Brass Diya Set", price: 499 },
  { id: 4, name: "Marble Murti", price: 1500 },
];

export default function ManageProducts() {

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Manage Products
        </h1>

        <Button size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add Product
        </Button>
      </div>

      {/* Add product form */}
      <div className="bg-card rounded-xl shadow-card p-5 mb-6">
        <h2 className="font-semibold text-foreground mb-4">
          Add New Product
        </h2>

        <form
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          onSubmit={handleSubmit}
        >
          <div>
            <Label>Name</Label>
            <Input placeholder="Product name" className="mt-1" />
          </div>

          <div>
            <Label>Price (₹)</Label>
            <Input type="number" placeholder="100" className="mt-1" />
          </div>

          <div className="flex items-end">
            <Button className="w-full">Add Product</Button>
          </div>
        </form>
      </div>

      {/* Products list */}
      <div className="bg-card rounded-xl shadow-card divide-y divide-border">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-4"
          >
            <div>
              <p className="font-semibold text-foreground">
                {product.name}
              </p>
              <p className="text-sm text-primary font-medium">
                ₹{product.price}
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Pencil className="h-3.5 w-3.5" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}