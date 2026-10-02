import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem('user') || 'null')
  );

  const { cartItemsCount } = useCart();
  const navigate = useNavigate();

  const isLoggedIn = !!user;
  const isAdmin = user?.role === 'Admin';

  const navLinks = [
    { to: '/', label: 'Home', end: true },
    { to: '/products', label: 'Products' },
    { to: '/cart', label: 'Cart', badge: cartItemsCount },
  ];

  if (isLoggedIn) {
    navLinks.push({
      to: '/orders',
      label: 'My Orders',
    });
  }

  const getDesktopLinkClass = ({ isActive }) =>
    `inline-flex items-center px-3 py-1.5 text-sm font-medium transition-colors border-b-2 ${
      isActive
        ? 'text-blue-600 border-blue-600'
        : 'text-slate-600 border-transparent hover:text-slate-900 hover:border-slate-300'
    }`;

  const getMobileLinkClass = ({ isActive }) =>
    `flex items-center justify-between px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
      isActive
        ? 'text-blue-600 bg-blue-50'
        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
    }`;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setUser(null);
    setIsMenuOpen(false);

    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 text-slate-900 font-bold text-lg tracking-tight group"
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-600 text-white shadow-sm group-hover:bg-blue-700 transition-colors">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </span>

            <span>Electronics Store</span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={getDesktopLinkClass}
              >
                <span>{link.label}</span>

                {link.badge > 0 && (
                  <span className="ml-1.5 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-blue-600 rounded-full">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}

            {/* Admin Dashboard */}
            {isAdmin && (
              <NavLink
                to="/admin/dashboard"
                className={getDesktopLinkClass}
              >
                Admin Dashboard
              </NavLink>
            )}
          </nav>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">
                    {user.fullName}
                  </p>

                  <p className="text-xs text-slate-500">
                    {user.role}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  Register
                </Link>

                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <div className="relative">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </svg>

                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-blue-600" />
                  )}
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-1"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setIsMenuOpen(false)}
              className={getMobileLinkClass}
            >
              <span>{link.label}</span>

              {link.badge > 0 && (
                <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-blue-600 rounded-full">
                  {link.badge}
                </span>
              )}
            </NavLink>
          ))}

          {/* Mobile Admin Dashboard */}
          {isAdmin && (
            <NavLink
              to="/admin/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className={getMobileLinkClass}
            >
              <span>Admin Dashboard</span>
            </NavLink>
          )}

          {/* Mobile User Actions */}
          <div className="pt-3 border-t border-slate-100">
            {isLoggedIn ? (
              <div className="space-y-3">
                <div className="px-4 py-2">
                  <p className="text-sm font-semibold text-slate-900">
                    {user.fullName}
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    {user.role}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="block w-full text-center px-4 py-2.5 rounded-lg text-base font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center px-4 py-2.5 rounded-lg text-base font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Register
                </Link>

                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center px-4 py-2.5 rounded-lg text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;