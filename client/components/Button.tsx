import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className = '', 
  fullWidth = false,
  ...props 
}) => {
  // Minecraft Menu Button
  // Base Color: #C6C6C6
  // Highlight (Top/Left): #FFFFFF
  // Shadow (Bottom/Right): #555555
  // Border (Outer): #000000 (Via box shadow extension)
  
  return (
    <button 
      className={`
        relative h-10
        bg-[#c6c6c6] text-white text-shadow-mc
        font-pixel text-xl tracking-wide
        shadow-mc-btn
        border-none
        hover:bg-[#d0d0d0] hover:shadow-mc-btn-hover
        active:bg-[#a0a0a0] active:shadow-mc-btn-active active:translate-y-[2px]
        disabled:text-[#a0a0a0] disabled:shadow-mc-btn disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-[#c6c6c6]
        flex items-center justify-center
        transition-none
        ${fullWidth ? 'w-full' : 'px-8'}
        ${className}
      `}
      disabled={isLoading || props.disabled}
      {...props}
    >
      <span className="relative top-[1px]">
        {isLoading ? '...' : children}
      </span>
    </button>
  );
};