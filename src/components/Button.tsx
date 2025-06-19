import React, { useState } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  'aria-label'?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  'aria-label': ariaLabel,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const getButtonStyles = () => {
    const baseStyles: React.CSSProperties = {
      fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '16px',
      letterSpacing: '0.2px',
      border: 'none',
      borderRadius: '8px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease-in-out',
      position: 'relative',
      overflow: 'hidden',
      outline: 'none',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      userSelect: 'none',
      padding: size === 'small' ? '8px 16px' : size === 'large' ? '16px 32px' : '12px 24px',
      minHeight: size === 'small' ? '32px' : size === 'large' ? '56px' : '44px',
    };

    if (disabled) {
      return {
        ...baseStyles,
        backgroundColor: '#EEECEA', // SecondaryNeutral90
        color: '#A2A6AB', // Neutral70
        boxShadow: 'none',
      };
    }

    if (variant === 'primary') {
      return {
        ...baseStyles,
        backgroundColor: '#3E8500', // Primary50
        color: '#FFFFFF', // Neutral100
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      };
    }

    return baseStyles;
  };

  const getHoverStyles = (): React.CSSProperties => {
    if (disabled || variant !== 'primary') return {};
    
    return {
      backgroundColor: '#326B00', // Primary40
    };
  };

  const getPressedStyles = (): React.CSSProperties => {
    if (disabled || variant !== 'primary') return {};
    
    return {
      backgroundColor: '#62A60A', // Primary60
      boxShadow: 'inset 0 0 0 2px rgba(234, 245, 220, 0.3)', // Primary90 with 30% opacity for ripple effect
    };
  };

  const getFocusStyles = (): React.CSSProperties => {
    if (disabled || variant !== 'primary') return {};
    
    return {
      boxShadow: '0 0 0 3px #4095BF inset', // Accessibility80, 3px inside border
    };
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

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      aria-label={ariaLabel}
      className={`design-system-button design-system-button--${variant} design-system-button--${size} ${className}`}
      style={{
        ...getButtonStyles(),
        ...(isPressed ? getPressedStyles() : {}),
      }}
      onMouseEnter={(e) => {
        if (!disabled && !isPressed) {
          Object.assign(e.currentTarget.style, getHoverStyles());
        }
      }}
      onMouseLeave={(e) => {
        handleMouseLeave();
        if (!disabled) {
          Object.assign(e.currentTarget.style, getButtonStyles());
        }
      }}
      onFocus={(e) => {
        if (!disabled) {
          Object.assign(e.currentTarget.style, {
            ...getButtonStyles(),
            ...getFocusStyles(),
          });
        }
      }}
      onBlur={(e) => {
        if (!disabled) {
          Object.assign(e.currentTarget.style, getButtonStyles());
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 