# EchoPark Design System - Demo Structure

This demo showcases the EchoPark Design System using a hybrid organizational approach that separates **design foundations** from **interactive components**.

## 📁 Structure

```
demo/
├── index.html              # Design Foundations (style guide)
├── components/
│   └── buttons.html        # Button components with detailed examples
└── README.md              # This file
```

## 🎨 Design Foundations (`index.html`)

The main demo page focuses on **design foundations** - the core design tokens that form the foundation of the system:

- **Colors** - Brand colors, neutrals, feedback colors
- **Typography** - Font sizes, weights, line heights, text styles  
- **Spacing** - Stack, inline, inset spacing scales
- **Borders** - Border radius and width tokens
- **Shadows** - Drop shadow levels
- **Opacity** - Transparency levels

All tokens are click-to-copy for easy development use.

## 🧩 Component Pages (`components/`)

Individual component pages provide detailed examples and usage guidelines:

- **`buttons.html`** - Button components with all variants, sizes, and states
- *More components coming soon...*

Each component page includes:
- Interactive examples
- Code snippets
- Usage guidelines
- State demonstrations
- Navigation back to foundations

## 🚀 Usage

1. **Start with Foundations**: Visit `index.html` to understand the design tokens
2. **Explore Components**: Click component cards to see detailed examples
3. **Copy Tokens**: Click any token to copy its CSS variable
4. **Implement**: Use the copied tokens and components in your application

## 💡 Benefits of This Structure

- **Focused Documentation**: Foundations vs. components are clearly separated
- **Scalable**: Easy to add new component pages without cluttering main page
- **Developer-Friendly**: Quick access to both design system basics and detailed component docs
- **Maintainable**: Each component has its own space for comprehensive examples

---

*Built with design tokens from Figma using Style Dictionary* 