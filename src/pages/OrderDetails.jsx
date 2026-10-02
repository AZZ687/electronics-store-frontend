import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const API_BASE_URL = 'https://localhost:7268/api';

function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrder() {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');

      if (!token) {
        setError('Authentication required. Please sign in.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/Orders/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          setError('Your session has expired. Please sign in again.');
          return;
        }

        if (response.status === 404) {
          setError('Order not found.');
          return;
        }

        if (!response.ok) {
          throw new Error(`Server error (${response.status})`);
        }

        const data = await response.json();
        setOrder(data);
      } catch (err) {
        if (err.name === 'TypeError') {
          setError(
            'Unable to connect to the backend. Please make sure the backend server is running.'
          );
        } else {
          setError(err.message || 'Failed to load order details.');
        }
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchOrder();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>

            <p className="mt-4 text-gray-600">
              Loading order details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-2xl font-bold text-red-600">
              !
            </div>

            <h1 className="mt-5 text-2xl font-bold text-gray-900">
              Unable to Load Order
            </h1>

            <p className="mt-2 text-gray-600">
              {error}
            </p>

            <Link
              to="/orders"
              className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Back to My Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">

        {/* Back to Orders */}
        <Link
          to="/orders"
          className="mb-6 inline-flex items-center text-sm font-semibold text-blue-600 transition hover:text-blue-700"
        >
          ← Back to My Orders
        </Link>

        {/* Order Header */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>
              <p className="text-sm font-medium text-gray-500">
                Order
              </p>

              <h1 className="mt-1 text-3xl font-bold text-gray-900">
                #{order.id}
              </h1>
            </div>

            <span className="inline-flex w-fit rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-800">
              {order.status}
            </span>
          </div>

          <div className="mt-6 grid gap-4 border-t border-gray-100 pt-6 sm:grid-cols-2">

            {/* Order Date */}
            <div>
              <p className="text-sm text-gray-500">
                Order Date
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {new Date(order.createdAt).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>

            {/* Total */}
            <div>
              <p className="text-sm text-gray-500">
                Total Amount
              </p>

              <p className="mt-1 text-xl font-bold text-blue-600">
                ${Number(order.totalAmount).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">

          <h2 className="text-xl font-bold text-gray-900">
            Order Items
          </h2>

          <div className="mt-5 divide-y divide-gray-100">

            {order.items?.map((item, index) => (
              <div
                key={`${item.productId}-${index}`}
                className="flex flex-col gap-5 py-5 sm:flex-row sm:items-center sm:justify-between"
              >

                {/* Product Information */}
                <div className="flex items-center gap-4">

                  {/* Product Image */}
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.productName || `Product ${item.productId}`}
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                      No Image
                    </div>
                  )}

                  {/* Product Name */}
                  <div>
                    <p className="font-semibold text-gray-900">
                      {item.productName || `Product #${item.productId}`}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>

                {/* Price Information */}
                <div className="text-left sm:text-right">

                  <p className="text-sm text-gray-500">
                    Unit Price: $
                    {Number(item.unitPrice).toFixed(2)}
                  </p>

                  <p className="mt-1 font-bold text-gray-900">
                    ${Number(item.subTotal).toFixed(2)}
                  </p>

                </div>
              </div>
            ))}

          </div>

          {/* Order Total */}
          <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-5">

            <span className="text-lg font-semibold text-gray-700">
              Order Total
            </span>

            <span className="text-2xl font-bold text-blue-600">
              ${Number(order.totalAmount).toFixed(2)}
            </span>

          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;