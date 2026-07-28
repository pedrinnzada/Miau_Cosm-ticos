/* ============================================
   MIAU Beauty — Before/After Slider
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('before-after-slider');
  const overlay = document.getElementById('before-after-overlay');
  const handle = document.getElementById('before-after-handle');

  if (!slider || !overlay || !handle) return;

  const beforeImg = overlay.querySelector('img');
  function resizeBeforeImg() {
    if (beforeImg) {
      beforeImg.style.width = slider.offsetWidth + 'px';
    }
  }
  window.addEventListener('resize', resizeBeforeImg);
  resizeBeforeImg();

  let isDragging = false;

  function updateSlider(clientX) {
    const rect = slider.getBoundingClientRect();
    let position = ((clientX - rect.left) / rect.width) * 100;
    
    // Clamp between 5% and 95%
    position = Math.max(5, Math.min(95, position));

    overlay.style.width = position + '%';
    handle.style.left = position + '%';
  }

  // Mouse events
  slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateSlider(e.clientX);
    slider.style.cursor = 'ew-resize';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    updateSlider(e.clientX);
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    slider.style.cursor = '';
  });

  // Touch events
  slider.addEventListener('touchstart', (e) => {
    isDragging = true;
    updateSlider(e.touches[0].clientX);
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    updateSlider(e.touches[0].clientX);
  }, { passive: true });

  document.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Click to jump
  slider.addEventListener('click', (e) => {
    updateSlider(e.clientX);
  });

  // Keyboard accessibility
  handle.setAttribute('tabindex', '0');
  handle.setAttribute('role', 'slider');
  handle.setAttribute('aria-label', 'Before and after comparison slider');
  handle.setAttribute('aria-valuemin', '0');
  handle.setAttribute('aria-valuemax', '100');
  handle.setAttribute('aria-valuenow', '50');

  handle.addEventListener('keydown', (e) => {
    const rect = slider.getBoundingClientRect();
    const currentPos = parseFloat(overlay.style.width) || 50;
    let newPos = currentPos;

    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      newPos = Math.max(5, currentPos - 2);
      e.preventDefault();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      newPos = Math.min(95, currentPos + 2);
      e.preventDefault();
    }

    overlay.style.width = newPos + '%';
    handle.style.left = newPos + '%';
    handle.setAttribute('aria-valuenow', Math.round(newPos));
  });
});
