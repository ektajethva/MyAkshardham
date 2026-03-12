import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Plus, Pencil, Trash2, ImageIcon } from "lucide-react";
// import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  stock: "",
  image_url: "",
};

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load products");
      return;
    }

    setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setDialogOpen(true);
  };

  const openEdit = (p) => {
    setForm({
      name: p.name,
      description: p.description || "",
      price: String(p.price),
      stock: String(p.stock),
      image_url: p.image_url || "",
    });

    setEditingId(p.id);
    setDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price) {
      toast.error("Name and price are required");
      return;
    }

    setSubmitting(true);

    const payload = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      stock: parseInt(form.stock || "0"),
      image_url: form.image_url,
    };

    if (editingId) {
      const { error } = await supabase
        .from("products")
        .update(payload)
        .eq("id", editingId);

      if (error) {
        toast.error("Failed to update product");
        setSubmitting(false);
        return;
      }

      toast.success("Product updated");
    } else {
      const { error } = await supabase
        .from("products")
        .insert(payload);

      if (error) {
        toast.error("Failed to add product");
        setSubmitting(false);
        return;
      }

      toast.success("Product added");
    }

    setDialogOpen(false);
    setSubmitting(false);
    fetchProducts();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete");
      return;
    }

    toast.success("Product deleted");
    fetchProducts();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Manage Products
        </h1>

        <Button size="sm" onClick={openAdd}>
          <Plus className="h-4 w-4 mr-1" /> Add Product
        </Button>
      </div>

      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">
                Description
              </TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  No products yet. Add one!
                </TableCell>
              </TableRow>
            ) : (
              products.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    {p.image_url ? (
                      <img
                        src={p.image_url}
                        alt={p.name}
                        className="h-12 w-12 rounded-lg object-cover border border-border"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                        <ImageIcon className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                  </TableCell>

                  <TableCell className="font-semibold text-foreground">
                    {p.name}
                  </TableCell>

                  <TableCell className="hidden md:table-cell text-muted-foreground text-sm max-w-[200px] truncate">
                    {p.description || "—"}
                  </TableCell>

                  <TableCell className="text-primary font-medium">
                    ₹{p.price}
                  </TableCell>

                  <TableCell>
                    <span
                      className={`text-sm font-medium ${
                        p.stock > 0
                          ? "text-green-600"
                          : "text-destructive"
                      }`}
                    >
                      {p.stock > 0 ? p.stock : "Out of stock"}
                    </span>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEdit(p)}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive"
                        onClick={() => handleDelete(p.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Name *</Label>
              <Input
                className="mt-1"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                placeholder="Product name"
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                className="mt-1"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Price (₹) *</Label>
                <Input
                  type="number"
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Stock</Label>
                <Input
                  type="number"
                  value={form.stock}
                  onChange={(e) =>
                    setForm({ ...form, stock: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <Label>Image URL</Label>
              <Input
                value={form.image_url}
                onChange={(e) =>
                  setForm({ ...form, image_url: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={submitting}>
                {submitting
                  ? "Saving..."
                  : editingId
                  ? "Update"
                  : "Add Product"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}