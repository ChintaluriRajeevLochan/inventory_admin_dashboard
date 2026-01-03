"use client";

import { useEffect, useState } from "react";

export default function ProductForm({
  selected,
  onDone
}: {
  selected?: any;
  onDone: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    units: "",
    mrp: ""
  });

  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /* Fill form when editing */
  useEffect(() => {
    if (selected) {
      setForm({
        name: selected.name ?? "",
        category: selected.category ?? "",
        units: selected.units ?? "",
        mrp: selected.mrp ?? ""
      });
    }
  }, [selected]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    let imageUrl = selected?.imageUrl || "";

    /* Upload image to Cloudinary if selected */
    if (image) {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image })
      });

      if (!res.ok) {
        alert("Image upload failed");
        setLoading(false);
        return;
      }

      const data = await res.json();

      if (!data?.url) {
        alert("Invalid image upload response");
        setLoading(false);
        return;
      }

      imageUrl = data.url;
    }

    /* Save product */
    await fetch("/api/products", {
      method: selected ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        imageUrl,
        id: selected?._id,
        units: Number(form.units),
        mrp: Number(form.mrp)
      })
    });

    /* Reset */
    setForm({ name: "", category: "", units: "", mrp: "" });
    setImage(null);
    setLoading(false);
    onDone();
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-lg font-semibold mb-4">
        {selected ? "Edit Product" : "Add Product"}
      </h3>

      <form onSubmit={submit} className="grid grid-cols-2 gap-4">
        <input
          placeholder="Product Name"
          value={form.name}
          onChange={e =>
            setForm({ ...form, name: e.target.value })
          }
          className="border p-2 rounded"
          required
        />

        <input
          placeholder="Category"
          value={form.category}
          onChange={e =>
            setForm({ ...form, category: e.target.value })
          }
          className="border p-2 rounded"
          required
        />

        <input
          type="number"
          placeholder="Units"
          value={form.units}
          onChange={e =>
            setForm({ ...form, units: e.target.value })
          }
          className="border p-2 rounded"
          required
        />

        <input
          type="number"
          placeholder="MRP"
          value={form.mrp}
          onChange={e =>
            setForm({ ...form, mrp: e.target.value })
          }
          className="border p-2 rounded"
          required
        />

        {/* Image upload */}
        <input
          type="file"
          accept="image/*"
          onChange={e => {
            const file = e.target.files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onloadend = () => {
              setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
          }}
          className="col-span-2 border p-2 rounded"
        />

        {/* Image preview */}
        {(image || selected?.imageUrl) && (
          <img
            src={image || selected.imageUrl}
            alt="preview"
            className="col-span-2 h-32 object-cover rounded"
          />
        )}

        <button
          disabled={loading}
          className="col-span-2 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : selected
            ? "Update Product"
            : "Add Product"}
        </button>
      </form>
    </div>
  );
}
