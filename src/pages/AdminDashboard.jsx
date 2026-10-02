import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ProductForm from '../components/admin/ProductForm';
import ProductTable from '../components/admin/ProductTable';
import OrderTable from '../components/admin/OrderTable';
import { apiFetch } from '../services/api';

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  const [editingProductId, setEditingProductId] = useState(null);

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stockQuantity: '',
    imageUrl: '',
  });

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    setError(null);

    try {
      const response = await apiFetch('/Products');

      if (!response.ok) {
        throw new Error(`Server error (${response.status})`);
      }

      const data = await response.json();

      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        err.message ||
          'Unable to load products. Please make sure the backend is running.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function fetchOrders() {
    setOrdersLoading(true);
    setOrdersError(null);

    try {
      const response = await apiFetch('/Orders/admin');

      if (!response.ok) {
        throw new Error(`Server error (${response.status})`);
      }

      const data = await response.json();

      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      setOrdersError(err.message || 'Failed to load orders.');
    } finally {
      setOrdersLoading(false);
    }
  }

  async function updateOrderStatus(orderId, status) {
    setOrdersError(null);
    setUpdatingOrderId(orderId);

    try {
      const response = await apiFetch(`/Orders/${orderId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error(`Server error (${response.status})`);
      }

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === orderId
            ? { ...order, status }
            : order
        )
      );
    } catch (err) {
      setOrdersError(
        err.message || 'Failed to update order status.'
      );
    } finally {
      setUpdatingOrderId(null);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function resetForm() {
    setFormData({
      name: '',
      description: '',
      price: '',
      stockQuantity: '',
      imageUrl: '',
    });

    setEditingProductId(null);
  }

  function openAddForm() {
    resetForm();
    setError(null);
    setSuccess(null);
    setShowEditForm(false);
    setShowAddForm(true);
  }

  function openEditForm(product) {
    setError(null);
    setSuccess(null);

    setShowAddForm(false);
    setShowEditForm(true);

    setEditingProductId(product.id);

    setFormData({
      name: product.name || '',
      description: product.description || '',
      price: product.price ?? '',
      stockQuantity: product.stockQuantity ?? '',
      imageUrl: product.imageUrl || '',
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  function closeForms() {
    setShowAddForm(false);
    setShowEditForm(false);
    resetForm();
    setError(null);
  }

  function validateForm() {
    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      formData.price === '' ||
      formData.stockQuantity === ''
    ) {
      setError('Please fill in all required fields.');
      return false;
    }

    const price = Number(formData.price);
    const stockQuantity = Number(formData.stockQuantity);

    if (Number.isNaN(price) || price <= 0) {
      setError('Price must be greater than 0.');
      return false;
    }

    if (
      Number.isNaN(stockQuantity) ||
      !Number.isInteger(stockQuantity) ||
      stockQuantity < 0
    ) {
      setError('Stock quantity must be a whole number of 0 or more.');
      return false;
    }

    return true;
  }

  async function handleAddProduct(event) {
    event.preventDefault();

    setError(null);
    setSuccess(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiFetch('/Products', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name.trim(),
          description: formData.description.trim(),
          price: Number(formData.price),
          stockQuantity: Number(formData.stockQuantity),
          imageUrl: formData.imageUrl.trim(),
        }),
      });

      if (response.status === 400) {
        throw new Error('Invalid product data.');
      }

      if (!response.ok) {
        throw new Error(`Server error (${response.status})`);
      }

      const createdProduct = await response.json();

      setProducts((previousProducts) => [
        ...previousProducts,
        createdProduct,
      ]);

      resetForm();
      setShowAddForm(false);

      setSuccess(
        `Product "${createdProduct.name}" was added successfully.`
      );
    } catch (err) {
      setError(err.message || 'Failed to add product.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleEditProduct(event) {
    event.preventDefault();

    setError(null);
    setSuccess(null);

    if (!editingProductId) {
      setError('No product selected for editing.');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiFetch(
        `/Products/${editingProductId}`,
        {
          method: 'PUT',
          body: JSON.stringify({
            name: formData.name.trim(),
            description: formData.description.trim(),
            price: Number(formData.price),
            stockQuantity: Number(formData.stockQuantity),
            imageUrl: formData.imageUrl.trim(),
          }),
        }
      );

      if (response.status === 404) {
        throw new Error('Product not found.');
      }

      if (response.status === 400) {
        throw new Error('Invalid product data.');
      }

      if (!response.ok) {
        throw new Error(`Server error (${response.status})`);
      }

      const updatedName = formData.name.trim();

      setProducts((previousProducts) =>
        previousProducts.map((product) =>
          product.id === editingProductId
            ? {
                ...product,
                name: formData.name.trim(),
                description: formData.description.trim(),
                price: Number(formData.price),
                stockQuantity: Number(formData.stockQuantity),
                imageUrl: formData.imageUrl.trim(),
              }
            : product
        )
      );

      closeForms();

      setSuccess(
        `Product "${updatedName}" was updated successfully.`
      );
    } catch (err) {
      setError(err.message || 'Failed to update product.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteProduct(product) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?\n\nThis action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    setError(null);
    setSuccess(null);

    setDeletingId(product.id);

    try {
      const response = await apiFetch(
        `/Products/${product.id}`,
        {
          method: 'DELETE',
        }
      );

      if (response.status === 404) {
        throw new Error('Product not found.');
      }

      if (!response.ok) {
        throw new Error(`Server error (${response.status})`);
      }

      setProducts((previousProducts) =>
        previousProducts.filter(
          (item) => item.id !== product.id
        )
      );

      setSuccess(
        `Product "${product.name}" was deleted successfully.`
      );
    } catch (err) {
      setError(err.message || 'Failed to delete product.');
    } finally {
      setDeletingId(null);
    }
  }

  const totalStock = products.reduce(
    (total, product) =>
      total + Number(product.stockQuantity || 0),
    0
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
          <p className="text-sm font-medium text-slate-600">
            Loading admin dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Administration
            </p>

            <h1 className="mt-1 text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-gray-600">
              Manage your electronics store products and orders.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              View Store
            </Link>

            <button
              type="button"
              onClick={openAddForm}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              + Add Product
            </button>
          </div>
        </div>

        {/* Messages */}
        {success && (
          <div className="mb-6 flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
            <span>{success}</span>

            <button
              type="button"
              onClick={() => setSuccess(null)}
              className="ml-4 text-green-700 hover:text-green-900"
              aria-label="Close success message"
            >
              ×
            </button>
          </div>
        )}

        {error && (
          <div className="mb-6 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError(null)}
              className="ml-4 text-red-700 hover:text-red-900"
              aria-label="Close error message"
            >
              ×
            </button>
          </div>
        )}

        {/* Add / Edit Form */}
        {(showAddForm || showEditForm) && (
          <ProductForm
            formData={formData}
            isSubmitting={isSubmitting}
            isEditing={showEditForm}
            onChange={handleChange}
            onSubmit={
              showEditForm
                ? handleEditProduct
                : handleAddProduct
            }
            onCancel={closeForms}
          />
        )}

        {/* Statistics */}
        <div className="mb-8 grid gap-5 md:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total Products
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {products.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total Stock
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {totalStock}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total Orders
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {orders.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Dashboard Status
            </p>

            <div className="mt-2 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
              <span className="text-lg font-bold text-green-700">
                Connected
              </span>
            </div>
          </div>

        </div>

        {/* Product Management */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-xl font-bold text-slate-900">
              Product Management
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage products currently available in your store.
            </p>
          </div>

          {products.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-slate-500">
                No products found.
              </p>

              <button
                type="button"
                onClick={openAddForm}
                className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Add Your First Product
              </button>
            </div>
          ) : (
            <ProductTable
              products={products}
              deletingId={deletingId}
              onEdit={openEditForm}
              onDelete={handleDeleteProduct}
            />
          )}
        </div>

        {/* Orders Management */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-xl font-bold text-slate-900">
              Orders Management
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View all customer orders from the store.
            </p>
          </div>

          {ordersLoading ? (
            <div className="px-6 py-12 text-center">
              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

              <p className="text-sm text-slate-500">
                Loading orders...
              </p>
            </div>
          ) : ordersError ? (
            <div className="px-6 py-12 text-center">
              <p className="font-medium text-red-600">
                {ordersError}
              </p>

              <button
                type="button"
                onClick={fetchOrders}
                className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          ) : orders.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-slate-500">
                No orders found.
              </p>
            </div>
          ) : (
            <OrderTable
              orders={orders}
              onUpdateStatus={updateOrderStatus}
              updatingOrderId={updatingOrderId}
            />
          )}

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;