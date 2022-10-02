import styled from 'styled-components';

export const InventoryContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const InventoryWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InventoryWeightProgress = styled.div`
  width: 100%;
`;

export const LeftInventoryWrapper = styled.div`
  width: 730px;
  height: 700px;
  background-color: rgba(0, 0, 0, 0.5);
  overflow-x: hidden;
  overflow-y: scroll;
  margin-right: 2%;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
`;

export const InventorySlots = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 10px;
  padding: 10px;
`;

export const RightInventoryWrapper = styled.div`
  width: 730px;
  height: 700px;
  background-color: rgba(0, 0, 0, 0.5);
  overflow-x: hidden;
  overflow-y: scroll;
  margin-left: 2%;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
`;

export const InventoryActions = styled.div`
  width: 200px;
  height: 300px;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const SlotContainer = styled.div`
  width: 120px;
  height: 140px;
  border: 1px solid gray;
  background-color: rgba(255, 255, 255, 0.1);
  cursor: grab;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const SlotName = styled.div`
  color: white;
  width: 100%;
  height: 20%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

type SlotImageProps = {
  src?: string;
};

export const SlotImage = styled.div<SlotImageProps>`
  width: 100%;
  height: 100%;
  background: url('assets/items/${(p) => p.src}.png') no-repeat;
  background-size: 100% 100%;
`;

export const SlotAmount = styled.div`
  color: white;
`;

export const SlotWeight = styled.div`
  color: white;
`;
