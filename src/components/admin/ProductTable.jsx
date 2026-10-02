import { Link } from 'react-router-dom';

function ProductTable({
    products,
    deletingId,
    onEdit,
    onDelete,
}) {
    if (products.length === 0) {
        return (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                <p className="text-gray-500">
                    No products found.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Product
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Price
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Stock
                            </th>

                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 bg-white">
                        {products.map((product) => (

                            <tr key={product.id} className="hover:bg-gray-50">

                                {/* Product */}
                                <td className="whitespace-nowrap px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                                            {product.imageUrl ? (
                                                <img
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                                                    No Image
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <p className="font-semibold text-gray-900">
                                                {product.name}
                                            </p>

                                            <p className="mt-1 max-w-xs truncate text-sm text-gray-500">
                                                {product.description}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Price */}
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-900">
                                    ${Number(product.price).toFixed(2)}
                                </td>

                                {/* Stock */}
                                <td className="whitespace-nowrap px-6 py-4">
                                    <span
                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${product.stockQuantity === 0
                                            ? 'bg-red-100 text-red-700'
                                            : product.stockQuantity <= 5
                                                ? 'bg-yellow-100 text-yellow-700'
                                                : 'bg-green-100 text-green-700'
                                            }`}
                                    >
                                        {product.stockQuantity} in stock
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="whitespace-nowrap px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">

                                        <Link
                                            to={`/products/${product.id}`}
                                            className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
                                        >
                                            View
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={() => onEdit(product)}
                                            className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => onDelete(product)}
                                            disabled={deletingId === product.id}
                                            className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            {deletingId === product.id
                                                ? 'Deleting...'
                                                : 'Delete'}
                                        </button>

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

export default ProductTable;