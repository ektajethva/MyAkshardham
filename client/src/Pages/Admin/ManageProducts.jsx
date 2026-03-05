import { useState } from "react";
import "./ManageProducts.css";
import { Plus, Pencil, Trash2 } from "lucide-react";

const initialProducts = [
  { id: 1, name: "Tulsi Mala", price: 250 },
  { id: 2, name: "Bhagavad Gita", price: 350 },
  { id: 3, name: "Brass Diya Set", price: 499 },
  { id: 4, name: "Marble Murti", price: 1500 },
];

function ManageProducts() {

  const [products, setProducts] = useState(initialProducts);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleAddProduct = (e) => {
    e.preventDefault();

    if (!name || !price) return;

    const newProduct = {
      id: Date.now(),
      name,
      price,
    };

    setProducts([...products, newProduct]);

    setName("");
    setPrice("");
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="products-container">

      <div className="products-header">
        <h1>Manage Products</h1>

        <button className="add-btn">
          <Plus size={16}/> Add Product
        </button>
      </div>

      {/* Add Product Form */}

      <div className="product-form-card">

        <h2>Add New Product</h2>

        <form className="product-form" onSubmit={handleAddProduct}>

          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              placeholder="Product name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Price (₹)</label>
            <input
              type="number"
              placeholder="100"
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-btn">
            Add Product
          </button>

        </form>

      </div>

      {/* Products List */}

      <div className="products-list">

        {products.map((p)=>(
          <div key={p.id} className="product-item">

            <div>
              <p className="product-name">{p.name}</p>
              <p className="product-price">₹{p.price}</p>
            </div>

            <div className="product-actions">

              <button className="edit-btn">
                <Pencil size={14}/>
              </button>

              <button
                className="delete-btn"
                onClick={()=>handleDelete(p.id)}
              >
                <Trash2 size={14}/>
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ManageProducts;