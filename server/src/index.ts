import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { RECIPES } from './constants'
import { AuthResponse, ItemId, Recipe } from './types'

const app = new Hono()

app.use('/*', cors())

app.get('/', (c) => c.text('Craftcha Server is Running!'))

const challengeStore = new Map<string, { recipe: Recipe, expiresAt: number }>();

// Simple cleanup every 1 min
setInterval(() => {
    const now = Date.now();
    for (const [id, data] of challengeStore) {
        if (data.expiresAt < now) challengeStore.delete(id);
    }
}, 60000);

app.get('/api/challenge', (c) => {
    const randomIndex = Math.floor(Math.random() * RECIPES.length);
    const recipe = RECIPES[randomIndex];

    // Helper shuffle
    const shuffle = <T>(array: T[]): T[] => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    // Generate Inventory
    const requiredItems = recipe.grid.filter(id => id !== ItemId.EMPTY);

    const junkPool = [
        ItemId.COBBLESTONE, ItemId.DIRT, ItemId.SAPLING, ItemId.APPLE,
        ItemId.SLIME_BALL, ItemId.REDSTONE, ItemId.GUNPOWDER, ItemId.STRING,
        ItemId.FEATHER, ItemId.BREAD, ItemId.COAL, ItemId.FLINT
    ];

    const mandatoryItems = [...requiredItems, ...requiredItems];
    const remainingSlots = 36 - mandatoryItems.length;
    const randomJunk: ItemId[] = [];
    for (let i = 0; i < remainingSlots; i++) {
        randomJunk.push(junkPool[Math.floor(Math.random() * junkPool.length)]);
    }

    const inventory = shuffle([...mandatoryItems, ...randomJunk]);

    // Create stateful challenge
    const challengeId = crypto.randomUUID();
    challengeStore.set(challengeId, {
        recipe,
        expiresAt: Date.now() + 1000 * 60 * 2 // 2 minutes TTL
    });

    return c.json({ ...recipe, inventory, challengeId });
})

app.post('/api/verify', async (c) => {
    try {
        const body = await c.req.json();
        const { grid, challengeId } = body as { grid: ItemId[], challengeId: string };

        if (!challengeId || !challengeStore.has(challengeId)) {
            return c.json({ success: false, error: 'Challenge expired or invalid.' } as AuthResponse);
        }

        const stored = challengeStore.get(challengeId)!;

        if (Date.now() > stored.expiresAt) {
            challengeStore.delete(challengeId); // Cleanup expired
            console.log(`[Verify] Challenge ${challengeId} expired`);
            return c.json({ success: false, error: 'Challenge expired.' } as AuthResponse);
        }

        const targetRecipe = stored.recipe;

        // Log for debugging
        console.log(`[Verify] Challenge ${challengeId}: Target=${targetRecipe.name}`);
        // console.log('Received Grid:', grid); 

        // Validate grid
        const isValid = grid.every((item, index) => item === targetRecipe.grid[index]);

        if (isValid) {
            // One-time use protection: Only delete on success
            challengeStore.delete(challengeId);
            const fakeToken = `eyJh...${Date.now()}...craftcha_verified_server`;
            console.log(`[Verify] Success! Token generated.`);
            return c.json({ success: true, token: fakeToken } as AuthResponse);
        } else {
            console.log(`[Verify] Failed. Pattern mismatch.`);
            return c.json({ success: false, error: 'Crafting failed. Pattern does not match.' } as AuthResponse);
        }
    } catch (e) {
        return c.json({ success: false, error: 'Invalid request' } as AuthResponse, 400);
    }
})

const port = 3001
console.log(`Server is running on port ${port}`)

serve({
    fetch: app.fetch,
    port
})
