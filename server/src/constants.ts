import { ItemId, Item, Recipe } from './types';

// Using a reliable direct host for Minecraft assets (1.20.1)
// const TEXTURE_BASE = "https://assets.mcasset.cloud/1.20.1/assets/minecraft/textures";

// For server, we mainly need the Recipe validation logic, but we'll include everything to keep it consistent 
// or easily shareable.

export const RECIPES: Recipe[] = [
    {
        name: 'Diamond Pickaxe',
        targetItemId: ItemId.DIAMOND_PICKAXE,
        description: 'Craft a Diamond Pickaxe',
        grid: [
            ItemId.DIAMOND, ItemId.DIAMOND, ItemId.DIAMOND,
            ItemId.EMPTY, ItemId.STICK, ItemId.EMPTY,
            ItemId.EMPTY, ItemId.STICK, ItemId.EMPTY
        ]
    },
    {
        name: 'Iron Sword',
        targetItemId: ItemId.IRON_SWORD,
        description: 'Craft an Iron Sword',
        grid: [
            ItemId.EMPTY, ItemId.IRON, ItemId.EMPTY,
            ItemId.EMPTY, ItemId.IRON, ItemId.EMPTY,
            ItemId.EMPTY, ItemId.STICK, ItemId.EMPTY
        ]
    },
    {
        name: 'Wooden Shovel',
        targetItemId: ItemId.WOODEN_SHOVEL,
        description: 'Craft a Wooden Shovel',
        grid: [
            ItemId.EMPTY, ItemId.WOOD, ItemId.EMPTY,
            ItemId.EMPTY, ItemId.STICK, ItemId.EMPTY,
            ItemId.EMPTY, ItemId.STICK, ItemId.EMPTY
        ]
    },
    {
        name: 'Golden Hoe',
        targetItemId: ItemId.GOLDEN_HOE,
        description: 'Craft a Golden Hoe',
        grid: [
            ItemId.GOLD, ItemId.GOLD, ItemId.EMPTY,
            ItemId.EMPTY, ItemId.STICK, ItemId.EMPTY,
            ItemId.EMPTY, ItemId.STICK, ItemId.EMPTY
        ]
    }
];
