function StatusBadge({ status }) {
  const statusStyles = {
    Delivered: 'bg-green-100 text-green-700',
    Cancelled: 'bg-red-100 text-red-700',
    Shipped: 'bg-blue-100 text-blue-700',
    Processing: 'bg-yellow-100 text-yellow-700',
    Pending: 'bg-gray-100 text-gray-700',
  };

  const style =
    statusStyles[status] || 'bg-gray-100 text-gray-700';

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${style}`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;