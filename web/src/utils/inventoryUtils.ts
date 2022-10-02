import { ItemInfo } from '@/types/inventory';
import { XYCoord } from 'react-dnd';

export const canStackItems = (fromItem: ItemInfo, toItem: ItemInfo) => {
  //   return fromItem.name === toItem.name && fromItem.amount + toItem.amount <= toItem.maxStack; -- TODO
  return fromItem.name === toItem.name && (!fromItem.unique || !toItem.unique);
};

export const canSwapItems = (fromItem: ItemInfo, toItem: ItemInfo) =>
  !fromItem.unique || !toItem.unique;

export const calculateWeight = (items: { [key: string]: ItemInfo }) => {
  let weight = 0;
  Object.values(items).forEach((item) => {
    weight += item.weight * item.amount;
  });
  return weight;
};

export const getDragLayer = (initialOffset: XYCoord | null, currentOffset: XYCoord | null) => {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }
  let { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
};
