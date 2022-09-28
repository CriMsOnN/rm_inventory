import {
  Inventories,
  Inventory,
  ItemInfo,
  PayloadActionGeneric,
  PayloadActionMoveItem,
} from '@/types/inventory';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Inventories = {
  leftInventory: {
    id: 'leftInventory',
    items: {},
    maxSlots: 10,
    maxWeight: 100,
  },
  rightInventory: {
    id: 'rightInventory',
    items: {},
    maxSlots: 10,
    maxWeight: 100,
  },
};

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<PayloadActionGeneric>) => {
      const inventory = state[action.payload.inventory];
      const item = inventory.items[action.payload.slot];
      if (item) {
        item.amount += action.payload.amount;
      } else {
        inventory.items[action.payload.slot] = action.payload;
      }
    },
    removeItem: (state, action: PayloadAction<PayloadActionGeneric>) => {
      const inventory = state[action.payload.inventory];
      const item = inventory.items[action.payload.slot];
      if (item) {
        item.amount -= action.payload.amount;
        if (item.amount <= 0) {
          delete inventory.items[action.payload.slot];
        }
      } else {
        console.log('Item not found');
      }
    },
    moveItem: (state, action: PayloadAction<PayloadActionMoveItem>) => {
      const fromInventory = state[action.payload.fromInventory];
      const toInventory = state[action.payload.toInventory];
      const fromSlot = fromInventory?.items[action.payload.fromSlot];
      const toSlot = toInventory?.items[action.payload.toSlot];
      const amount = action.payload.amount;
      if (fromInventory !== toInventory) {
        if (fromSlot) {
          if (fromSlot.unique) {
            return;
          }
          if (toSlot === undefined) {
            if (fromSlot.amount - amount > 0) {
              fromSlot.amount -= amount;
            } else {
              delete fromInventory.items[fromSlot.slot];
            }
            fromSlot.slot = action.payload.toSlot;
            toInventory.items[action.payload.toSlot] = fromSlot;
          }
        }
      }
    },
    setInventory: (state, action: PayloadAction<Inventories>) => {
      state.rightInventory = action.payload.rightInventory;
      state.leftInventory = action.payload.leftInventory;
    },
  },
});

export const { addItem, removeItem, moveItem, setInventory } = inventorySlice.actions;
export default inventorySlice.reducer;
