import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/productService';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductList = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError({
        message: err.message || 'Failed to load products from server.',
        status: err.status,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Our Products
          </h1>
          <p className="mt-1 text-sm sm:text-base text-slate-600">
            Browse authentic electronics, next-generation computing, and audio equipment.
          </p>
        </div>
        {!loading && !error && (
          <span className="text-sm font-medium text-slate-500 self-start sm:self-auto bg-slate-100 px-3 py-1.5 rounded-lg">
            {products.length} {products.length === 1 ? 'Product' : 'Products'} Available
          </span>
        )}
      </div>

      {/* Main Content Area */}
      <div className="mt-8">
        {/* Loading State: Skeletons */}
        {loading && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            aria-busy="true"
            aria-label="Loading products"
          >
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-4 animate-pulse"
              >
                <div className="w-full h-44 bg-slate-200 rounded-xl" />
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-200 rounded w-full" />
                  <div className="h-3 bg-slate-200 rounded w-2/3" />
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="h-5 bg-slate-200 rounded w-16" />
                  <div className="h-9 bg-slate-200 rounded-lg w-24" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 401 Unauthorized State */}
        {!loading && error && error.status === 401 && (
          <div className="max-w-md mx-auto text-center py-16 px-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 mb-5">
              <svg
                className="w-7 h-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Authentication Required
            </h2>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              You need to be signed in to view our electronics catalog and access store pricing.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign In to View Products
            </Link>
          </div>
        )}

        {/* General Error State */}
        {!loading && error && error.status !== 401 && (
          <div className="max-w-lg mx-auto text-center py-12 px-6 bg-red-50/50 rounded-2xl border border-red-200">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-100 text-red-600 mb-4">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-1.5">
              Unable to Load Products
            </h2>
            <p className="text-sm text-slate-600 mb-5 max-w-sm mx-auto">
              {error.message}
            </p>
            <button
              type="button"
              onClick={fetchProductList}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-sm"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-slate-200/80">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 mb-4">
              <svg
                className="w-7 h-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-1">
              No Products Available
            </h2>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              There are currently no products in the catalog. Please check back later.
            </p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => {
              const stock = product.stockQuantity ?? product.StockQuantity ?? 0;
              const price = product.price ?? product.Price ?? 0;
              const name = product.name ?? product.Name ?? 'Product';
              const description = product.description ?? product.Description ?? '';
              const imageUrl = product.imageUrl ?? product.ImageUrl ?? '';
              const id = product.id ?? product.Id;

              return (
                <div
                  key={id}
                  className="flex flex-col justify-between bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 group"
                >
                  <div>
                    {/* Product Image with Fallback */}
                    <div className="relative w-full h-48 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center mb-4">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            // Hide broken image and reveal fallback
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <div
                        className={`w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-100 ${
                          imageUrl ? 'hidden' : ''
                        }`}
                      >
                        <svg
                          className="w-12 h-12 text-slate-300 mb-1"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                          <line x1="8" y1="21" x2="16" y2="21" />
                          <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                        <span className="text-xs font-medium text-slate-400">Electronics</span>
                      </div>

                      {/* Stock Badge Overlay */}
                      <div className="absolute top-2.5 right-2.5">
                        {stock > 5 ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/90 text-white backdrop-blur-xs shadow-xs">
                            In Stock ({stock})
                          </span>
                        ) : stock > 0 ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500/90 text-white backdrop-blur-xs shadow-xs">
                            Low Stock ({stock})
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-500/90 text-white backdrop-blur-xs shadow-xs">
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-1">
                      {name}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-4">
                      {description || 'High-performance electronics hardware built for reliability and modern workflows.'}
                    </p>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">Price</span>
                      <span className="text-lg font-extrabold text-slate-900">
                        ${Number(price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>

                    <Link
                      to={`/products/${id}`}
                      className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
