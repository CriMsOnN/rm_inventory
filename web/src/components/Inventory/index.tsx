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
} from './styles';

const Inventory = () => {
  const leftInventory = useSelector((state: RootState) => state.inventory.leftInventory);
  const rightInventory = useSelector((state: RootState) => state.inventory.rightInventory);
  const { setItem, setOpen } = useContextMenu();
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, slot: number) => {
    e.preventDefault();
    console.log(slot);
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
          <InventorySlots>
            {Array.from(Array(leftInventory.maxSlots)).map((k, index) => (
              <Slot
                key={`${index}-leftInventory`}
                inventory="leftInventory"
                slot={index + 1}
                onContextMenu={handleContextMenu}
                isDragging={(dragging) => dragging && setOpen(false)}
              />
            ))}
          </InventorySlots>
        </LeftInventoryWrapper>
        <InventoryActions />
        <RightInventoryWrapper>
          <InventorySlots>
            {Array.from(Array(rightInventory.maxSlots)).map((k, index) => (
              <Slot
                key={`${index}-rightInventory`}
                inventory="rightInventory"
                slot={index + 1}
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
