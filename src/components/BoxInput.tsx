import React, { useState } from 'react';

interface BoxInputProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm';
  selected?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  'aria-label'?: string;
  minWidth?: string;
  width?: string;
}

export const BoxInput: React.FC<BoxInputProps> = ({
  children,
  size = 'xs',
  selected = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  'aria-label': ariaLabel,
  minWidth,
  width = 'auto',
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  // Set default dimensions based on size if not provided
  const defaultMinWidth = minWidth || (size === 'sm' ? '140px' : '175px');
  const defaultWidth = width === 'auto' ? (size === 'sm' ? '238px' : 'auto') : width;

  // Size-specific styles
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          height: '64px',
          padding: 'var(--spacing-inset-sm)', // 24px all sides
          minHeight: '64px',
        };
      case 'xs':
      default:
        return {
          height: '48px',
          padding: 'var(--spacing-inset-squish-nano)', // 8px 16px 
          minHeight: '48px',
        };
    }
  };

  const sizeStyles = getSizeStyles();

  const baseStyles: React.CSSProperties = {
    // Typography from tokens
    fontFamily: 'var(--typography-font-family-base)',
    fontWeight: 'var(--typography-font-weight-regular)',
    fontSize: 'var(--typography-font-size-base)',
    lineHeight: '24px',
    letterSpacing: 'var(--typography-letter-spacing-none)',
    
    // Layout from design tokens - size-specific
    ...sizeStyles,
    minWidth: defaultMinWidth,
    width: defaultWidth,
    
    // Shape and borders
    borderRadius: 'var(--border-radius-md)', // 8px from tokens
    
    // Layout behavior
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--spacing-inline-nano)', // 8px
    position: 'relative',
    overflow: 'hidden',
    boxSizing: 'border-box',
    
    // Interaction
    cursor: disabled ? 'not-allowed' : 'pointer',
    userSelect: 'none',
    outline: 'none',
    textDecoration: 'none',
    
    // Transitions
    transition: 'all 0.2s ease-in-out',
    
    // Colors based on state
    backgroundColor: disabled 
      ? 'var(--color-neutral-95)' 
      : 'var(--color-base-white)',
    color: disabled 
      ? 'var(--color-neutral-70)' 
      : 'var(--color-base-parkGray0)',
    
    // Border based on state
    border: disabled 
      ? '1px solid var(--color-neutral-90)'
      : isFocused && selected
        ? '3px solid var(--color-feedback-accessibility-80)' // Focus Selected state
        : selected 
          ? '2px solid var(--color-base-primary-50)' // Selected state
          : '1px solid var(--color-neutral-90)', // Default and Hover border
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

  // Dynamic background color for hover state
  const getBackgroundColor = () => {
    if (disabled) return 'var(--color-neutral-95)';
    return 'var(--color-base-white)';
  };

  const dynamicStyles: React.CSSProperties = {
    ...baseStyles,
    backgroundColor: getBackgroundColor(),
    border: disabled 
      ? '1px solid var(--color-neutral-90)'
      : isFocused && selected
        ? '3px solid var(--color-feedback-accessibility-80)'
        : selected 
          ? '2px solid var(--color-base-primary-50)'
          : '1px solid var(--color-neutral-90)',
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
        if (!disabled && !selected) {
          // Apply hover background for non-selected state
          e.currentTarget.style.backgroundColor = 'var(--color-neutral-95)';
        }
      }}
      onFocus={handleFocus}
      onBlur={handleBlur}
      aria-label={ariaLabel}
      aria-pressed={selected}
      className={`box-input box-input--${size} ${selected ? 'box-input--selected' : ''} ${disabled ? 'box-input--disabled' : ''} ${className}`}
      style={dynamicStyles}
      onMouseEnter={(e) => {
        if (!disabled && !selected) {
          // Hover state - light gray background
          e.currentTarget.style.backgroundColor = 'var(--color-neutral-95)';
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default BoxInput; 