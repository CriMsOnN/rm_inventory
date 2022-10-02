import {
  Inventories,
  Inventory,
  ItemInfo,
  PayloadActionGeneric,
  PayloadActionMoveItem,
} from '@/types/inventory';
import { calculateWeight, canStackItems, canSwapItems } from '@/utils/inventoryUtils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Inventories = {
  leftInventory: {
    id: 'leftInventory',
    type: 'inventory',
    items: {},
    maxSlots: 10,
    maxWeight: 100,
    inventoryWeight: 0,
  },
  rightInventory: {
    id: 'rightInventory',
    type: 'shop',
    items: {},
    maxSlots: 10,
    maxWeight: 100,
    inventoryWeight: 0,
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
      const { fromInventory, toInventory, fromSlot, toSlot, amount } = action.payload;
      const fromItem = state[fromInventory].items[fromSlot];
      const toItem = state[toInventory].items[toSlot];
      if (fromItem && toItem) {
        if (canStackItems(fromItem, toItem)) {
          if (fromItem.amount > amount) {
            fromItem.amount -= amount;
            toItem.amount += amount;
          } else {
            delete state[fromInventory].items[fromSlot];
            toItem.amount += fromItem.amount;
          }
        } else {
          console.log('swapping items');
          toItem.slot = fromSlot;
          fromItem.slot = toSlot;
          state[fromInventory].items[fromSlot] = toItem;
          state[toInventory].items[toSlot] = fromItem;
        }
      } else if (toItem === undefined) {
        console.log(`Moving item from ${fromSlot} to ${toSlot}`);
        fromItem.slot = toSlot;
        delete state[fromInventory].items[fromSlot];
        state[toInventory].items[toSlot] = fromItem;
        console.log(state[toInventory].items[toSlot].slot, state[toInventory].items[toSlot].image);
      }
    },
    setInventory: (state, action: PayloadAction<Inventories>) => {
      state.rightInventory = action.payload.rightInventory;
      state.leftInventory = action.payload.leftInventory;
      state.rightInventory.inventoryWeight = calculateWeight(state.rightInventory.items);
      state.leftInventory.inventoryWeight = calculateWeight(state.leftInventory.items);
    },
  },
});

export const { addItem, removeItem, moveItem, setInventory } = inventorySlice.actions;
export default inventorySlice.reducer;
