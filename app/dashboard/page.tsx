"use client";

import { useEffect, useState } from "react";
import Charts from "@/components/Charts";
import ProductForm from "@/components/ProductForm";
import AddAdmin from "@/components/AddAdmin";

export default function Dashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    setLoading(true);
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function deleteProduct(id: string) {
    await fetch("/api/products", {
      method: "DELETE",
      body: JSON.stringify({ id })
    });
    loadProducts();
  }

  function logout() {
    window.location.href = "/";
  }

  const totalValue = products.reduce(
    (sum, p) => sum + p.units * p.mrp,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Inventory Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Product management & analytics
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-md shadow"
        >
          Logout
        </button>
      </div>

      {/* Total Inventory Card */}
      <div className="bg-white rounded-xl shadow p-6 mb-8 border border-rose-100">
        <p className="text-sm text-gray-500">
          Total Inventory Value
        </p>
        <p className="text-3xl font-bold text-rose-600 mt-1">
          ₹{totalValue}
        </p>
      </div>

      {/* Charts */}
      <Charts products={products} />

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow mt-10 overflow-x-auto border border-rose-100">
        <table className="w-full">
          <thead className="bg-rose-100 text-rose-800">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Units</th>
              <th className="p-3 text-left">MRP</th>
              <th className="p-3 text-left">Value</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="p-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center">
                  No products available
                </td>
              </tr>
            ) : (
              products.map(p => (
                <tr
                  key={p._id}
                  className="border-t hover:bg-rose-50 transition"
                >
                  <td className="p-3">
                    {p.imageUrl && (
                      <img
                        src={p.imageUrl}
                        className="h-12 w-12 rounded object-cover"
                      />
                    )}
                  </td>
                  <td className="p-3 font-medium">
                    {p.name}
                  </td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3">{p.units}</td>
                  <td className="p-3">₹{p.mrp}</td>
                  <td className="p-3 font-semibold">
                    ₹{p.units * p.mrp}
                  </td>
                  <td className="p-3 space-x-3">
                    <button
                      onClick={() => setSelected(p)}
                      className="text-indigo-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(p._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Product Form */}
      <div className="mt-10">
        <ProductForm
          selected={selected}
          onDone={() => {
            setSelected(null);
            loadProducts();
          }}
        />
      </div>

      {/* Admin Onboarding */}
      <div className="mt-12">
        <AddAdmin />
      </div>
    </div>
  );
}
