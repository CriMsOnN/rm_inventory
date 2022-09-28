import { RootState } from '@/store';
import { Inventories, ItemInfo } from '@/types/inventory';
import { type } from '@testing-library/user-event/dist/type';
import { useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { moveItem } from './inventorySlice';
import { SlotContainer, SlotName } from './styles';

type Props = {
  inventory: keyof Inventories;
  slot: number;
};

export const Slot: React.FC<Props> = ({ inventory, slot }) => {
  const item = useSelector((state: RootState) => state.inventory[inventory].items[slot]);
  const dispatch = useDispatch();
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: 'item',
    item: { inventory, slot },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const [collectedProps, drop] = useDrop(() => ({
    accept: 'item',
    drop(item: { inventory: keyof Inventories; slot: number }, monitor) {
      console.log(item, inventory);
      if (item) {
        dispatch(
          moveItem({
            fromInventory: item.inventory,
            toInventory: inventory,
            fromSlot: item.slot,
            toSlot: slot,
            amount: 1,
          })
        );
      }
    },
  }));
  if (item?.slot === slot) {
    return (
      <SlotContainer ref={drop}>
        <SlotName ref={drag}>{item?.name}</SlotName>
      </SlotContainer>
    );
  } else {
    return <SlotContainer ref={drop} />;
  }
};
