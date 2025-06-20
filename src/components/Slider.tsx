import React, { useState, useRef, useCallback, useEffect } from 'react';

interface SliderProps {
  min?: number;
  max?: number;
  value?: number;
  defaultValue?: number;
  step?: number;
  disabled?: boolean;
  minLabel?: string;
  maxLabel?: string;
  onChange?: (value: number) => void;
  onChangeCommitted?: (value: number) => void;
  className?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  id?: string;
}

export const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  value: controlledValue,
  defaultValue = min,
  step = 1,
  disabled = false,
  minLabel,
  maxLabel,
  onChange,
  onChangeCommitted,
  className = '',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  id,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(controlledValue ?? defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  // Calculate percentage for positioning
  const percentage = ((currentValue - min) / (max - min)) * 100;

  const updateValue = useCallback((newValue: number) => {
    const clampedValue = Math.max(min, Math.min(max, newValue));
    const steppedValue = Math.round(clampedValue / step) * step;
    
    if (!isControlled) {
      setInternalValue(steppedValue);
    }
    
    onChange?.(steppedValue);
  }, [min, max, step, onChange, isControlled]);

  const getValueFromPosition = useCallback((clientX: number) => {
    if (!sliderRef.current) return currentValue;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const position = (clientX - rect.left) / rect.width;
    const newValue = min + (position * (max - min));
    return newValue;
  }, [min, max, currentValue]);

  const handleMouseDown = (event: React.MouseEvent) => {
    if (disabled) return;
    
    event.preventDefault();
    const newValue = getValueFromPosition(event.clientX);
    updateValue(newValue);
    setIsDragging(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    let newValue = currentValue;
    
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault();
        newValue = Math.min(max, currentValue + step);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault();
        newValue = Math.max(min, currentValue - step);
        break;
      case 'Home':
        event.preventDefault();
        newValue = min;
        break;
      case 'End':
        event.preventDefault();
        newValue = max;
        break;
      case 'PageUp':
        event.preventDefault();
        newValue = Math.min(max, currentValue + step * 10);
        break;
      case 'PageDown':
        event.preventDefault();
        newValue = Math.max(min, currentValue - step * 10);
        break;
      default:
        return;
    }
    
    updateValue(newValue);
  };

  // Mouse move and up handlers
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (event: MouseEvent) => {
      const newValue = getValueFromPosition(event.clientX);
      updateValue(newValue);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      onChangeCommitted?.(currentValue);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, getValueFromPosition, updateValue, onChangeCommitted, currentValue]);

  const trackStyles: React.CSSProperties = {
    position: 'relative',
    width: '279px',
    height: '4px',
    backgroundColor: 'var(--color-neutral-80)',
    borderRadius: 'var(--border-radius-pill)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    touchAction: 'none',
  };

  const progressStyles: React.CSSProperties = {
    position: 'absolute',
    left: '0',
    top: '0',
    height: '100%',
    width: `${percentage}%`,
    backgroundColor: disabled ? 'var(--color-neutral-70)' : 'var(--color-base-primary-50)',
    borderRadius: 'var(--border-radius-pill)',
    transition: isDragging ? 'none' : 'width 0.2s ease',
  };

  const thumbStyles: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: `${percentage}%`,
    transform: 'translate(-50%, -50%)',
    width: '24px',
    height: '24px',
    backgroundColor: disabled ? 'var(--color-neutral-70)' : 'var(--color-base-primary-50)',
    borderRadius: 'var(--border-radius-circular)',
    border: '2px solid var(--color-base-white)',
    cursor: disabled ? 'not-allowed' : 'grab',
    boxShadow: isFocused 
      ? '0 0 0 3px var(--color-feedback-accessibility-80)'
      : 'var(--shadow-level-1)',
    transition: isDragging ? 'none' : 'all 0.2s ease',
    outline: 'none',
  };

  const thumbInnerStyles: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '12px',
    height: '12px',
    backgroundColor: 'var(--color-base-white)',
    borderRadius: 'var(--border-radius-circular)',
  };

  const labelContainerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '279px',
    marginTop: 'var(--spacing-stack-xxxs)',
    fontFamily: 'var(--typography-font-family-base)',
    fontSize: 'var(--typography-font-size-sm)',
    lineHeight: 'var(--typography-line-height-tight)',
    color: 'var(--color-neutral-40)',
  };

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 'var(--spacing-stack-nano)',
  };

  return (
    <div 
      className={`slider ${disabled ? 'slider--disabled' : ''} ${className}`}
      style={containerStyles}
      {...props}
    >
      <div
        ref={sliderRef}
        style={trackStyles}
        onMouseDown={handleMouseDown}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={currentValue}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        id={id}
      >
        <div style={progressStyles} />
        <div
          ref={thumbRef}
          style={thumbStyles}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div style={thumbInnerStyles} />
        </div>
      </div>
      
      {(minLabel || maxLabel) && (
        <div style={labelContainerStyles}>
          <span>{minLabel || min}</span>
          <span>{maxLabel || max}</span>
        </div>
      )}
    </div>
  );
};

export default Slider; 