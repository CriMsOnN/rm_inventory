export type Inventories = {
  leftInventory: Inventory;
  rightInventory: Inventory;
};

export type Inventory = {
  id: string;
  items: Item;
  maxSlots: number;
  maxWeight: number;
  type: string;
  inventoryWeight: number;
};

export type Item = {
  [key: number]: ItemInfo;
};

export type ItemInfo = {
  slot: number;
  name: string;
  amount: number;
  description: string;
  metadata: ItemMetadata;
  unique: boolean;
  usable: boolean;
  weight: number;
  image: string;
};

export type ItemMetadata = {
  [key: string]: any;
};

export interface PayloadActionGeneric extends ItemInfo {
  inventory: keyof Inventories;
}

export interface PayloadActionMoveItem {
  fromInventory: keyof Inventories;
  toInventory: keyof Inventories;
  fromSlot: number;
  toSlot: number;
  amount: number;
}
