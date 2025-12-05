import { Link } from "react-router-dom";

export default function ProductCard({ product, onDelete }) {
  const categoryIcons = {
    Electronics: "💻",
    Fashion: "👗",
    Home: "🏠",
    Sports: "⚽",
    Books: "📚",
    default: "📦",
  };

  const categoryGradients = {
    Electronics: "from-blue-500 to-cyan-400",
    Fashion: "from-pink-500 to-rose-400",
    Home: "from-purple-500 to-pink-400",
    Sports: "from-green-500 to-emerald-400",
    Books: "from-amber-500 to-orange-400",
    default: "from-slate-500 to-gray-400",
  };

  const icon = categoryIcons[product.category] || categoryIcons.default;
  const gradient =
    categoryGradients[product.category] || categoryGradients.default;

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl overflow-hidden transition duration-300 border border-gray-100 hover:border-purple-300 hover:-translate-y-1">
      <div
        className={`bg-gradient-to-br ${gradient} h-36 flex items-center justify-center text-6xl relative overflow-hidden group-hover:scale-110 transition duration-300`}
      >
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition"></div>
        {icon}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-purple-600 transition">
            {product.name}
          </h3>
          <span
            className={`ml-2 text-xs font-semibold bg-gradient-to-r ${gradient} text-white px-3 py-1 rounded-full shadow-md`}
          >
            {product.category}
          </span>
        </div>

        {product.description && (
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            ₹{product.price}
          </span>
          <span className="text-xs text-gray-400">
            {new Date(product.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="flex gap-2">
          <Link
            to={`/edit/${product._id}`}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-2.5 rounded-lg font-semibold text-center hover:from-emerald-600 hover:to-teal-600 transform hover:scale-105 transition duration-300 shadow-md hover:shadow-lg"
          >
            Edit
          </Link>
          <button
            onClick={onDelete}
            className="flex-1 bg-gradient-to-r from-red-500 to-rose-500 text-white py-2.5 rounded-lg font-semibold hover:from-red-600 hover:to-rose-600 transform hover:scale-105 transition duration-300 shadow-md hover:shadow-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
