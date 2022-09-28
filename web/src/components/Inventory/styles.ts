import styled from 'styled-components';

export const InventoryContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const InventoryWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const LeftInventoryWrapper = styled.div`
  width: 600px;
  height: 700px;
  background-color: rgba(0, 0, 0, 0.5);
  overflow-x: hidden;
  overflow-y: scroll;

  @media (max-width: 1200px) {
    width: 400px;
    height: 700px;
  }
`;

export const InventorySlots = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 10px;
  padding: 10px;
`;

export const RightInventoryWrapper = styled.div`
  width: 600px;
  height: 700px;
  background-color: rgba(0, 0, 0, 0.5);
  overflow-x: hidden;
  overflow-y: scroll;
`;

export const InventoryActions = styled.div`
  width: 200px;
  height: 300px;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const SlotContainer = styled.div`
  width: 120px;
  height: 140px;
  border: 3px solid gray;
  background-color: rgba(255, 255, 255, 0.2);
  cursor: grab;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const SlotName = styled.div`
  color: white;
`;

export const SlotImage = styled.div((name) => ({
  width: '100%',
  height: '100%',
  background: 'url(https://cdn-icons-png.flaticon.com/512/824/824239.png) no-repeat',
  backgroundSize: '100% 100%',
}));
