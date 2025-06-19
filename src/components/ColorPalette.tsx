import React from 'react';

interface ColorSwatchProps {
  name: string;
  value: string;
  category: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ name, value, category }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div 
      className="color-swatch"
      onClick={copyToClipboard}
      style={{
        cursor: 'pointer',
        border: '1px solid #e5e5e5',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <div 
        style={{
          backgroundColor: value,
          height: '80px',
          width: '100%'
        }}
      />
      <div style={{
        padding: '12px',
        backgroundColor: 'white'
      }}>
        <div style={{
          fontSize: '12px',
          fontWeight: '600',
          color: '#374151',
          marginBottom: '4px'
        }}>
          {name}
        </div>
        <div style={{
          fontSize: '11px',
          color: '#6b7280',
          fontFamily: 'monospace'
        }}>
          {value}
        </div>
      </div>
    </div>
  );
};

interface ColorSectionProps {
  title: string;
  colors: Record<string, string>;
  description?: string;
}

const ColorSection: React.FC<ColorSectionProps> = ({ title, colors, description }) => {
  return (
    <div style={{ marginBottom: '40px' }}>
      <h3 style={{
        fontSize: '20px',
        fontWeight: '600',
        color: '#111827',
        marginBottom: '8px',
        textTransform: 'capitalize'
      }}>
        {title}
      </h3>
      {description && (
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          marginBottom: '16px',
          maxWidth: '600px'
        }}>
          {description}
        </p>
      )}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: '16px'
      }}>
        {Object.entries(colors).map(([name, value]) => (
          <ColorSwatch
            key={name}
            name={name}
            value={value}
            category={title}
          />
        ))}
      </div>
    </div>
  );
};

export const ColorPalette: React.FC = () => {
  // EchoPark Design System Colors from Figma
  const colorCategories = {
    'Base Colors': {
      colors: {
        'Primary 90': '#EAF5DC',
        'Primary 60': '#62A60A',
        'Primary 55': '#5C9C08',
        'Primary 50': '#3E8500',
        'Primary 40': '#326B00',
        'White': '#FFFFFF',
        'Park Gray 0': '#242C33'
      },
      description: 'Base colors form the foundation of the color palette, use sparingly on primary actions to ensure consistency and brand recognition.'
    },
    'Accent Colors': {
      colors: {
        'Accent 90': '#E6F1F5',
        'Accent 85': '#C8E0E9',
        'Accent 80': '#B2D4E1',
        'Accent 40': '#006FA6'
      },
      description: 'Accent colors are used sparingly to highlight important elements and actions, adding vibrancy and focus to the design.'
    },
    'Neutral Colors': {
      colors: {
        'Neutral 0': '#242C33',
        'Neutral 20': '#313D47',
        'Neutral 40': '#666B70',
        'Neutral 70': '#A2A6AB',
        'Neutral 80': '#BCBFC2',
        'Neutral 85': '#D4D7D9',
        'Neutral 90': '#E8E9EB',
        'Neutral 95': '#F4F5F7',
        'Neutral 100': '#FFFFFF'
      },
      description: 'Neutral colors provide balance and support for other colors in the palette, often used for backgrounds, borders, and text to maintain readability and contrast.'
    },
    'Secondary Neutral Colors': {
      colors: {
        'Secondary Neutral 40': '#85776F',
        'Secondary Neutral 70': '#A39A93',
        'Secondary Neutral 80': '#BDB7B3',
        'Secondary Neutral 85': '#DAD6D3',
        'Secondary Neutral 90': '#EEECEA',
        'Secondary Neutral 95': '#F5F4F3'
      },
      description: 'Secondary neutral colors provide additional balance and support, offering warm undertones for specific design contexts.'
    },
    'Tertiary Neutral Colors': {
      colors: {
        'Tertiary Neutral 70': '#E1D0A5',
        'Tertiary Neutral 80': '#EBDDB9',
        'Tertiary Neutral 85': '#F0E9DA',
        'Tertiary Neutral 90': '#F5F1E9',
        'Tertiary Neutral 95': '#FAF9F5'
      },
      description: 'Tertiary neutral colors provide subtle, warm-toned backgrounds and supporting elements with a cream/beige palette.'
    },
    'Feedback Colors': {
      colors: {
        'Warning 90': '#FFEBEC',
        'Warning 50': '#F42434',
        'Warning 40': '#B30715',
        'Alert 90': '#FEF6E7',
        'Alert 80': '#FACD46',
        'Alert 70': '#FF8500',
        'Alert 50': '#AC6000',
        'Accessibility 80': '#4095BF'
      },
      description: 'Feedback colors communicate the status and outcomes of user actions, using specific colors to indicate success, error, warning, or informational messages.'
    }
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '24px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: '700',
          color: '#111827',
          marginBottom: '8px'
        }}>
          EchoPark Design System
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#6b7280',
          marginBottom: '16px'
        }}>
          Official Color Palette - Click any color to copy its value
        </p>
        <p style={{
          fontSize: '14px',
          color: '#9ca3af',
          fontStyle: 'italic'
        }}>
          Colors imported directly from your Figma design system
        </p>
      </div>

      {Object.entries(colorCategories).map(([category, { colors, description }]) => (
        <ColorSection
          key={category}
          title={category}
          colors={colors}
          description={description}
        />
      ))}
    </div>
  );
};

export default ColorPalette; 