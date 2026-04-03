import { ItemId, Item, Recipe } from './types';

// Using a reliable direct host for Minecraft assets (1.20.1)
const TEXTURE_BASE = "https://assets.mcasset.cloud/1.20.1/assets/minecraft/textures";

export const ITEMS: Record<string, Item> = {
  [ItemId.EMPTY]: { id: ItemId.EMPTY, name: '', color: 'transparent', icon: '' },
  
  // Ingredients
  [ItemId.WOOD]: { id: ItemId.WOOD, name: 'Oak Planks', color: '#a1662f', icon: '🟫', textureUrl: `${TEXTURE_BASE}/block/oak_planks.png` },
  [ItemId.STICK]: { id: ItemId.STICK, name: 'Stick', color: '#6d4c41', icon: '🥢', textureUrl: `${TEXTURE_BASE}/item/stick.png` },
  [ItemId.DIAMOND]: { id: ItemId.DIAMOND, name: 'Diamond', color: '#00ced1', icon: '💎', textureUrl: `${TEXTURE_BASE}/item/diamond.png` },
  [ItemId.IRON]: { id: ItemId.IRON, name: 'Iron Ingot', color: '#b0bec5', icon: '⬜', textureUrl: `${TEXTURE_BASE}/item/iron_ingot.png` },
  [ItemId.GOLD]: { id: ItemId.GOLD, name: 'Gold Ingot', color: '#ffd700', icon: '🟡', textureUrl: `${TEXTURE_BASE}/item/gold_ingot.png` },

  // Junk Items
  [ItemId.COBBLESTONE]: { id: ItemId.COBBLESTONE, name: 'Cobblestone', color: '#555', icon: '🪨', textureUrl: `${TEXTURE_BASE}/block/cobblestone.png` },
  [ItemId.DIRT]: { id: ItemId.DIRT, name: 'Dirt', color: '#555', icon: '🟤', textureUrl: `${TEXTURE_BASE}/block/dirt.png` },
  [ItemId.SAPLING]: { id: ItemId.SAPLING, name: 'Oak Sapling', color: '#555', icon: '🌱', textureUrl: `${TEXTURE_BASE}/block/oak_sapling.png` },
  [ItemId.APPLE]: { id: ItemId.APPLE, name: 'Apple', color: '#red', icon: '🍎', textureUrl: `${TEXTURE_BASE}/item/apple.png` },
  [ItemId.SLIME_BALL]: { id: ItemId.SLIME_BALL, name: 'Slimeball', color: '#5cd053', icon: '🟢', textureUrl: `${TEXTURE_BASE}/item/slime_ball.png` },
  [ItemId.REDSTONE]: { id: ItemId.REDSTONE, name: 'Redstone Dust', color: '#ff0000', icon: '❤️', textureUrl: `${TEXTURE_BASE}/item/redstone.png` },
  [ItemId.GUNPOWDER]: { id: ItemId.GUNPOWDER, name: 'Gunpowder', color: '#555', icon: '⚫', textureUrl: `${TEXTURE_BASE}/item/gunpowder.png` },
  [ItemId.STRING]: { id: ItemId.STRING, name: 'String', color: '#fff', icon: '🧵', textureUrl: `${TEXTURE_BASE}/item/string.png` },
  [ItemId.FEATHER]: { id: ItemId.FEATHER, name: 'Feather', color: '#fff', icon: '🪶', textureUrl: `${TEXTURE_BASE}/item/feather.png` },
  [ItemId.BREAD]: { id: ItemId.BREAD, name: 'Bread', color: '#a1662f', icon: '🍞', textureUrl: `${TEXTURE_BASE}/item/bread.png` },
  [ItemId.COAL]: { id: ItemId.COAL, name: 'Coal', color: '#000', icon: '⚫', textureUrl: `${TEXTURE_BASE}/item/coal.png` },
  [ItemId.FLINT]: { id: ItemId.FLINT, name: 'Flint', color: '#333', icon: '🪨', textureUrl: `${TEXTURE_BASE}/item/flint.png` },

  // Results (Target Items)
  [ItemId.DIAMOND_PICKAXE]: { id: ItemId.DIAMOND_PICKAXE, name: 'Diamond Pickaxe', color: 'cyan', icon: '⛏️', textureUrl: `${TEXTURE_BASE}/item/diamond_pickaxe.png` },
  [ItemId.IRON_SWORD]: { id: ItemId.IRON_SWORD, name: 'Iron Sword', color: 'white', icon: '⚔️', textureUrl: `${TEXTURE_BASE}/item/iron_sword.png` },
  [ItemId.WOODEN_SHOVEL]: { id: ItemId.WOODEN_SHOVEL, name: 'Wooden Shovel', color: 'brown', icon: '🥄', textureUrl: `${TEXTURE_BASE}/item/wooden_shovel.png` },
  [ItemId.GOLDEN_HOE]: { id: ItemId.GOLDEN_HOE, name: 'Golden Hoe', color: 'yellow', icon: '🪝', textureUrl: `${TEXTURE_BASE}/item/golden_hoe.png` },
};

export const RECIPES: Recipe[] = [
  {
    name: 'Diamond Pickaxe',
    targetItemId: ItemId.DIAMOND_PICKAXE,
    description: 'Craft a Diamond Pickaxe',
    grid: [
      ItemId.DIAMOND, ItemId.DIAMOND, ItemId.DIAMOND,
      ItemId.EMPTY,   ItemId.STICK,   ItemId.EMPTY,
      ItemId.EMPTY,   ItemId.STICK,   ItemId.EMPTY
    ]
  },
  {
    name: 'Iron Sword',
    targetItemId: ItemId.IRON_SWORD,
    description: 'Craft an Iron Sword',
    grid: [
      ItemId.EMPTY,   ItemId.IRON,    ItemId.EMPTY,
      ItemId.EMPTY,   ItemId.IRON,    ItemId.EMPTY,
      ItemId.EMPTY,   ItemId.STICK,   ItemId.EMPTY
    ]
  },
  {
    name: 'Wooden Shovel',
    targetItemId: ItemId.WOODEN_SHOVEL,
    description: 'Craft a Wooden Shovel',
    grid: [
      ItemId.EMPTY,   ItemId.WOOD,    ItemId.EMPTY,
      ItemId.EMPTY,   ItemId.STICK,   ItemId.EMPTY,
      ItemId.EMPTY,   ItemId.STICK,   ItemId.EMPTY
    ]
  },
  {
    name: 'Golden Hoe',
    targetItemId: ItemId.GOLDEN_HOE,
    description: 'Craft a Golden Hoe',
    grid: [
      ItemId.GOLD,    ItemId.GOLD,    ItemId.EMPTY,
      ItemId.EMPTY,   ItemId.STICK,   ItemId.EMPTY,
      ItemId.EMPTY,   ItemId.STICK,   ItemId.EMPTY
    ]
  }
];