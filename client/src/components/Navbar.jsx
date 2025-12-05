import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-2xl border-b border-purple-700/20">
      <div className="max-w-7xl mx-auto px-6 h-16">
        <nav className="flex items-center justify-between h-full">
          {/* <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50 group-hover:shadow-purple-500/80 transition">
              <span className="text-lg font-bold text-white">P</span>
            </div>
            <div>
              <span className="text-xl font-bold text-white group-hover:text-cyan-400 transition">
                ProduX
              </span>
              <p className="text-xs text-purple-300">Product Manager</p>
            </div>
          </Link> */}

          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-300 font-medium hover:text-cyan-400 transition duration-300 relative group"
            >
              Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/add"
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-400 hover:to-blue-500 transform hover:scale-110 transition duration-300 shadow-lg shadow-blue-500/50 hover:shadow-blue-400/70"
            >
              + Add Product
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
