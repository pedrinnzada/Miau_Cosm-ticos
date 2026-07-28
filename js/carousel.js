/* ============================================
   MIAU Beauty — Product Carousel
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('product-carousel-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  if (!track || !prevBtn || !nextBtn) return;

  const scrollAmount = 320; // approximate card width + gap

  prevBtn.addEventListener('click', () => {
    track.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });

  nextBtn.addEventListener('click', () => {
    track.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });

  // Touch/drag scrolling for desktop
  let isDown = false;
  let startX;
  let scrollLeft;

  track.addEventListener('mousedown', (e) => {
    // Don't interfere with button clicks
    if (e.target.closest('.product-card__quick-add')) return;
    
    isDown = true;
    track.style.cursor = 'grabbing';
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener('mouseleave', () => {
    isDown = false;
    track.style.cursor = '';
  });

  track.addEventListener('mouseup', () => {
    isDown = false;
    track.style.cursor = '';
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;
  });

  // Auto-scroll foi removido para evitar que os produtos fiquem tremendo na tela.
});
