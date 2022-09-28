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
  return (
    <InventoryContainer>
      <InventoryWrapper>
        <LeftInventoryWrapper>
          <InventorySlots>
            {Array.from(Array(leftInventory.maxSlots)).map((k, index) => (
              <Slot key={`${index}-leftInventory`} inventory="leftInventory" slot={index + 1} />
            ))}
          </InventorySlots>
        </LeftInventoryWrapper>
        <InventoryActions />
        <RightInventoryWrapper>
          <InventorySlots>
            {Array.from(Array(rightInventory.maxSlots)).map((k, index) => (
              <Slot key={`${index}-rightInventory`} inventory="rightInventory" slot={index + 1} />
            ))}
          </InventorySlots>
        </RightInventoryWrapper>
      </InventoryWrapper>
    </InventoryContainer>
  );
};

export default Inventory;
