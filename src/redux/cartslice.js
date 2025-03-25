import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "cart";

// Function to calculate a checksum (simple hash) for data integrity
const generateChecksum = (cart) => {
  return btoa(JSON.stringify(cart)); // Encode to Base64
};

// Function to load cart from localStorage safely
const loadCartFromLocalStorage = () => {
  if (typeof window === "undefined") return []; // Prevent SSR issues

  try {
    const storedCart = localStorage.getItem(STORAGE_KEY);
    const storedChecksum = localStorage.getItem(`${STORAGE_KEY}_checksum`);

    if (!storedCart || !storedChecksum) return []; // No data found

    const parsedCart = JSON.parse(storedCart);
    const recalculatedChecksum = generateChecksum(parsedCart);

    // If tampering detected, clear localStorage and return an empty cart
    if (recalculatedChecksum !== storedChecksum) {
      console.warn("⚠️ Cart data has been modified externally! Clearing cart.");
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(`${STORAGE_KEY}_checksum`);
      return [];
    }

    return parsedCart;
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return [];
  }
};

// Function to save cart to localStorage
const saveCartToLocalStorage = (cart) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    localStorage.setItem(`${STORAGE_KEY}_checksum`, generateChecksum(cart)); // Save checksum
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCartFromLocalStorage(), // Load from localStorage
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveCartToLocalStorage(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToLocalStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(`${STORAGE_KEY}_checksum`);
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
      saveCartToLocalStorage(state.items);
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      saveCartToLocalStorage(state.items);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
