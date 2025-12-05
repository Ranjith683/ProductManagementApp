import { useState } from "react";
import { addProduct } from "../services/productService";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "Electronics",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.description || !form.price || !form.category) {
      alert("❌ All fields are required!");
      return;
    }

    if (form.price <= 0) {
      alert("❌ Price must be greater than 0!");
      return;
    }

    setLoading(true);
    try {
      // Convert price to number before sending
      const productData = {
        ...form,
        price: Number(form.price),
      };
      await addProduct(productData);
      alert("✅ Product added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("❌ Failed to add product. Please try again.");
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 py-12 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-10 animate-fade-in">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-3 animate-slide-up">
              Add New Product
            </h1>
            <p
              className="text-cyan-200 animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              Create a new product to your catalog
            </p>
          </div>

          {/* Form Card */}
          <div
            className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 overflow-hidden animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <form className="p-8 space-y-6" onSubmit={handleSubmit}>
              {/* Product Name */}
              <div>
                <label className="block text-sm font-semibold text-cyan-200 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-white/30 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition backdrop-blur"
                  placeholder="Enter product name..."
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-cyan-200 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-white/30 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition h-28 resize-none backdrop-blur"
                  placeholder="Describe your product..."
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-cyan-200 mb-2">
                  Price (₹)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-white/30 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition backdrop-blur"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-cyan-200 mb-2">
                  Category
                </label>
                <select
                  className="w-full px-4 py-3 border border-white/30 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition cursor-pointer backdrop-blur"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                >
                  <option className="bg-slate-900" value="Electronics">
                    Electronics
                  </option>
                  <option className="bg-slate-900" value="Fashion">
                    Fashion
                  </option>
                  <option className="bg-slate-900" value="Home">
                    Home & Garden
                  </option>
                  <option className="bg-slate-900" value="Sports">
                    Sports & Outdoors
                  </option>
                  <option className="bg-slate-900" value="Books">
                    Books
                  </option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-cyan-400 hover:to-blue-500 transition disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-500/50 hover:shadow-blue-400/70"
                >
                  {loading ? "Creating..." : "Create Product"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="flex-1 bg-white/20 text-white py-3 rounded-lg font-semibold hover:bg-white/30 transition border border-white/30"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
