import { useNuiEvent } from '../hooks/useNuiEvent';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { debugData } from '@/utils/debugData';
import { Inventories, ItemInfo, PayloadActionMoveItem } from '@/types/inventory';
import { moveItem, setInventory } from './Inventory/inventory.store';
import { useInventoryMockData } from './Inventory/inventory.mock';
import Inventory from './Inventory';
import { registerDevCommands } from '@/utils/devCommands';

const App = () => {
  const inventorySlice = useSelector((state: RootState) => state.inventory);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    useInventoryMockData();
  }, []);

  registerDevCommands();
  useNuiEvent('setInventory', (data: Inventories) => {
    dispatch(setInventory(data));
  });
  useNuiEvent('moveItem', (data: PayloadActionMoveItem) => {
    dispatch(moveItem(data));
  });
  return <Inventory />;
};

export default App;
