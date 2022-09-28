import { Item } from '@/types/inventory';
import { debugData } from '@/utils/debugData';
export const useInventoryMockData = () => {
  const leftInventory = generateMockInventory(1, 10, 50);
  const rightInventory = generateMockInventory(2, 5, 50);

  debugData(
    [
      {
        action: 'setInventory',
        data: {
          leftInventory,
          rightInventory,
        },
      },
    ],
    1000
  );
};

const generateMockInventory = (id: number, itemSlots: number, maxSlots: number) => {
  const items: Item = {};
  for (let i = 1; i <= itemSlots; i += 2) {
    items[i] = {
      slot: i,
      name: `Item ${i}`,
      weight: 1,
      amount: 1,
      metadata: {},
      description: 'This is a test item',
      unique: false,
      usable: false,
    };
  }
  return {
    items,
    itemSlots,
    maxSlots,
    maxWeight: 100,
  };
};
