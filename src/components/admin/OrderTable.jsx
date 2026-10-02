function OrderTable({
  orders,
  onUpdateStatus,
  updatingOrderId,
}) {
  if (orders.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <p className="text-gray-500">
          No orders found.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                Order
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                Customer
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                Date
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                Items
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                Total
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="transition-colors hover:bg-slate-50"
              >
                <td className="px-6 py-4">
                  <p className="font-semibold text-slate-900">
                    #{order.id}
                  </p>
                </td>

                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-slate-700">
                    User #{order.userId}
                  </p>
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        }
                      )
                    : '-'}
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {order.items?.length || 0}
                </td>

                <td className="px-6 py-4 text-sm font-bold text-slate-900">
                  ${Number(order.totalAmount || 0).toFixed(2)}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <select
                      value={order.status}
                      disabled={updatingOrderId === order.id}
                      onChange={(event) =>
                        onUpdateStatus(
                          order.id,
                          event.target.value
                        )
                      }
                      className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm outline-none transition-all duration-200 hover:shadow-md focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-60 ${
                        order.status === 'Pending'
                          ? 'border-amber-200 bg-amber-50 text-amber-700'
                          : order.status === 'Processing'
                            ? 'border-blue-200 bg-blue-50 text-blue-700'
                            : order.status === 'Shipped'
                              ? 'border-violet-200 bg-violet-50 text-violet-700'
                              : order.status === 'Delivered'
                                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                : 'border-red-200 bg-red-50 text-red-700'
                      }`}
                    >
                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Processing">
                        Processing
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>
                    </select>

                    {updatingOrderId === order.id && (
                      <span className="text-xs font-medium text-slate-500">
                        Saving...
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderTable;