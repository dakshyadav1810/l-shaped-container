L-shaped Notched Card
======================

Overview
--------
This repository provides a minimal L-shaped notched card component implemented with HTML, CSS, and vanilla JavaScript. The component includes an upper L-shaped panel with a notch for two pill buttons and a lower content area.

Usage
-----
- Open [index.html](index.html) in a web browser.

Files
-----
- [index.html](index.html) — Demo markup and layout.
- [style.css](style.css) — Styles and design tokens; edit variables to customize appearance.
- [l-notched-card.js](l-notched-card.js) — Script that constructs the SVG path, positions the notch buttons, and manages interactions.

Customization
-------------
- Adjust visual tokens in [style.css](style.css) to change colors, spacing, and radii.
- Modify `DEFAULT_CORNER_RADIUS` and `BUTTON_NUDGE_PX` in [l-notched-card.js](l-notched-card.js) to fine-tune notch geometry.


Component breakdown
-------------------
The component is composed of two SVG shapes that visually combine to form the L-shaped card:

- The top SVG draws the L-shaped contour and includes the stroke so the outline does not overlap the lower shape.
- The bottom SVG renders the lower content bar and is visually aligned beneath the top SVG.

JavaScript generates the top SVG path at runtime and uses the path's horizontal (`H`) coordinate as the source of truth for the notch position. That viewBox coordinate is converted to pixels (based on the SVG viewBox and container width) and applied to the `.notch-buttons` container to position the pill buttons precisely at the cut-out.

Styling and layout rely on CSS variables in `style.css` and flex-based pill buttons for expansion/collapse behavior.
>>>>>>> 2d8a917 (init)
