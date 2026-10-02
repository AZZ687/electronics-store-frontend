import { Link } from 'react-router-dom';

function Footer() {
  const year = new Date().getFullYear();

  const shopLinks = [
    { to: '/products', label: 'All TVs' },
    { to: '/cart', label: 'Cart' },
    { to: '/orders', label: 'My Orders' },
  ];

  const accountLinks = [
    { to: '/login', label: 'Login' },
    { to: '/register', label: 'Create Account' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-3 lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2.5 text-white font-bold text-lg tracking-tight">
              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-600 text-white shadow-sm">
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

            <p className="text-sm leading-relaxed max-w-xs">
              Premium 4K, 8K, OLED, and Smart TVs with verified authentic quality and manufacturer warranty.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Shop
            </h3>
            <ul className="space-y-2.5 text-sm">
              {shopLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Account
            </h3>
            <ul className="space-y-2.5 text-sm">
              {accountLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-semibold text-white uppercase tracking-wide mt-6 mb-3">
              Contact
            </h3>
            <p className="text-sm">support@electronicsstore.com</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>&copy; {year} Electronics Store. All rights reserved.</p>
          <p>Built with ASP.NET Core &amp; React</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;