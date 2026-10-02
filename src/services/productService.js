import { apiFetch } from './api';

/**
 * Fetch all products.
 */
export async function getProducts() {
  const response = await apiFetch('/Products');

  if (!response.ok) {
    const error = new Error('Failed to load products.');
    error.status = response.status;
    throw error;
  }

  return response.json();
}

/**
 * Fetch a single product by ID.
 */
export async function getProductById(id) {
  const response = await apiFetch(`/Products/${id}`);

  if (!response.ok) {
    const error = new Error(`Failed to load product #${id}.`);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

/**
 * Create a new product.
 */
export async function createProduct(product) {
  const response = await apiFetch('/Products', {
    method: 'POST',
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    const message = await response.text();
    const error = new Error(message || 'Failed to create product.');
    error.status = response.status;
    throw error;
  }

  return response.json();
}

/**
 * Update an existing product.
 */
export async function updateProduct(id, product) {
  const response = await apiFetch(`/Products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    const message = await response.text();
    const error = new Error(message || 'Failed to update product.');
    error.status = response.status;
    throw error;
  }

  return true;
}

/**
 * Delete a product.
 */
export async function deleteProduct(id) {
  const response = await apiFetch(`/Products/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const message = await response.text();
    const error = new Error(message || 'Failed to delete product.');
    error.status = response.status;
    throw error;
  }

  return true;
}