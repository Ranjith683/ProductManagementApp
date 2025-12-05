import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../services/productService";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getProducts(search, sort);
      setProducts(res.data || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [search, sort]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-3 animate-slide-up">
              Product Catalog
            </h1>
            <p
              className="text-cyan-200 text-lg animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              Browse and manage all your products
            </p>
          </div>

          {/* Search & Filter Section */}
          <div
            className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-8 border border-white/20 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1 md:col-span-2">
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-white/30 rounded-lg bg-white/10 text-black placeholder-white-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition backdrop-blur"
                  placeholder="🔍 Search products..."
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
              </div>

              <select
                className="px-4 py-3 border border-white/30 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition cursor-pointer backdrop-blur"
                onChange={(e) => setSort(e.target.value)}
                value={sort}
              >
                <option className="bg-slate-900" value="">
                  Sort by Price
                </option>
                <option className="bg-slate-900" value="asc">
                  Low to High
                </option>
                <option className="bg-slate-900" value="desc">
                  High to Low
                </option>
              </select>
            </div>
          </div>

          {/* Products Section */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-indigo-600"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📭</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                No products found
              </h2>
              <p className="text-gray-600 mb-6">
                Start by adding your first product
              </p>
              <Link
                to="/add"
                className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
              >
                Create Product
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <div
                  key={product._id}
                  style={{
                    animation: `slideInUp 0.5s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <ProductCard
                    product={product}
                    onDelete={async () => {
                      await deleteProduct(product._id);
                      fetchData();
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
