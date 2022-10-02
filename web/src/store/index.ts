import inventorySlice from '@/components/Inventory/inventory.store';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    inventory: inventorySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
