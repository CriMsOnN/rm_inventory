import { isEnvBrowser } from '@/utils/misc';

(window as any).inv = {};

const castWindow = (window as any).inv;

function dispatchNuiEvent<T = any>(action: string, data: T) {
  window.dispatchEvent(
    new MessageEvent('message', {
      data: {
        action,
        data,
      },
    })
  );
}

export const registerDevCommands = async () => {
  if (!isEnvBrowser()) return;
  console.log('%cDev Commands', 'color: green; font-size: 30px; font-weight: bold;');
  castWindow.dispatchNuiEvent = dispatchNuiEvent;

  castWindow.moveItem = (
    fromInventory: string,
    toInventory: string,
    fromSlot: number,
    toSlot: number,
    amount: number
  ) => {
    dispatchNuiEvent('moveItem', { fromInventory, toInventory, fromSlot, toSlot, amount });
  };
};
