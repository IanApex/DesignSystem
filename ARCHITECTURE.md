# EchoPark Design System Architecture

## Overview
This is a token-first design system built with **Style Dictionary** that transforms design tokens from JSON files into multiple output formats (CSS variables, JavaScript/TypeScript constants, SCSS variables). The system follows a layered architecture that promotes consistency, scalability, and maintainability.

## Architecture Layers

### 1. **Design Tokens Layer** (Foundation)
**Location**: `tokens/*.json`

All design decisions are centralized as JSON token files:
- **`colors.json`**: Color palette with base, accent, neutral, feedback, and system colors
- **`typography.json`**: Font families, weights, sizes, line heights, letter spacing, and composed text styles
- **`spacing.json`**: Stack (vertical), inline (horizontal), inset (equal padding), inset-squish, and inset-stretch spacing
- **`borders.json`**: Border radius and width tokens
- **`shadows.json`**: Drop shadow levels (1-4) with varying blur and opacity
- **`opacity.json`**: Opacity levels from semitransparent to semiopaque

**Token Structure Example**:
```json
{
  "color": {
    "base": {
      "primary": {
        "50": { "value": "#3E8500", "type": "color" }
      }
    }
  }
}
```

### 2. **Token Transformation Layer** (Build System)
**Location**: `style-dictionary.config.js`

**Style Dictionary** processes tokens and generates multiple output formats:

**Input**: `tokens/**/*.json` files
**Outputs**:
- `dist/css/variables.css` - CSS custom properties (`--color-base-primary-50: #3e8500`)
- `dist/scss/_variables.scss` - SCSS variables (`$color-base-primary-50: #3e8500`)
- `dist/js/tokens.js` - JavaScript constants
- `src/tokens.ts` - TypeScript constants with type definitions

**Key Features**:
- Custom transforms and formats
- Automatic kebab-case naming for CSS variables
- Type-safe TypeScript exports

### 3. **Component Layer** (React Components)
**Location**: `src/components/`

React components that consume design tokens:

#### **PrimaryButton Component** (`PrimaryButton.tsx`)
- **Props**: `size` (large/small), `disabled`, `fullWidth`, `onClick`, etc.
- **Token Consumption**: CSS custom properties via `var()` - fully token-integrated
- **States**: Hover, pressed, focus, disabled with token-based color variations
- **Accessibility**: ARIA labels, focus indicators, keyboard navigation
- **Features**: Pill-shaped button with primary brand styling

#### **ColorPalette Component** (`ColorPalette.tsx`)
- **Purpose**: Interactive documentation component
- **Features**: Click-to-copy color values, categorized color display
- **Token Consumption**: Hard-coded color values organized by categories

### 4. **Demo Layer** (Interactive Documentation)
**Location**: `demo/` - Hybrid structure separating foundations from components

#### **Hybrid Documentation Architecture**

**Foundations** (`demo/index.html`):
- **Purpose**: Design system style guide focusing on core design tokens
- **Scope**: Colors, typography, spacing, borders, shadows, opacity levels
- **Features**: Click-to-copy functionality, token categorization, CSS variable preview
- **Target Audience**: Designers and developers learning the design system foundations

**Component Documentation** (`demo/components/`):
- **Purpose**: Detailed component examples and usage guidelines
- **Structure**: Individual HTML files per component family
- **Features**: Interactive examples, code snippets, state demonstrations
- **Navigation**: Seamless navigation between foundations and components

#### **Current Demo Structure**:
```
demo/
├── index.html              # Design Foundations (style guide)
├── components/
│   └── buttons.html        # Button components with detailed examples
└── README.md              # Documentation structure guide
```

#### **Demo Features**:

**Foundations** (`index.html`):
- **Color Swatches**: Visual preview with hex values and click-to-copy
- **Typography Showcase**: Live text samples with font specifications
- **Spacing Demos**: Visual spacing examples with measurements
- **Border Radius**: Interactive border radius previews
- **Shadow Levels**: Shadow examples with depth visualization
- **Opacity Levels**: Opacity demonstrations
- **Component Gallery**: Navigation cards to detailed component pages

