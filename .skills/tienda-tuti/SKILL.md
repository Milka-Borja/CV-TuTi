# Skill Guide: Tiendas TuTi Brand Identity & UI Styling

This document outlines the design tokens, color palette, typography, and styling rules required to customize the CV Creator application to reflect the corporate identity of **Tiendas TuTi** ("Alto en calidad, bajo en precio").

---

## 1. Color Palette

Based on the official TuTi logo provided (`image_9026bc.png`), the application must replace its default blue palette with high-contrast, bold retail colors:

| Color Role | Hex Code | Description & Usage |
| :--- | :--- | :--- |
| **Primary (TuTi Blue)** | `#002D82` | Used for headers, primary buttons, navigation bars, and main borders. |
| **Accent / Brand Yellow** | `#FFDE00` | Used for highlights, badge counters, active states, call-to-actions, and secondary accents. |
| **Background / Neutral Light** | `#F4F6F9` | Clean, crisp off-white background for screens and form wrappers. |
| **Card Background** | `#FFFFFF` | Pure white containers to ensure high readability. |
| **Text Main** | `#1A1A1A` | Dark charcoal/black for primary headings and body text to maximize contrast. |
| **Text Muted** | `#666666` | Secondary gray text for dates, subtitles, and placeholders. |
| **Success / Valid** | `#00875A` | Clean green for completed sections (`✓ Completado`). |
| **Error / Alert** | `#D32F2F` | Vibrant red for delete actions and input validation errors. |

---

## 2. Typography & UI Style

- **Font Weight & Hierarchy:** 
  - Bold, impactful headers reflecting retail signages (`fontWeight: "bold"` or `"800"`).
  - Clean sans-serif font family matching React Native defaults (`System` or `Roboto`).
- **Containers & Borders:**
  - Distinct rectangular or slightly rounded containers (`borderRadius: 6` or `8`).
  - High-contrast border definitions using TuTi Blue (`#002D82`) or subtle gray dividers.
- **Buttons & Touchables:**
  - Primary buttons must feature the bold TuTi Blue background (`#002D82`) with bright white or TuTi Yellow text (`#FFDE00`).
  - Action cards and banners can integrate yellow accent borders (`borderColor: "#FFDE00"`, `borderWidth: 2`) to emulate the iconic TuTi signboard aesthetic.

---

## 3. Implementation Rules for Components

When updating components (`index.tsx`, `InputField.tsx`, `NavigationButton.tsx`, `CVPreview.tsx`, etc.), ensure:
1. **Global Constants:** Create a theme file or constants object for colors:
   ```typescript
   export const TuTiTheme = {
     primary: "#002D82",
     secondary: "#FFDE00",
     background: "#F4F6F9",
     textMain: "#1A1A1A",
     textMuted: "#666666",
     error: "#D32F2F",
     success: "#00875A",
   };
   ```
2. **Visual Consistency:** Replace any legacy blue (`#3498db`) with TuTi Blue (`#002D82`) and use yellow (`#FFDE00`) for standout badges or highlight bars.