import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '../services/orderService';

/**
 * Returns color classes for the status badge based on order status.
 */
function getStatusBadgeClasses(status) {
  const s = (status || 'Pending').toLowerCase();

  if (s.includes('deliver') || s.includes('complete') || s.includes('success')) {
    return {
      container: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      dot: 'bg-emerald-500',
    };
  }
  if (s.includes('process') || s.includes('ship')) {
    return {
      container: 'bg-blue-50 text-blue-700 border-blue-200/80',
      dot: 'bg-blue-500',
    };
  }
  if (s.includes('cancel') || s.includes('fail') || s.includes('refund')) {
    return {
      container: 'bg-rose-50 text-rose-700 border-rose-200/80',
      dot: 'bg-rose-500',
    };
  }
  // Default / Pending
  return {
    container: 'bg-amber-50 text-amber-700 border-amber-200/80',
    dot: 'bg-amber-500',
  };
}

/**
 * Formats standard ISO/server date strings to a readable format.
 */
function formatOrderDate(dateString) {
  if (!dateString) return 'N/A';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return String(dateString);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return String(dateString);
  }
}

/**
 * Computes the item count for an order.
 */
function getOrderItemCount(order) {
  if (typeof order.itemCount === 'number') return order.itemCount;
  if (typeof order.itemsCount === 'number') return order.itemsCount;
  if (Array.isArray(order.items)) {
    const totalUnits = order.items.reduce(
      (sum, item) => sum + (Number(item.quantity) || 1),
      0
    );
    return totalUnits || order.items.length;
  }
  if (Array.isArray(order.orderItems)) {
    const totalUnits = order.orderItems.reduce(
      (sum, item) => sum + (Number(item.quantity) || 1),
      0
    );
    return totalUnits || order.orderItems.length;
  }
  return 1;
}

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getOrders();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      setError({
        message: err.message || 'Failed to load your orders from the server.',
        status: err.status,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            My Orders
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Track, manage, and review details for all your electronics purchases.
          </p>
        </div>

        {!loading && !error && orders.length > 0 && (
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <span className="text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg">
              {orders.length} {orders.length === 1 ? 'Order' : 'Orders'} Total
            </span>
            <button
              type="button"
              onClick={fetchUserOrders}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors px-3 py-1.5 rounded-lg border border-blue-200 hover:bg-blue-50"
            >
              Refresh
            </button>
          </div>
        )}
      </div>

      {/* Main Orders Content */}
      <div className="mt-8">
        {/* 1. Loading State */}
        {loading && (
          <div className="space-y-4" aria-busy="true" aria-label="Loading orders">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4 animate-pulse shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="space-y-2">
                    <div className="h-5 bg-slate-200 rounded w-36" />
                    <div className="h-4 bg-slate-200 rounded w-24" />
                  </div>
                  <div className="h-7 bg-slate-200 rounded-full w-28" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <div className="flex gap-8">
                    <div className="space-y-1">
                      <div className="h-3 bg-slate-200 rounded w-16" />
                      <div className="h-5 bg-slate-200 rounded w-20" />
                    </div>
                    <div className="space-y-1">
                      <div className="h-3 bg-slate-200 rounded w-12" />
                      <div className="h-5 bg-slate-200 rounded w-16" />
                    </div>
                  </div>
                  <div className="h-10 bg-slate-200 rounded-xl w-32" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. 401 Unauthorized State */}
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
              Please sign in to your account to view your order history and tracking information.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign In to View Orders
            </Link>
          </div>
        )}

        {/* 3. General Error State */}
        {!loading && error && error.status !== 401 && (
          <div className="max-w-lg mx-auto text-center py-12 px-6 bg-red-50/60 rounded-3xl border border-red-200">
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
              Unable to Load Orders
            </h2>
            <p className="text-sm text-slate-600 mb-5 max-w-sm mx-auto">
              {error.message}
            </p>
            <button
              type="button"
              onClick={fetchUserOrders}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            >
              Try Again
            </button>
          </div>
        )}

        {/* 4. Empty State */}
        {!loading && !error && orders.length === 0 && (
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
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              No orders found
            </h2>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed max-w-sm mx-auto">
              You haven&apos;t placed any orders with us yet. Discover the latest tech gear and electronics in our store.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Browse Electronics
            </Link>
          </div>
        )}

        {/* 5. Populated Orders List */}
        {!loading && !error && orders.length > 0 && (
          <div className="space-y-5">
            {orders.map((order) => {
              const orderId = order.id ?? order.orderId ?? order.Id;
              const status = order.status ?? order.Status ?? 'Pending';
              const badgeStyle = getStatusBadgeClasses(status);
              const totalAmount = Number(
                order.totalAmount ?? order.TotalAmount ?? order.total ?? 0
              );
              const datePlaced = formatOrderDate(
                order.createdAt ?? order.CreatedAt ?? order.orderDate ?? order.OrderDate
              );
              const itemCount = getOrderItemCount(order);

              return (
                <div
                  key={orderId}
                  className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs hover:border-slate-300 transition-all"
                >
                  {/* Card Top: ID, Date, and Status */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-500">Order</span>
                        <span className="text-base font-extrabold text-slate-900 font-mono">
                          #{orderId}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        Placed on <span className="font-medium text-slate-700">{datePlaced}</span>
                      </p>
                    </div>

                    {/* Status Badge */}
                    <div className="self-start sm:self-auto">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badgeStyle.container}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${badgeStyle.dot}`} />
                        {status}
                      </span>
                    </div>
                  </div>

                  {/* Card Bottom: Summary Stats and Action Link */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-5">
                    <div className="grid grid-cols-2 sm:flex sm:items-center gap-6 sm:gap-10">
                      <div>
                        <span className="block text-xs font-medium text-slate-500">
                          Total Amount
                        </span>
                        <span className="text-lg font-extrabold text-slate-900 mt-0.5 block">
                          ${totalAmount.toFixed(2)}
                        </span>
                      </div>

                      <div>
                        <span className="block text-xs font-medium text-slate-500">
                          Items
                        </span>
                        <span className="text-sm font-bold text-slate-800 mt-1 block">
                          {itemCount} {itemCount === 1 ? 'item' : 'items'}
                        </span>
                      </div>
                    </div>

                    <div>
                      <Link
                        to={`/orders/${orderId}`}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-5 py-2.5 rounded-xl font-bold text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        View Details
                        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Link>
                    </div>
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

export default MyOrders;
