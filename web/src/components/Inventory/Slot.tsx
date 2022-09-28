import { RootState } from '@/store';
import { Inventories, ItemInfo } from '@/types/inventory';
import { type } from '@testing-library/user-event/dist/type';
import { useEffect } from 'react';
import { useDrag, useDrop, DragPreviewImage, XYCoord, useDragLayer } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { moveItem } from './inventorySlice';
import { SlotContainer, SlotImage, SlotName } from './styles';
import { getDragLayer } from '@/utils/inventoryUtils';

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
    if (collected.isDragging) {
      return (
        <SlotContainer>
          <CustomDragLayer />
        </SlotContainer>
      );
    } else {
      return (
        <SlotContainer ref={drop}>
          <SlotName>{item?.name}</SlotName>
          <SlotImage ref={drag} />
        </SlotContainer>
      );
    }
  } else {
    return <SlotContainer ref={drop} />;
  }
};
const CustomDragLayer = () => {
  const { itemType, isDragging, item, initialOffset, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  const renderItem = () => {
    console.log('rendering item');
    return (
      <div
        className="dragitem"
        style={{
          width: '100px',
          height: '100px',
        }}
      >
        <SlotImage />
      </div>
    );
  };

  if (!isDragging) {
    return null;
  }

  return (
    <div className="draglayer">
      <div style={getDragLayer(initialOffset, currentOffset)}>{renderItem()}</div>
    </div>
  );
};
