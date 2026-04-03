import React, { memo } from 'react';
import { Item } from '../types';

interface InventoryItemProps {
  item: Item;
  count?: number;
}

export const InventoryItem: React.FC<InventoryItemProps> = memo(({ 
  item, 
  count = 0, 
}) => {
  return (
    <div className="w-full h-full flex items-center justify-center pointer-events-none overflow-hidden relative select-none p-0.5">
      {item.textureUrl ? (
         <img 
            src={item.textureUrl} 
            alt={item.name}
            className="w-full h-full object-contain [image-rendering:pixelated]"
            draggable={false}
            loading="lazy"
         />
      ) : (
        <div className="text-2xl">
            {item.icon}
        </div>
      )}
      
      {count > 1 && (
        <span className="absolute bottom-0 right-0 text-white font-pixel text-[20px] leading-none z-10 drop-shadow-[2px_2px_0_#3f3f3f]">
          {count}
        </span>
      )}
    </div>
  );
}, (prev, next) => {
  return prev.item.id === next.item.id && prev.count === next.count;
});