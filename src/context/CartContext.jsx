import { createContext, useContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem('cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Sync cart state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to persist cart to localStorage', e);
    }
  }, [cartItems]);

  /**
   * Adds a product to the cart or increases its quantity if it already exists.
   * Ensures the quantity does not exceed the available stockQuantity.
   */
  const addToCart = (product, quantity = 1) => {
    if (!product) return;

    const id = product.id ?? product.Id;
    const name = product.name ?? product.Name;
    const price = Number(product.price ?? product.Price ?? 0);
    const imageUrl = product.imageUrl ?? product.ImageUrl ?? '';
    const stockQuantity = Number(product.stockQuantity ?? product.StockQuantity ?? 0);

    if (stockQuantity <= 0) return;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === id);

      if (existingIndex > -1) {
        return prevItems.map((item, index) => {
          if (index === existingIndex) {
            const updatedQty = Math.min(stockQuantity, item.quantity + quantity);
            return {
              ...item,
              quantity: updatedQty,
              stockQuantity, // Keep latest stock info
            };
          }
          return item;
        });
      }

      // New item in cart
      const initialQty = Math.min(stockQuantity, Math.max(1, quantity));
      return [
        ...prevItems,
        {
          id,
          name,
          price,
          imageUrl,
          quantity: initialQty,
          stockQuantity,
        },
      ];
    });
  };

  /**
   * Removes a specific item from the cart by its ID.
   */
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  /**
   * Updates the quantity of a cart item, clamped between 1 and stockQuantity.
   */
  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === productId) {
          const clampedQty = Math.max(1, Math.min(item.stockQuantity, newQuantity));
          return {
            ...item,
            quantity: clampedQty,
          };
        }
        return item;
      })
    );
  };

  /**
   * Empties the entire cart.
   */
  const clearCart = () => {
    setCartItems([]);
  };

  /**
   * Total price of all items in the cart.
   */
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  /**
   * Total number of individual product units in the cart.
   */
  const cartItemsCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
