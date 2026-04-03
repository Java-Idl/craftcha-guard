import React, { useState, useEffect, useCallback, memo } from 'react';
import { ItemId, Recipe, Item } from '../types';
import { ITEMS } from '../constants';
import { ApiServer } from '../services/api';
import { InventoryItem } from './InventoryItem';

interface CraftchaProps {
  onVerify: (token: string) => void;
}

// -- Helpers --

// -- Optimized Cursor Tracker --
// Isolates the high-frequency mouse updates from the main component tree
const CursorFollower = memo(({ heldItem, hoveredItem }: { heldItem: ItemId | null, hoveredItem: Item | null }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!heldItem && !hoveredItem) return;

    let rAF: number;
    const updatePos = (e: MouseEvent) => {
      // Throttle updates to screen refresh rate
      cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('mousemove', updatePos);
    return () => {
      window.removeEventListener('mousemove', updatePos);
      cancelAnimationFrame(rAF);
    };
  }, [heldItem, hoveredItem]);

  if (!heldItem && !hoveredItem) return null;

  return (
    <>
      {heldItem && (
        <div
          className="fixed pointer-events-none z-[100]"
          style={{
            left: pos.x,
            top: pos.y,
            transform: 'translate(-50%, -50%) scale(1.1)'
          }}
        >
          <InventoryItem item={ITEMS[heldItem]} />
        </div>
      )}

      {hoveredItem && !heldItem && (
        <div
          className="fixed z-[9999] pointer-events-none flex flex-col gap-0.5 px-2 py-1.5 bg-[#100010f0] border-2 border-[#2f0088] shadow-[4px_4px_4px_rgba(0,0,0,0.5)] rounded-[2px]"
          style={{
            left: pos.x + 16,
            top: pos.y - 32,
            borderColor: '#300095',
          }}
        >
          <span className="text-white font-pixel text-xl leading-none drop-shadow-md whitespace-nowrap pt-0.5">
            {hoveredItem.name}
          </span>
          <span className="text-[#aaaaaa] font-pixel text-lg leading-none italic">
            minecraft:{hoveredItem.id}
          </span>
        </div>
      )}
    </>
  );
});

// -- Styled Slot Component --
interface SlotProps {
  onClick?: () => void;
  children?: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isOutput?: boolean;
  className?: string;
}

const Slot: React.FC<SlotProps> = memo(({
  onClick,
  children,
  onMouseEnter,
  onMouseLeave,
  isOutput = false,
  className = ''
}) => (
  <div
    className={`
        relative group bg-[#8b8b8b]
        ${isOutput ? 'w-[72px] h-[72px]' : 'w-9 h-9'} 
        flex items-center justify-center
        select-none
        ${className}
    `}
    style={{
      boxShadow: 'inset 2px 2px 0px #373737, inset -2px -2px 0px #ffffff'
    }}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {children}
    <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 pointer-events-none z-10" />
  </div>
));

