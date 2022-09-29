import type { ItemInfo } from '@/types/inventory';
import { fetchNui } from '@/utils/fetchNui';

export const onUse = (item: ItemInfo) => {
  if (item.usable) {
    fetchNui('inventory:useItem', item);
  }
};
