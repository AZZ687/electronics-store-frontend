import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { useCart } from '../context/CartContext';

function ProductDetails() {
  const { id } = useParams();
  const { addToCart, cartItems } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(null);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    setAddedNotice(null);

    try {
      const data = await getProductById(id);
      setProduct(data);
      const stock = data.stockQuantity ?? data.StockQuantity ?? 0;
      setQuantity(stock > 0 ? 1 : 0);
    } catch (err) {
      setError({
        message: err.message || 'Failed to load product details.',
        status: err.status,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const stock = product ? (product.stockQuantity ?? product.StockQuantity ?? 0) : 0;
  const isOutOfStock = stock <= 0;
  const price = product ? (product.price ?? product.Price ?? 0) : 0;
  const name = product ? (product.name ?? product.Name ?? 'Product Details') : '';
  const description = product ? (product.description ?? product.Description ?? '') : '';
  const imageUrl = product ? (product.imageUrl ?? product.ImageUrl ?? '') : '';

  // Check how many units of this item are already in the cart
  const productIdNum = product ? (product.id ?? product.Id) : null;
  const existingInCart = cartItems.find((item) => item.id === productIdNum);
  const qtyInCart = existingInCart ? existingInCart.quantity : 0;
  const remainingStock = Math.max(0, stock - qtyInCart);

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => Math.min(stock, prev + 1));
  };

  const handleAddToCart = () => {
    if (!product || isOutOfStock) return;

    // Real CartContext action: adds selected product & quantity, clamping to available stock
    addToCart(product, quantity);

    setAddedNotice({
      name,
      quantity,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Navigation Breadcrumb / Back Link */}
      <div className="mb-6">
        <Link
          to="/products"
          className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
        >
          <svg
            className="w-4 h-4 mr-1.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Products
        </Link>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 animate-pulse"
          aria-busy="true"
          aria-label="Loading product details"
        >
          <div className="lg:col-span-6">
            <div className="w-full aspect-square bg-slate-200 rounded-3xl" />
          </div>
          <div className="lg:col-span-6 space-y-5">
            <div className="h-4 bg-slate-200 rounded w-24" />
            <div className="h-8 bg-slate-200 rounded w-3/4" />
            <div className="h-6 bg-slate-200 rounded w-32" />
            <div className="h-24 bg-slate-200 rounded w-full" />
            <div className="h-12 bg-slate-200 rounded-xl w-48" />
            <div className="h-12 bg-slate-200 rounded-xl w-full" />
          </div>
        </div>
      )}

      {/* 401 Unauthorized State */}
      {!loading && error && error.status === 401 && (
        <div className="max-w-md mx-auto text-center py-16 px-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
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
            Please sign in to view comprehensive product details, specifications, and availability.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign In to Continue
          </Link>
        </div>
      )}

      {/* 404 Product Not Found State */}
      {!loading && error && error.status === 404 && (
        <div className="max-w-md mx-auto text-center py-16 px-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-100 text-slate-500 mb-5">
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
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Product Not Found
          </h2>
          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            The product you are looking for (ID #{id}) does not exist or may have been removed from our catalog.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
          >
            Explore Available Products
          </Link>
        </div>
      )}

      {/* General / Network Error State */}
      {!loading && error && error.status !== 401 && error.status !== 404 && (
        <div className="max-w-lg mx-auto text-center py-12 px-6 bg-red-50/50 rounded-3xl border border-red-200">
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
            Unable to Load Product
          </h2>
          <p className="text-sm text-slate-600 mb-5 max-w-sm mx-auto">
            {error.message}
          </p>
          <button
            type="button"
            onClick={fetchProduct}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-sm"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Product Details Presentation */}
      {!loading && !error && product && (
        <div className="space-y-8">
          {/* Success Banner when Added to Cart */}
          {addedNotice && (
            <div
              className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
              role="status"
            >
              <div className="flex items-center gap-2.5">
                <svg
                  className="w-5 h-5 text-emerald-600 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>
                  Added <strong>{addedNotice.quantity}</strong> unit(s) of{' '}
                  <strong>{addedNotice.name}</strong> to your shopping cart.
                  {qtyInCart > 0 && (
                    <span className="text-emerald-700 ml-1">
                      (Total in cart: <strong>{qtyInCart}</strong>)
                    </span>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <Link
                  to="/cart"
                  className="text-xs font-bold text-emerald-800 underline hover:text-emerald-950"
                >
                  View Cart →
                </Link>
                <button
                  type="button"
                  onClick={() => setAddedNotice(null)}
                  className="text-emerald-700 hover:text-emerald-900 font-bold text-xs"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Product Media Gallery / Showcase */}
            <div className="lg:col-span-6">
              <div className="relative w-full aspect-square bg-slate-100 rounded-3xl border border-slate-200/80 overflow-hidden flex items-center justify-center shadow-xs">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
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
                    className="w-20 h-20 text-slate-300 mb-2"
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
                  <span className="text-sm font-medium text-slate-400">Authentic Electronics</span>
                </div>

                {/* Status Badge on Image */}
                <div className="absolute top-4 left-4">
                  {isOutOfStock ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-rose-600 text-white shadow-xs">
                      Out of Stock
                    </span>
                  ) : stock <= 5 ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-xs">
                      Low Stock ({stock} available)
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-xs">
                      In Stock ({stock} available)
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Product Details & Controls */}
            <div className="lg:col-span-6 space-y-6">
              {/* Product Identifier & Meta */}
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-100 text-slate-600 border border-slate-200">
                  Product ID: #{id}
                </span>
                <span className="text-xs font-medium text-slate-400">
                  Electronics Store Official Catalog
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {name}
              </h1>

              {/* Price & Stock Overview */}
              <div className="flex items-baseline gap-4 pb-6 border-b border-slate-200">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                  ${Number(price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-sm text-slate-500 font-medium">
                  {isOutOfStock
                    ? 'Currently unavailable'
                    : `Stock: ${stock} units ready to ship`}
                </span>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Description
                </h2>
                <p className="text-base text-slate-600 leading-relaxed whitespace-pre-line">
                  {description || 'No detailed description provided for this product.'}
                </p>
              </div>

              {/* Interactive Purchase Controls */}
              <div className="pt-4 border-t border-slate-200 space-y-4">
                {/* Quantity Selector */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="quantity-input"
                      className="block text-sm font-semibold text-slate-800"
                    >
                      Select Quantity
                    </label>
                    {qtyInCart > 0 && (
                      <span className="text-xs font-medium text-blue-600">
                        {qtyInCart} already in cart ({remainingStock} more available)
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center rounded-xl border border-slate-300 bg-white p-1">
                      <button
                        type="button"
                        onClick={handleDecrease}
                        disabled={quantity <= 1 || isOutOfStock}
                        aria-label="Decrease quantity"
                        className="w-9 h-9 inline-flex items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </button>

                      <input
                        id="quantity-input"
                        type="number"
                        min="1"
                        max={stock}
                        value={quantity}
                        disabled={isOutOfStock}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          if (isNaN(val) || val < 1) {
                            setQuantity(1);
                          } else if (val > stock) {
                            setQuantity(stock);
                          } else {
                            setQuantity(val);
                          }
                        }}
                        className="w-14 text-center font-bold text-slate-900 border-none focus:outline-none text-base"
                      />

                      <button
                        type="button"
                        onClick={handleIncrease}
                        disabled={quantity >= stock || isOutOfStock}
                        aria-label="Increase quantity"
                        className="w-9 h-9 inline-flex items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </button>
                    </div>

                    <span className="text-xs text-slate-500 font-medium">
                      {isOutOfStock
                        ? 'Item unavailable'
                        : `Stock limit: ${stock}`}
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <div>
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className="w-full sm:w-auto min-w-[220px] inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
              </div>

              {/* Trust Features Checklist */}
              <div className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-600 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>100% Guaranteed Authentic</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-600 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Official Brand Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-600 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Fast & Secure Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-600 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Dedicated Technical Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
