import { useContextMenu } from '../../providers/ContextMenuProvider';
import { RootState } from '@/store';
import { ItemInfo } from '@/types/inventory';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Slot } from './Slot';
import {
  InventoryActions,
  InventoryContainer,
  InventoryWrapper,
  InventorySlots,
  LeftInventoryWrapper,
  RightInventoryWrapper,
  InventoryWeightProgress,
} from './styles';
import { Progress, ProgressLabel } from '@chakra-ui/react';

const Inventory = () => {
  const leftInventory = useSelector((state: RootState) => state.inventory.leftInventory);
  const rightInventory = useSelector((state: RootState) => state.inventory.rightInventory);
  const { setItem, setOpen } = useContextMenu();
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, slot: number) => {
    e.preventDefault();
    setItem(leftInventory.items[slot]);
    setOpen(true);
    const menu = document.querySelector('[role=menu]');

    const popper = menu?.parentElement;

    const x = e.clientX;
    const y = e.clientY;

    if (popper) {
      Object.assign(popper.style, {
        top: `${y}px`,
        left: `${x}px`,
      });
    }
  };
  return (
    <InventoryContainer>
      <InventoryWrapper>
        <LeftInventoryWrapper>
          <InventoryWeightProgress>
            <Progress
              value={50}
              height="20px"
              sx={{
                borderRadius: '7px',
                bgColor: 'rgba(0, 0, 0, 0.5)',
              }}
              colorScheme="red"
            >
              <ProgressLabel
                sx={{
                  fontSize: '10px',
                  filter: 'drop-shadow(0 0 2px #000)',
                }}
              >
                50/100
              </ProgressLabel>
            </Progress>
          </InventoryWeightProgress>
          <InventorySlots>
            {Array.from(Array(leftInventory.maxSlots)).map((k, index) => (
              <Slot
                key={`${index}-leftInventory`}
                inventory="leftInventory"
                slot={index + 1}
                item={leftInventory.items[index + 1]}
                onContextMenu={handleContextMenu}
                isDragging={(dragging) => dragging && setOpen(false)}
              />
            ))}
          </InventorySlots>
        </LeftInventoryWrapper>
        <InventoryActions />
        <RightInventoryWrapper>
          <InventoryWeightProgress>
            <Progress
              value={rightInventory.inventoryWeight}
              height="20px"
              sx={{
                borderRadius: '7px',
                bgColor: 'rgba(0, 0, 0, 0.5)',
              }}
              colorScheme="red"
            >
              <ProgressLabel
                sx={{
                  fontSize: '10px',
                  filter: 'drop-shadow(0 0 2px #000)',
                }}
              >
                {rightInventory.inventoryWeight}/{rightInventory.maxWeight}
              </ProgressLabel>
            </Progress>
          </InventoryWeightProgress>
          <InventorySlots>
            {Array.from(Array(rightInventory.maxSlots)).map((k, index) => (
              <Slot
                key={`${index}-rightInventory`}
                inventory="rightInventory"
                slot={index + 1}
                item={rightInventory.items[index + 1]}
                onContextMenu={handleContextMenu}
                isDragging={(dragging) => dragging && setOpen(false)}
              />
            ))}
          </InventorySlots>
        </RightInventoryWrapper>
      </InventoryWrapper>
    </InventoryContainer>
  );
};

export default Inventory;
