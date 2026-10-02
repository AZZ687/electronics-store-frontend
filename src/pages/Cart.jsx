import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/orderService';

function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartItemsCount,
  } = useCart();

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState(null);
  const [placedOrder, setPlacedOrder] = useState(null);

  /**
   * Handles checkout submission by sending cart items to POST /api/Orders
   */
  const handleCheckout = async () => {
    if (cartItems.length === 0 || isPlacingOrder) return;

    setOrderError(null);
    setIsPlacingOrder(true);

    const orderPayload = {
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      const orderResponse = await createOrder(orderPayload);
      setPlacedOrder(orderResponse);
      clearCart();
    } catch (err) {
      setOrderError({
        message: err.message || 'An error occurred while placing your order.',
        status: err.status ?? 500,
      });
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Shopping Cart
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            {placedOrder
              ? 'Order completed successfully!'
              : cartItemsCount > 0
              ? `You have ${cartItemsCount} item${cartItemsCount === 1 ? '' : 's'} in your cart.`
              : 'Your cart is currently empty.'}
          </p>
        </div>

        <div className="flex items-center gap-4 self-start sm:self-auto">
          <Link
            to="/products"
            className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            ← Continue Shopping
          </Link>
          {cartItems.length > 0 && !placedOrder && (
            <button
              type="button"
              onClick={clearCart}
              disabled={isPlacingOrder}
              className="text-xs font-semibold text-rose-600 hover:text-rose-800 disabled:opacity-50 transition-colors px-3 py-1.5 rounded-lg border border-rose-200 hover:bg-rose-50"
            >
              Clear Cart
            </button>
          )}
        </div>
      </div>

      {/* Checkout Error Banner */}
      {orderError && (
        <div
          role="alert"
          className={`mt-6 p-4 rounded-2xl border text-sm flex items-start justify-between gap-3 ${
            orderError.status === 401
              ? 'bg-amber-50 border-amber-200 text-amber-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}
        >
          <div className="flex items-start gap-3">
            <svg
              className={`w-5 h-5 shrink-0 mt-0.5 ${
                orderError.status === 401 ? 'text-amber-600' : 'text-rose-600'
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="font-semibold">
                {orderError.status === 401
                  ? 'Authentication Required'
                  : orderError.status === 400
                  ? 'Order Request Error'
                  : 'Checkout Failed'}
              </p>
              <p className="mt-0.5 text-xs opacity-90">{orderError.message}</p>
              {orderError.status === 401 && (
                <div className="mt-2">
                  <Link
                    to="/login"
                    className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 transition-colors shadow-xs"
                  >
                    Sign in to your account →
                  </Link>
                </div>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOrderError(null)}
            aria-label="Dismiss message"
            className="text-xs font-semibold p-1 hover:opacity-75 transition-opacity"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Cart Content */}
      <div className="mt-8">
        {placedOrder ? (
          /* Order Placement Success State */
          <div className="text-center py-16 px-4 bg-white rounded-3xl border border-emerald-200/80 shadow-xs max-w-lg mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 mb-5">
              <svg
                className="w-9 h-9"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
              Order Placed Successfully!
            </h2>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed max-w-sm mx-auto">
              Thank you for your purchase. We have received your order and are preparing it for shipment.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 mb-6">
              <span>Order ID:</span>
              <span className="font-mono text-blue-600 font-bold">
                #{placedOrder.id ?? placedOrder.orderId ?? placedOrder.Id ?? placedOrder.orderNumber ?? 'Confirmed'}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/orders"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                View My Orders
              </Link>
              <Link
                to="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200/80 shadow-xs max-w-lg mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 mb-5">
              <svg
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed max-w-sm mx-auto">
              Looks like you haven&apos;t added any electronics to your cart yet. Browse our products to find the gear you need.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Browse Electronics
            </Link>
          </div>
        ) : (
          /* Populated Cart Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Items List */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white rounded-3xl border border-slate-200/80 divide-y divide-slate-100 shadow-xs overflow-hidden">
                {cartItems.map((item) => {
                  const subtotal = item.price * item.quantity;
                  const isMaxQuantity = item.quantity >= item.stockQuantity;

                  return (
                    <div
                      key={item.id}
                      className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      {/* Product Thumbnail & Details */}
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <Link
                          to={`/products/${item.id}`}
                          className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center group"
                        >
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                          ) : null}
                          <div
                            className={`w-full h-full flex items-center justify-center text-slate-300 bg-slate-100 ${
                              item.imageUrl ? 'hidden' : ''
                            }`}
                          >
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                            </svg>
                          </div>
                        </Link>

                        <div className="min-w-0 flex-1">
                          <Link
                            to={`/products/${item.id}`}
                            className="text-base font-bold text-slate-900 hover:text-blue-600 transition-colors line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          <div className="mt-1 text-xs text-slate-500 flex items-center gap-2">
                            <span>Unit: ${Number(item.price).toFixed(2)}</span>
                            <span>•</span>
                            <span className="text-emerald-700 font-medium">
                              Stock: {item.stockQuantity}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Quantity Controls & Subtotal */}
                      <div className="flex items-center justify-between w-full sm:w-auto sm:gap-8 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        {/* Quantity Selector */}
                        <div className="flex flex-col items-start sm:items-center">
                          <div className="inline-flex items-center rounded-xl border border-slate-200 bg-white p-1">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1 || isPlacingOrder}
                              aria-label="Decrease quantity"
                              className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="5" y1="12" x2="19" y2="12" />
                              </svg>
                            </button>

                            <span className="w-10 text-center font-bold text-slate-900 text-sm">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={isMaxQuantity || isPlacingOrder}
                              aria-label="Increase quantity"
                              className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                              </svg>
                            </button>
                          </div>
                          {isMaxQuantity && (
                            <span className="text-[10px] text-amber-600 font-medium mt-1">
                              Max stock reached
                            </span>
                          )}
                        </div>

                        {/* Subtotal */}
                        <div className="text-right min-w-[90px]">
                          <span className="text-base font-extrabold text-slate-900 block">
                            ${subtotal.toFixed(2)}
                          </span>
                        </div>

                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          disabled={isPlacingOrder}
                          aria-label={`Remove ${item.name} from cart`}
                          className="p-2 text-slate-400 hover:text-rose-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors rounded-lg hover:bg-rose-50"
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6 sticky top-24">
                <h2 className="text-lg font-bold text-slate-900 pb-4 border-b border-slate-100">
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span>Items Subtotal ({cartItemsCount})</span>
                    <span className="font-semibold text-slate-900">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span className="text-emerald-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Sales Tax</span>
                    <span className="text-slate-500">$0.00</span>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex justify-between items-baseline">
                    <span className="text-base font-bold text-slate-900">Total</span>
                    <span className="text-2xl font-extrabold text-slate-900">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleCheckout}
                    disabled={isPlacingOrder || cartItems.length === 0}
                    className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    {isPlacingOrder ? (
                      <span className="inline-flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        Placing Order...
                      </span>
                    ) : (
                      'Proceed to Checkout'
                    )}
                  </button>
                  <p className="text-[11px] text-center text-slate-400 mt-2">
                    Orders are processed securely in real-time.
                  </p>
                </div>

                {/* Trust Badges */}
                <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Secure encrypted SSL transactions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Free shipping & 30-day returns policy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
