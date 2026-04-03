import { ItemId, Recipe, Challenge, AuthResponse } from '../types';

const API_BASE = '/api';

export const ApiServer = {
    getChallenge: async (): Promise<Challenge> => {
        try {
            const res = await fetch(`${API_BASE}/challenge`);
            if (!res.ok) throw new Error('Network response was not ok');
            return await res.json();
        } catch (error) {
            console.error("Failed to fetch challenge", error);
            throw error;
        }
    },

    verifyCaptcha: async (grid: ItemId[], challengeId: string): Promise<AuthResponse> => {
        try {
            const res = await fetch(`${API_BASE}/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ grid, challengeId })
            });
            return await res.json();
        } catch (error) {
            console.error("Failed to verify", error);
            return { success: false, error: 'Network error' };
        }
    }
};
