export enum ItemId {
  EMPTY = 'empty',
  WOOD = 'wood_plank',
  STICK = 'stick',
  DIAMOND = 'diamond',
  IRON = 'iron_ingot',
  GOLD = 'gold_ingot',
  // Junk Items
  COBBLESTONE = 'cobblestone',
  DIRT = 'dirt',
  SAPLING = 'sapling',
  APPLE = 'apple',
  SLIME_BALL = 'slime_ball',
  REDSTONE = 'redstone',
  GUNPOWDER = 'gunpowder',
  STRING = 'string',
  FEATHER = 'feather',
  BREAD = 'bread',
  COAL = 'coal',
  FLINT = 'flint',
  // Output Items
  DIAMOND_PICKAXE = 'diamond_pickaxe',
  IRON_SWORD = 'iron_sword',
  WOODEN_SHOVEL = 'wooden_shovel',
  GOLDEN_HOE = 'golden_hoe',
}

export interface Item {
  id: ItemId;
  name: string;
  color: string;
  icon: string;
  textureUrl?: string; // Direct URL to texture image
}

export interface Recipe {
  name: string;
  targetItemId: string;
  grid: ItemId[];
  description: string;
}

export interface Challenge extends Recipe {
  inventory: ItemId[];
  challengeId: string;
}

export interface Comment {
  id: number | string;
  user: string;
  text: string;
  timestamp: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  error?: string;
}

export interface UserSession {
  username: string;
  token: string | null;
}