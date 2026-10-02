import { apiFetch } from './api';

/**
 * Create a new order.
 */
export async function createOrder(orderPayload) {
  const response = await apiFetch('/Orders', {
    method: 'POST',
    body: JSON.stringify(orderPayload),
  });

  if (!response.ok) {
    const message = await response.text();
    const error = new Error(
      message || 'Failed to place order. Please verify stock availability.'
    );
    error.status = response.status;
    throw error;
  }

  try {
    return await response.json();
  } catch {
    return { message: 'Order placed successfully' };
  }
}

/**
 * Get orders belonging to the authenticated user.
 */
export async function getOrders() {
  const response = await apiFetch('/Orders');

  if (!response.ok) {
    const error = new Error('Failed to load orders.');
    error.status = response.status;
    throw error;
  }

  const data = await response.json();

  return Array.isArray(data) ? data : [];
}

/**
 * Get a single order by ID for the authenticated user.
 */
export async function getOrderById(id) {
  const response = await apiFetch(`/Orders/${id}`);

  if (!response.ok) {
    const error = new Error(`Order #${id} was not found.`);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

/**
 * Get all orders for the admin dashboard.
 */
export async function getAllOrders() {
  const response = await apiFetch('/Orders/admin');

  if (!response.ok) {
    const message = await response.text();
    const error = new Error(message || 'Failed to load admin orders.');
    error.status = response.status;
    throw error;
  }

  const data = await response.json();

  return Array.isArray(data) ? data : [];
}

/**
 * Update an order status.
 */
export async function updateOrderStatus(id, status) {
  const response = await apiFetch(`/Orders/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({
      status,
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    const error = new Error(message || 'Failed to update order status.');
    error.status = response.status;
    throw error;
  }

  return response.json();
}