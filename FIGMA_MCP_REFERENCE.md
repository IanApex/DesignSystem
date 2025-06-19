# Figma MCP Server & Design Token Reference

## 🎯 MCP Figma Server Commands (SUCCESSFUL PATTERNS)

### 1. Get Image of Selected Node
```javascript
mcp_Figma_get_image({
  clientName: "cursor",
  clientModel: "claude-3.5-sonnet", 
  clientLanguages: "unknown",
  clientFrameworks: "unknown"
})
```

### 2. Get Code from Selected Node  
```javascript
mcp_Figma_get_code({
  clientName: "cursor",
  clientModel: "claude-3.5-sonnet",
  clientLanguages: "unknown", 
  clientFrameworks: "unknown"
})
```
**Note:** This generates Tailwind code by default. May need conversion to vanilla CSS.

### 3. Get Variable Definitions (MOST USEFUL)
```javascript
mcp_Figma_get_variable_defs({
  clientName: "cursor",
  clientModel: "claude-3.5-sonnet",
  clientLanguages: "unknown",
  clientFrameworks: "unknown"
})
```
**Returns:** JSON object with design token mappings like `{"Heading / H2 Bold": "Font(...)", "System/Alert Colors / Red60": "#F42434"}`

### 4. Get Code Connect Map
```javascript
mcp_Figma_get_code_connect_map({
  clientName: "cursor", 
  clientModel: "claude-3.5-sonnet",
  clientLanguages: "unknown",
  clientFrameworks: "unknown"
})
```

## 📁 Design Token File Structure (WORKING PATTERN)

### Token File Format (JSON)
```json
{
  "category": {
    "subcategory": {
      "tokenName": { 
        "value": "actualValue", 
        "type": "tokenType",
        "description": "optional description"
      }
    }
  }
}
```

### Supported Token Types
- `"borderRadius"` - for border radius values
- `"borderWidth"` - for border width values  
- `"opacity"` - for opacity values (0-1)
- `"boxShadow"` - for drop shadow values
- `"color"` - for color values
- `"spacing"` - for spacing values
- `"fontFamily"` - for font families
- `"fontSize"` - for font sizes
- `"fontWeight"` - for font weights
- `"lineHeight"` - for line heights
- `"letterSpacing"` - for letter spacing
- `"typography"` - for complete text styles

### Example Token Files

**borders.json**
```json
{
  "border": {
    "radius": {
      "none": { "value": "0px", "type": "borderRadius" },
      "sm": { "value": "4px", "type": "borderRadius" },
      "md": { "value": "8px", "type": "borderRadius" }
    },
    "width": {
      "hairline": { "value": "1px", "type": "borderWidth" },
      "thin": { "value": "2px", "type": "borderWidth" }
    }
  }
}
```

**shadows.json**
```json
{
  "shadow": {
    "level": {
      "1": { 
        "value": "0px 2px 6px 0px rgba(0, 0, 0, 0.2)", 
        "type": "boxShadow",
        "description": "Level 1 drop shadow"
      }
    }
  }
}
```

**typography.json**
```json
{
  "typography": {
    "fontFamily": {
      "base": { "value": "Roboto, sans-serif", "type": "fontFamily" }
    },
    "fontSize": {
      "base": { "value": "16px", "type": "fontSize" }
    },
    "textStyles": {
      "heading-1": {
        "value": {
          "fontFamily": "Roboto, sans-serif",
          "fontWeight": "300",
          "fontSize": "64px",
          "lineHeight": "100%"
        },
        "type": "typography"
      }
    }
  }
}
```

## ⚙️ Build Commands (VERIFIED WORKING)

### Build Tokens Only
```bash
npm run build:tokens
```
**Uses:** Style Dictionary to process `tokens/**/*.json` → `dist/` outputs

### Build Everything (if rollup config exists)
```bash
npm run build  
```
**Note:** This failed in our case due to missing rollup.config.js

## 📂 File Organization

```
/tokens/
  ├── colors.json      # Color tokens
  ├── borders.json     # Border radius & width tokens  
  ├── opacity.json     # Opacity level tokens
  ├── shadows.json     # Drop shadow tokens
  ├── spacing.json     # Spacing tokens (stack, inline, inset)
  └── typography.json  # Typography tokens (fonts, sizes, styles)

/dist/
  ├── css/variables.css      # CSS custom properties
  ├── js/tokens.js          # JavaScript exports
  └── scss/_variables.scss  # SCSS variables

/demo/
  └── index.html            # Interactive demo
```

## 🎨 Generated Output Examples

### CSS Variables
```css
:root {
  --border-radius-sm: 4px;
  --border-width-thin: 2px;
  --opacity-level-medium: 0.32;
  --shadow-level-1: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);
}
```

### JavaScript Exports
```javascript
export const BorderRadiusSm = "4px";
export const BorderWidthThin = "2px"; 
export const OpacityLevelMedium = "0.32";
export const ShadowLevel1 = "0px 2px 6px 0px rgba(0, 0, 0, 0.2)";
```

## 🚫 Common Pitfalls & Solutions

### 1. MCP Client Parameters
- Always include all 4 parameters: `clientName`, `clientModel`, `clientLanguages`, `clientFrameworks`
- Use `"unknown"` for languages/frameworks if unsure
- Use `"cursor"` for clientName, `"claude-3.5-sonnet"` for clientModel

### 2. Token File Structure
- ❌ Flat structure: `{"borderRadius": "4px"}`
- ✅ Nested structure: `{"border": {"radius": {"sm": {"value": "4px", "type": "borderRadius"}}}}`

### 3. Token Types
- Must match Style Dictionary expected types
- Use exact strings: `"borderRadius"` not `"border-radius"`

### 4. Build Commands  
- Use `npm run build:tokens` for Style Dictionary only
- Check package.json scripts before running `npm run build`

### 5. Shadow Values
- Include full CSS syntax: `"0px 2px 6px 0px rgba(0, 0, 0, 0.2)"`
- Don't forget rgba() format for colors with opacity

## 📋 Workflow Checklist

1. ✅ Select design tokens in Figma
2. ✅ Use `mcp_Figma_get_image` to see what's selected
3. ✅ Use `mcp_Figma_get_variable_defs` to get token data  
4. ✅ Create/update JSON files in `tokens/` directory
5. ✅ Run `npm run build:tokens` to generate outputs
6. ✅ Update demo files to showcase new tokens
7. ✅ Verify generated CSS variables and JS exports

## 🔗 Integration Examples

### CSS Usage
```css
.button {
  border-radius: var(--border-radius-md);
  border: var(--border-width-thin) solid #000;
  box-shadow: var(--shadow-level-2);
  opacity: var(--opacity-level-intense);
}
```

### JavaScript Usage  
```javascript
import { BorderRadiusMd, ShadowLevel2 } from './dist/js/tokens.js';

const styles = {
  borderRadius: BorderRadiusMd,
  boxShadow: ShadowLevel2
};
```

---
**Last Updated:** Based on successful implementation with EchoPark Design System
**MCP Server:** Figma Desktop App Integration
**Build Tool:** Style Dictionary v3.8.0 