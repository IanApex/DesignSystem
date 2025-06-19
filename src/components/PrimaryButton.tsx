import React, { useState } from 'react';

interface PrimaryButtonProps {
  children: React.ReactNode;
  size?: 'large' | 'small';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  'aria-label'?: string;
  fullWidth?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  size = 'large',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  'aria-label': ariaLabel,
  fullWidth = false,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const baseStyles: React.CSSProperties = {
    // Typography from tokens
    fontFamily: 'var(--typography-font-family-base)',
    fontWeight: 'var(--typography-font-weight-medium)',
    fontSize: size === 'large' ? 'var(--typography-font-size-base)' : 'var(--typography-font-size-sm)',
    lineHeight: size === 'large' ? '16px' : '14px',
    letterSpacing: size === 'large' ? 'var(--typography-letter-spacing-normal)' : 'var(--typography-letter-spacing-tight)',
    
    // Layout from Figma specs
    height: size === 'large' ? '56px' : '40px',
    padding: size === 'large' ? '13px var(--spacing-inset-sm)' : '13px var(--spacing-inset-xs)',
    minHeight: size === 'large' ? '56px' : '40px',
    maxWidth: fullWidth ? '100%' : '336px',
    width: fullWidth ? '100%' : 'auto',
    
    // Shape and borders
    borderRadius: 'var(--border-radius-pill)',
    border: 'none',
    
    // Layout behavior
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--spacing-inline-nano)',
    position: 'relative',
    overflow: 'hidden',
    
    // Interaction
    cursor: disabled ? 'not-allowed' : 'pointer',
    userSelect: 'none',
    outline: 'none',
    textDecoration: 'none',
    
    // Transitions
    transition: 'all 0.2s ease-in-out',
    
    // Colors based on state
    backgroundColor: disabled 
      ? 'var(--color-neutral-secondary-90)' 
      : 'var(--color-base-primary-50)',
    color: disabled 
      ? 'var(--color-neutral-70)' 
      : 'var(--color-base-white)',
    
    // Shadow
    boxShadow: disabled 
      ? 'none' 
      : isPressed 
        ? 'inset 0 0 0 2px rgba(234, 245, 220, 0.3)' // Primary90 with 30% opacity for ripple
        : isFocused
          ? '0 0 0 3px var(--color-feedback-accessibility-80) inset' // 3px inside border
          : 'var(--shadow-level-1)',
  };

  const handleMouseDown = () => {
    if (!disabled) {
      setIsPressed(true);
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleMouseLeave = () => {
    setIsPressed(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // Dynamic hover/pressed background colors
  const getBackgroundColor = () => {
    if (disabled) return 'var(--color-neutral-secondary-90)';
    if (isPressed) return 'var(--color-base-primary-60)';
    return 'var(--color-base-primary-50)';
  };

  const dynamicStyles: React.CSSProperties = {
    ...baseStyles,
    backgroundColor: getBackgroundColor(),
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={(e) => {
        handleMouseLeave();
        if (!disabled) {
          e.currentTarget.style.backgroundColor = getBackgroundColor();
        }
      }}
      onFocus={handleFocus}
      onBlur={handleBlur}
      aria-label={ariaLabel}
      className={`primary-button primary-button--${size} ${fullWidth ? 'primary-button--full-width' : ''} ${className}`}
      style={dynamicStyles}
      onMouseEnter={(e) => {
        if (!disabled && !isPressed) {
          e.currentTarget.style.backgroundColor = 'var(--color-base-primary-40)';
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryButton; 