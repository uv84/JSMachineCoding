import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      state.totalItems += 1;
      state.totalPrice += action.payload.price;
    },
    
    removeFromCart: (state, action: PayloadAction<number>) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload);
      
      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        state.totalItems -= item.quantity;
        state.totalPrice -= item.price * item.quantity;
        state.items.splice(itemIndex, 1);
      }
    },
    
    updateQuantity: (state, action: PayloadAction<{id: number, quantity: number}>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      
      if (item) {
        const difference = action.payload.quantity - item.quantity;
        item.quantity = action.payload.quantity;
        state.totalItems += difference;
        state.totalPrice += item.price * difference;
        
        if (item.quantity <= 0) {
          const itemIndex = state.items.findIndex(i => i.id === action.payload.id);
          state.items.splice(itemIndex, 1);
        }
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    }
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;