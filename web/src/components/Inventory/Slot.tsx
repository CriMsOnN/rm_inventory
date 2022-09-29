import { RootState } from '@/store';
import { Inventories, ItemInfo } from '@/types/inventory';
import { type } from '@testing-library/user-event/dist/type';
import { useEffect } from 'react';
import { useDrag, useDrop, DragPreviewImage, XYCoord, useDragLayer } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { moveItem } from './inventorySlice';
import { SlotContainer, SlotImage, SlotName } from './styles';
import { getDragLayer } from '@/utils/inventoryUtils';
import { Box } from '@chakra-ui/react';
import { useContextMenu } from '../../providers/ContextMenuProvider';

type Props = {
  inventory: keyof Inventories;
  slot: number;
  onContextMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, slot: number) => void;
  isDragging: (dragging: boolean) => void;
};

export const Slot: React.FC<Props> = ({ inventory, slot, onContextMenu, isDragging }) => {
  const item = useSelector((state: RootState) => state.inventory[inventory].items[slot]);
  const dispatch = useDispatch();
  const { setOpen } = useContextMenu();
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

  useEffect(() => {
    isDragging(collected.isDragging);
  }, [collected.isDragging]);

  if (item?.slot === slot) {
    if (collected.isDragging) {
      return (
        <SlotContainer>
          <CustomDragLayer />
        </SlotContainer>
      );
    } else {
      return (
        <SlotContainer ref={drop} onContextMenu={(e) => onContextMenu(e, slot)}>
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
    return (
      <Box
        as="div"
        sx={{
          width: '100px',
          height: '100px',
        }}
      >
        <SlotImage />
      </Box>
    );
  };

  if (!isDragging) {
    return null;
  }

  return (
    <Box
      as="div"
      sx={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 100,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <div style={getDragLayer(initialOffset, currentOffset)}>{renderItem()}</div>
    </Box>
  );
};
