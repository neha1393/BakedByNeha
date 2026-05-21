import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-pink-100 bg-white/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl sm:text-3xl font-black bg-linear-to-r from-pink-500 via-rose-500 to-orange-400 bg-clip-text text-transparent"
        >
          🎀 BakesByNeha 🎀
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 text-rose-500 font-semibold">
          <Link to="/">Home</Link>
          <Link to="/calculator">Calculator</Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden rounded-xl bg-pink-100 p-2 text-pink-600"
        >
          {menuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-lg text-rose-500 font-semibold">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>

            <Link to="/calculator" onClick={() => setMenuOpen(false)}>
              Calulator
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
