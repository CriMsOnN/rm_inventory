import { ItemInfo } from '@/types/inventory';
import { Menu, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react';
import { createContext, useContext, useState } from 'react';

type Position = [number, number];

type ContextMenuProp = {
  item: ItemInfo;
  setItem: (item: ItemInfo) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ContextMenuCtx = createContext<ContextMenuProp>({} as ContextMenuProp);

export const ContextMenuProvider: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<ItemInfo>({} as ItemInfo);
  if (item !== undefined) {
    return (
      <ContextMenuCtx.Provider
        value={{
          item,
          setItem,
          setOpen,
        }}
      >
        <Menu isOpen={open} onClose={() => setOpen(false)}>
          <MenuList w={'30px'} minWidth={'100px'}>
            <MenuItem disabled={item.usable}>Use</MenuItem>
            <MenuDivider />
            <MenuItem disabled={item.usable}>Give</MenuItem>
          </MenuList>
        </Menu>
        {children}
      </ContextMenuCtx.Provider>
    );
  } else {
    return <>{children}</>;
  }
};

export const useContextMenu = () => useContext<ContextMenuProp>(ContextMenuCtx);
