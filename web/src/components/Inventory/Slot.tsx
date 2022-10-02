import { RootState } from '@/store';
import { Inventories, ItemInfo } from '@/types/inventory';
import { type } from '@testing-library/user-event/dist/type';
import { useEffect } from 'react';
import { useDrag, useDrop, DragPreviewImage, XYCoord, useDragLayer } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { moveItem } from './inventory.store';
import { SlotAmount, SlotContainer, SlotImage, SlotName, SlotWeight } from './styles';
import { getDragLayer } from '@/utils/inventoryUtils';
import { Box } from '@chakra-ui/react';
import { useContextMenu } from '../../providers/ContextMenuProvider';
import styled from 'styled-components';

type Props = {
  inventory: keyof Inventories;
  slot: number;
  item: ItemInfo;
  onContextMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, slot: number) => void;
  isDragging: (dragging: boolean) => void;
};

export const Slot: React.FC<Props> = ({ inventory, slot, item, onContextMenu, isDragging }) => {
  const dispatch = useDispatch();
  const { setOpen } = useContextMenu();
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
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: 'item',
    item: {
      inventory,
      slot,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    isDragging(collected.isDragging);
  }, [collected.isDragging]);

  if (item && item?.slot === slot) {
    if (collected.isDragging) {
      return (
        <SlotContainer>
          <CustomDragLayer image={item.image} />
        </SlotContainer>
      );
    } else {
      return (
        <SlotContainer onContextMenu={(e) => onContextMenu(e, slot)}>
          <Box
            sx={{
              width: '100%',
              justifyContent:
                slot <= 5 && inventory === 'leftInventory' ? 'space-between' : 'flex-end',
              display: 'flex',
            }}
          >
            {slot <= 5 && inventory === 'leftInventory' && (
              <Box
                sx={{
                  marginLeft: '5%',
                  color: 'white',
                  fontSize: '20px',
                  filter: 'drop-shadow(0 0 2px #000)',
                }}
              >
                {slot}
              </Box>
            )}
            <SlotAmount>
              {item?.amount}({(item?.amount * item?.weight).toFixed(1)})
            </SlotAmount>
          </Box>
          <SlotImage ref={drag} src={item.image} />
          <SlotName>{item?.name}</SlotName>
        </SlotContainer>
      );
    }
  } else {
    return <SlotContainer ref={drop} />;
  }
};

const CustomDragLayer = ({ image }: { image: string }) => {
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
        <SlotImage src={image} />
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