**Component Pages** (`components/*.html`):
- **Interactive Examples**: All component variants, sizes, and states
- **Code Examples**: Copy-pasteable implementation code
- **Usage Guidelines**: Best practices and accessibility notes
- **State Demonstrations**: Hover, focus, pressed, disabled states
- **Navigation**: Breadcrumb navigation back to foundations

## Data Flow Architecture

```
Figma Design System
        ↓
tokens/*.json (Design Tokens)
        ↓
Style Dictionary (style-dictionary.config.js)
        ↓
Generated Files:
├── dist/css/variables.css (CSS Custom Properties)
├── dist/scss/_variables.scss (SCSS Variables)
├── dist/js/tokens.js (JavaScript Constants)
└── src/tokens.ts (TypeScript Constants)
        ↓
Components consume tokens:
├── src/components/Button.tsx
├── src/components/ColorPalette.tsx
└── demo/index.html
```

## Build System

**Package Scripts**:
- `npm run build:tokens` - Transforms tokens using Style Dictionary
- `npm run build` - Builds React components using Rollup
- `npm run dev` - Development mode with file watching

**Dependencies**:
- **Style Dictionary**: Token transformation engine
- **React/TypeScript**: Component development
- **Rollup**: Bundle components for distribution

## Token Consumption Patterns

### **CSS Variables** (Recommended)
```css
.button {
  background-color: var(--color-base-primary-50);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-inset-squish-sm);
}
```

### **JavaScript/TypeScript**
```typescript
import { tokens } from './tokens';
const primaryColor = tokens['color-base-primary-50'];
```

### **SCSS**
```scss
.button {
  background-color: $color-base-primary-50;
  border-radius: $border-radius-md;
}
```

## Component Design Principles

### **1. Token-First Approach**
All visual properties should reference design tokens, not arbitrary values.

### **2. State-Driven Design**
Components handle multiple states (hover, focus, pressed, disabled) with token-based variations.

### **3. Accessibility-First**
- Semantic HTML elements
- ARIA attributes
- Focus indicators using accessibility tokens
- Keyboard navigation support

### **4. Mobile-First Responsive**
Spacing and typography tokens support responsive design patterns.

### **5. Component Composition**
Components are designed to be composable and reusable across different contexts.

## File Organization

```
DSMCP/
├── tokens/                    # Design token definitions
│   ├── colors.json
│   ├── typography.json
│   ├── spacing.json
│   ├── borders.json
│   ├── shadows.json
│   └── opacity.json
├── src/
│   ├── components/           # React components
│   │   ├── PrimaryButton.tsx
│   │   └── ColorPalette.tsx
│   └── index.ts             # Main entry point
├── dist/                    # Generated token files
│   ├── css/variables.css
│   ├── scss/_variables.scss
│   └── js/tokens.js
├── demo/                    # Interactive documentation
│   ├── index.html          # Design foundations (style guide)
│   ├── components/
│   │   └── buttons.html    # Button component examples
│   └── README.md           # Demo structure documentation
├── style-dictionary.config.js  # Token build configuration
└── package.json            # Dependencies and scripts
```

## Key Architecture Benefits

### **Consistency**
Single source of truth for all design decisions through centralized tokens.

### **Scalability**
Token-based system scales easily as new components and patterns are added.

### **Multi-Platform Support**
Style Dictionary generates tokens for web (CSS), native (JSON), and design tools.

### **Developer Experience**
- Type-safe token consumption in TypeScript
- Interactive documentation for easy token discovery
- Hot-reload development workflow

### **Hybrid Documentation Structure**
- **Focused Foundations**: Separate token documentation from component examples
- **Scalable Component Docs**: Individual pages per component family
- **Seamless Navigation**: Easy movement between design system basics and implementation details
- **Developer-Friendly**: Quick access to both foundations and detailed component usage

### **Design-Developer Sync**
Direct connection between Figma design system and code implementation through structured tokens.

## Maintenance Guidelines

### **Adding New Tokens**
1. Add token definition to appropriate `tokens/*.json` file
2. Run `npm run build:tokens` to generate new variables
3. Update components to use new tokens
4. Test in demo environment

### **Adding New Components**
1. Create component in `src/components/`
2. Consume tokens via CSS variables or imported constants
3. Export from `src/index.ts`
4. Add examples to demo if needed

### **Updating Architecture**
Always update this ARCHITECTURE.md file when making structural changes to ensure documentation stays current. 