export const Craftcha: React.FC<CraftchaProps> = ({ onVerify }) => {
  const [loading, setLoading] = useState(false);
  const [challenge, setChallenge] = useState<Recipe | null>(null);

  const [grid, setGrid] = useState<ItemId[]>(Array(9).fill(ItemId.EMPTY));
  const [inventory, setInventory] = useState<ItemId[]>(Array(36).fill(ItemId.EMPTY));

  const [heldItem, setHeldItem] = useState<ItemId | null>(null);
  const [outputItem, setOutputItem] = useState<ItemId | null>(null);

  const [hoveredItem, setHoveredItem] = useState<Item | null>(null);

  useEffect(() => {
    loadChallenge();
  }, []);

  useEffect(() => {
    if (!challenge) return;
    const match = grid.every((id, idx) => id === challenge.grid[idx]);
    setOutputItem(match ? (challenge.targetItemId as ItemId) : null);
  }, [grid, challenge]);


  const loadChallenge = async () => {
    setLoading(true);
    setGrid(Array(9).fill(ItemId.EMPTY));
    setHeldItem(null);
    setOutputItem(null);

    try {
      const newChallenge = await ApiServer.getChallenge();
      setChallenge(newChallenge);
      setInventory(newChallenge.inventory);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = useCallback(async () => {
    if (!outputItem || !challenge) return;

    setLoading(true);
    try {
      const response = await ApiServer.verifyCaptcha(grid, challenge.challengeId);
      if (response.success && response.token) {
        onVerify(response.token!);
      } else {
        alert("Verification failed.");
      }
    } catch (e) {
      alert("Error verifying.");
    } finally {
      setLoading(false);
    }
  }, [outputItem, challenge, grid, onVerify]);

  const onSlotClick = (type: 'grid' | 'inv', index: number) => {
    if (type === 'grid') {
      const current = grid[index];
      const newGrid = [...grid];
      newGrid[index] = heldItem || ItemId.EMPTY;
      setGrid(newGrid);
      setHeldItem(current !== ItemId.EMPTY ? current : null);
    } else {
      const current = inventory[index];
      const newInv = [...inventory];
      newInv[index] = heldItem || ItemId.EMPTY;
      setInventory(newInv);
      setHeldItem(current !== ItemId.EMPTY ? current : null);
    }
  };

  if (!challenge && !loading) return <div className="text-white text-center font-pixel text-2xl">Loading chunk...</div>;

  return (
    <>
      <CursorFollower heldItem={heldItem} hoveredItem={hoveredItem} />

      <div
        className={`relative bg-[#c6c6c6] p-[2px] w-auto inline-block mx-auto select-none rounded-[2px] ${heldItem ? 'cursor-none' : 'cursor-default'}`}
        style={{
          boxShadow: 'inset 4px 4px 0px #ffffff, inset -4px -4px 0px #555555, 6px 6px 0px rgba(0,0,0,0.5)'
        }}
      >

        <div className="p-3 flex flex-col items-start gap-3 text-[#404040]">

          <span className="font-pixel text-2xl text-shadow-none ml-1">Crafting</span>

          <div className="flex flex-row items-start gap-4 pl-4 mb-2">
            <div className="grid grid-cols-3 gap-0">
              {grid.map((itemId, index) => (
                <Slot
                  key={`craft-${index}`}
                  onClick={() => onSlotClick('grid', index)}
                  onMouseEnter={() => itemId !== ItemId.EMPTY ? setHoveredItem(ITEMS[itemId]) : null}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {itemId !== ItemId.EMPTY && <InventoryItem item={ITEMS[itemId]} />}
                </Slot>
              ))}
            </div>

            <div className="flex flex-row items-center gap-6 h-[108px]">
              <div className="w-[50px] flex justify-center opacity-80">
                <svg width="48" height="30" viewBox="0 0 48 30" fill="none" shapeRendering="crispEdges">
                  <path d="M2 10H30V2L48 15L30 28V20H2V10Z" fill="#8b8b8b" />
                  <path d="M2 9H30V2L47 14L30 27V19H2V9Z" fill="#c6c6c6" />
                </svg>
              </div>

              <Slot isOutput onClick={handleVerify}>
                {outputItem && ITEMS[outputItem] && (
                  <div className="opacity-100 hover:scale-110 transition-transform">
                    <InventoryItem item={ITEMS[outputItem]} />
                  </div>
                )}
                {!outputItem && <div className="text-gray-400 text-xs text-center font-pixel p-1 leading-tight select-none">Make Item</div>}
              </Slot>
            </div>
          </div>

          <div className="w-full text-center mt-[-5px] mb-1">
            <span className="font-pixel text-xl text-[#404040]">
              Required: <strong className="text-black">{challenge?.name}</strong>
            </span>
          </div>

          <span className="font-pixel text-2xl mt-1 text-shadow-none ml-1">Inventory</span>

          <div className="flex flex-col gap-1">
            <div className="grid grid-cols-9 gap-0">
              {inventory.slice(0, 27).map((itemId, idx) => (
                <Slot
                  key={`inv-${idx}`}
                  onClick={() => onSlotClick('inv', idx)}
                  onMouseEnter={() => itemId !== ItemId.EMPTY ? setHoveredItem(ITEMS[itemId]) : null}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {itemId !== ItemId.EMPTY && <InventoryItem item={ITEMS[itemId]} />}
                </Slot>
              ))}
            </div>
            <div className="h-[4px]"></div>
            <div className="grid grid-cols-9 gap-0">
              {inventory.slice(27, 36).map((itemId, idx) => (
                <Slot
                  key={`hotbar-${idx}`}
                  onClick={() => onSlotClick('inv', 27 + idx)}
                  onMouseEnter={() => itemId !== ItemId.EMPTY ? setHoveredItem(ITEMS[itemId]) : null}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {itemId !== ItemId.EMPTY && <InventoryItem item={ITEMS[itemId]} />}
                </Slot>
              ))}
            </div>
          </div>

          <div className="w-full flex justify-between px-1 mt-1">
            <button onClick={loadChallenge} className="text-[#8b0000] hover:text-[#ff0000] hover:underline font-pixel text-lg transition-colors">
              Reset
            </button>
            <button onClick={loadChallenge} className="text-[#404040] hover:text-black hover:underline font-pixel text-lg transition-colors">
              Refresh
            </button>
          </div>

        </div>
      </div>
    </>
  );
};