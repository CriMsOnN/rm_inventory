import { useNuiEvent } from '../hooks/useNuiEvent';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { debugData } from '@/utils/debugData';
import { Inventories, ItemInfo } from '@/types/inventory';
import { moveItem, setInventory } from './Inventory/inventorySlice';
import { useInventoryMockData } from './Inventory/inventory.mock';
import Inventory from './Inventory';

const App = () => {
  const inventorySlice = useSelector((state: RootState) => state.inventory);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    console.log('rerender');
    useInventoryMockData();
  }, []);
  useNuiEvent('setInventory', (data: Inventories) => {
    // set data to inventorySlice
    dispatch(setInventory(data));
    dispatch(
      moveItem({
        fromInventory: 'leftInventory',
        toInventory: 'rightInventory',
        fromSlot: 1,
        toSlot: 3,
        amount: 1,
      })
    );
  });
  return <Inventory />;
};

export default App;
