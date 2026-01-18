(function () {
  'use strict';

  // Constants
  const VIEWBOX_WIDTH = 500; // SVG viewBox width used for scaling
  const DEFAULT_CORNER_RADIUS = 12; // consistent 12px radius
  const BUTTON_NUDGE_PX = 20; // extra px to nudge buttons inside the notch

  // Build the SVG path string for the top L-shape given container metrics.
  function buildTopPath(containerWidthPx, fallbackLeftPx) {
    const notchXView = (fallbackLeftPx / containerWidthPx) * VIEWBOX_WIDTH;
    const r = DEFAULT_CORNER_RADIUS;
    const h = notchXView - r;

    const parts = [
      `M16 0`,
      `H${h}`,
      `C${h + 8} 0 ${notchXView} 8 ${notchXView} ${r}`,
      `V48`,
      `C${notchXView} 56 ${notchXView + 8} 64 ${notchXView + r} 64`,
      `H484`,
      `C492 64 500 72 500 80`,
      `H0`,
      `V16`,
      `C0 7 7 0 16 0`,
      `Z`
    ];

    return parts.join(' ').replace(/\s+/g, ' ').trim();
  }

  // Update the top SVG path and position the notch buttons to match it.
  function updateNotchAndButtons() {
    const container = document.querySelector('.card-container');
    const label = document.querySelector('.label');
    const notchButtons = document.querySelector('.notch-buttons');
    const topSvg = document.querySelector('.card-top-bg');
    if (!container || !label || !notchButtons || !topSvg) return;

    const labelRect = label.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const labelEndX = labelRect.right - containerRect.left;

    // fallback position in pixels (used to compute an initial notch position)
    const fallbackLeft = labelEndX + 24;
    const containerWidth = containerRect.width;

    // Build and set the top path
    const newPath = buildTopPath(containerWidth, fallbackLeft);
    const pathEl = topSvg.querySelector('path');
    if (pathEl) pathEl.setAttribute('d', newPath);

    // Extract the H coordinate from the path and convert it back to pixels
    const hMatch = newPath.match(/M[^H]*H\s*([0-9]+(?:\.[0-9]+)?)/i);
    if (hMatch) {
      const hView = parseFloat(hMatch[1]);
      const viewBoxWidth = topSvg.viewBox && topSvg.viewBox.baseVal ? topSvg.viewBox.baseVal.width : VIEWBOX_WIDTH;
      const pixelLeft = (hView / viewBoxWidth) * containerWidth;
      notchButtons.style.left = Math.max(0, Math.round(pixelLeft + BUTTON_NUDGE_PX)) + 'px';
    } else {
      // fallback if parsing fails
      notchButtons.style.left = fallbackLeft + 'px';
    }
  }

  // Update the content and visual state when a size is chosen
  function setActiveSize(size) {
    const btn24 = document.getElementById('btn-24');
    const btn20 = document.getElementById('btn-20');
    const cardText = document.getElementById('card-text');
    const cardIcon = document.getElementById('card-icon');
    if (!btn24 || !btn20) return;

    if (size === '24') {
      btn24.classList.add('active', 'expanded');
      btn20.classList.remove('active', 'expanded');
      btn20.classList.add('collapsed');
      btn24.classList.remove('collapsed');
      if (cardText) cardText.textContent = 'Dummy content for 24 cm: Perfect for pancakes, eggs, and single-serve meals.';
      if (cardIcon) {
        const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent') || '#5c3d52';
        cardIcon.innerHTML = `
          <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="15" width="24" height="15" rx="2.5" fill="${accent}"/>
            <rect x="8" y="11" width="20" height="5" rx="2" fill="${accent}"/>
            <rect x="15" y="7" width="6" height="5" rx="2" fill="${accent}"/>
          </svg>`;
      }
    } else {
      btn20.classList.add('active', 'expanded');
      btn24.classList.remove('active', 'expanded');
      btn24.classList.add('collapsed');
      btn20.classList.remove('collapsed');
      if (cardText) cardText.textContent = 'Dummy content for 20 cm: Great for quick bites, omelettes, and snacks.';
      if (cardIcon) {
        const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent') || '#5c3d52';
        cardIcon.innerHTML = `
          <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="14" fill="${accent}"/>
            <rect x="10" y="10" width="16" height="16" rx="4" fill="#fff"/>
          </svg>`;
      }
    }
  }

  // Attach click listeners to the two buttons
  function attachListeners() {
    const btn24 = document.getElementById('btn-24');
    const btn20 = document.getElementById('btn-20');
    if (!btn24 || !btn20) return;
    btn24.addEventListener('click', () => setActiveSize('24'));
    btn20.addEventListener('click', () => setActiveSize('20'));
  }

  // Initialize component behavior
  function initComponent() {
    updateNotchAndButtons();
    attachListeners();
    setActiveSize('24');
    window.addEventListener('resize', updateNotchAndButtons);
  }

  window.addEventListener('DOMContentLoaded', initComponent);
})();
