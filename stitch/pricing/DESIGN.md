# Design System Specification

## 1. Overview & Creative North Star: Obsidian Architect
The Creative North Star for this design system is **"The Obsidian Architect."** It is a visual philosophy rooted in high-contrast precision, where the interface feels like an illuminated command center carved from dark glass and matte obsidian. 

Instead of relying on the soft, bubbly aesthetics of consumer apps, this system utilizes "Industrial Precision." It breaks the standard dashboard template through intentional tonal depth and a "monolithic" layout. We prioritize information density and clarity by using sharp, authoritative edges and surgical hits of color against a deep, ink-black foundation. The goal is to make the user feel like they are interacting with a high-performance engine: silent, powerful, and impeccably organized.

---

## 2. Colors & Surface Philosophy
The palette is dominated by `surface_container_lowest` (#0e0e0e) and `background` (#131313). Color is used only as a data-carrier, never for decoration.

### Functional Palette
- **Primary (Success/GET/Running):** `#22c55e` — Use for healthy states and retrieval actions.
- **Secondary (Info/POST):** `#3b82f6` — Use for creation and informational callouts.
- **Tertiary (Warning/PUT):** `#f7bf1e` — Use for updates and cautionary states.
- **Error (Danger/DELETE):** `#ffb4ab` — Reserved exclusively for destructive actions.

### The "No-Line" Rule
Explicitly prohibit 1px solid borders for sectioning large layout blocks. Boundaries must be defined through **background color shifts**. 
- A main content area uses `surface`.
- A sidebar uses `surface_container_low`.
- Nested cards use `surface_container_high`.
This creates an "etched" look rather than a "boxed" look.

### Surface Hierarchy & Nesting
Treat the UI as stacked sheets of volcanic glass. 
- **Base Level:** `surface` (#131313)
- **Secondary Containers:** `surface_container_low` (#1c1b1b) for sidebars or grouping.
- **Active Cards:** `surface_container_highest` (#353534) for items requiring immediate focus.

### The "Glass & Signature Texture" Rule
For floating elements (modals, popovers), utilize **Glassmorphism**. Apply a semi-transparent `surface_variant` with a 12px backdrop-blur. To add soul to the interface, use a subtle linear gradient on primary CTAs—transitioning from `primary` (#4be277) to `primary_container` (#22c55e) at a 145-degree angle.

---

## 3. Typography: The Editorial Grid
We use **Inter** exclusively. It is chosen for its mathematical precision and readability at small scales.

| Role | Token | Size | Weight | Intent |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-md` | 2.75rem | 700 | Impactful data points / Hero numbers |
| **Headline**| `headline-sm`| 1.5rem | 600 | Page titles and primary section headers |
| **Title**   | `title-sm`   | 1rem | 500 | Card titles and navigational labels |
| **Body**    | `body-md`    | 0.875rem| 400 | Primary reading text and metadata |
| **Label**   | `label-sm`   | 0.6875rem| 700 | Status tags (GET, POST), uppercase only |

**The Hierarchy Rule:** Use `on_surface_variant` (#bccbb9) for secondary metadata to create a "recessed" text effect, ensuring the `on_surface` (#e5e2e1) primary data remains the focal point.

---

## 4. Elevation & Depth
In this design system, depth is a function of light, not structure.

- **The Layering Principle:** Achieve lift by "stacking." A `surface_container_lowest` card sitting on a `surface_container_low` background creates a natural inset look.
- **Ambient Shadows:** Standard shadows are forbidden. When an element must float (e.g., a dropdown), use a "Ghost Shadow": `0px 10px 30px rgba(0, 0, 0, 0.5)`. The shadow must be dark and expansive, never grey.
- **The "Ghost Border" Fallback:** If a container requires a border for accessibility, use the `outline_variant` token (#3d4a3d) at 20% opacity. This creates a "razor-thin" edge that mimics the way light catches the corner of a dark object.
- **Corner Radii:** Use a strict `DEFAULT: 0.25rem` (4px) for all components to maintain the "Architect" aesthetic.

---

## 5. Components

### Buttons
- **Primary:** Gradient fill (`primary` to `primary_container`), `on_primary` text. Sharp 4px corners.
- **Secondary:** Transparent background with a "Ghost Border" (`outline_variant` at 20%).
- **Icon Buttons:** Use `surface_container_highest` as a base with no border.

### Status Chips (Methods)
Strictly follow the color-coding for API methods:
- **GET:** Background `#22c55e` (15% opacity), Text `#22c55e`.
- **POST:** Background `#3b82f6` (15% opacity), Text `#3b82f6`.
- **DELETE:** Background `#93000a` (20% opacity), Text `#ffb4ab`.
- All chips use `label-sm` typography and 4px rounding.

### Input Fields
Inputs should feel like "voids" in the interface.
- **State:** Fill with `surface_container_lowest`.
- **Border:** 1px "Ghost Border" on the bottom only, or a subtle `outline_variant` during focus.
- **Active State:** The border glows with a 1px solid `primary` stroke.

### Lists & Tables
**Forbid the use of divider lines.** Separate list items using 8px of vertical whitespace or a subtle background hover state change to `surface_container_high`. In tables, the header row should be `surface_container_low` to anchor the data.

---

## 6. Do's and Don'ts

### Do
- **Do** use `letter-spacing: -0.01em` on all headlines to increase the "premium editorial" feel.
- **Do** use high-contrast status indicators (e.g., a glowing 8px dot for "Running" states).
- **Do** allow for asymmetrical layouts; let one column be significantly wider than the other to guide the eye.

### Don't
- **Don't** use pure white (#ffffff). It is too harsh. Always use `on_surface` (#e5e2e1).
- **Don't** use large rounded corners. Anything over 4px breaks the "Obsidian Architect" precision.
- **Don't** use standard 1px grey borders to separate sections. If the colors are the same, the sections are the same.
- **Don't** use "Drop Shadows" on cards. Use tonal layering instead.