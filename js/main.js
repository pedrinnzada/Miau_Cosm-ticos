/* ============================================
   MIAU Beauty — Main JavaScript
   Navigation, Scroll Effects, Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Announcement Bar Close ----
  const announcementBar = document.getElementById('announcement-bar');
  const announcementClose = document.getElementById('announcement-close');

  if (announcementClose && announcementBar) {
    announcementClose.addEventListener('click', () => {
      announcementBar.style.transform = 'translateY(-100%)';
      announcementBar.style.opacity = '0';
      announcementBar.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => {
        announcementBar.style.display = 'none';
      }, 400);
    });
  }

  // ---- Sticky Header Scroll Effect ----
  const header = document.getElementById('site-header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (header) {
      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    lastScroll = currentScroll;
  }, { passive: true });

  // ---- Mobile Menu Toggle ----
  const menuToggle = document.getElementById('menu-toggle');
  const navLeft = document.getElementById('nav-left');
  const navRight = document.getElementById('nav-right');
  let menuOpen = false;

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      menuOpen = !menuOpen;
      menuToggle.classList.toggle('active', menuOpen);

      // Animate hamburger to X
      const spans = menuToggle.querySelectorAll('span');
      if (menuOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';

        // Show mobile nav
        showMobileNav();
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';

        hideMobileNav();
      }
    });
  }

  function showMobileNav() {
    // Create mobile nav overlay if it doesn't exist
    let mobileNav = document.getElementById('mobile-nav-overlay');
    if (!mobileNav) {
      mobileNav = document.createElement('div');
      mobileNav.id = 'mobile-nav-overlay';
      mobileNav.style.cssText = `
        position: fixed;
        top: var(--header-height);
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(250, 246, 243, 0.98);
        backdrop-filter: blur(20px);
        z-index: 999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        opacity: 0;
        transition: opacity 0.3s ease;
      `;

      const links = [
        { text: 'Produtos', href: '#bestsellers' },
        { text: 'Sobre', href: '#benefits' },
        { text: 'Instagram', href: 'https://www.instagram.com/oficial_miau' },
        { text: 'Contato', href: 'https://wa.me/5531995920587?text=Olá!%20Vim%20pelo%20site%20e%20gostaria%20de%20solicitar%20um%20orçamento.' }
      ];

      links.forEach((item, i) => {
        const link = document.createElement('a');
        link.href = item.href;
        link.textContent = item.text;

        // Abre links externos em outra aba
        if (item.href.startsWith('http')) {
          link.target = '_blank';
        }

        link.style.cssText = `
          font-family: 'Playfair Display', serif;
          font-size: 1.75rem;
          color: #2C2420;
          text-decoration: none;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          transition-delay: ${0.1 + i * 0.05}s;
        `;

        link.addEventListener('click', closeMobileMenu);
        mobileNav.appendChild(link);
      });

      document.body.appendChild(mobileNav);
    }

    mobileNav.style.display = 'flex';
    requestAnimationFrame(() => {
      mobileNav.style.opacity = '1';
      mobileNav.querySelectorAll('a').forEach(link => {
        link.style.opacity = '1';
        link.style.transform = 'translateY(0)';
      });
    });

    document.body.style.overflow = 'hidden';
  }

  function hideMobileNav() {
    const mobileNav = document.getElementById('mobile-nav-overlay');
    if (mobileNav) {
      mobileNav.style.opacity = '0';
      mobileNav.querySelectorAll('a').forEach(link => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(20px)';
      });
      setTimeout(() => {
        mobileNav.style.display = 'none';
      }, 300);
    }
    document.body.style.overflow = '';
  }

  function closeMobileMenu() {
    menuOpen = false;
    menuToggle.classList.remove('active');
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
    hideMobileNav();
  }

  // ---- Parallax Hero Background ----
  const heroBgImg = document.getElementById('hero-bg-img');

  if (heroBgImg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const heroHeight = document.getElementById('hero').offsetHeight;

      if (scrolled < heroHeight) {
        heroBgImg.style.transform = `translateY(${scrolled * 0.3}px) scale(1.1)`;
      }
    }, { passive: true });

    // Set initial scale
    heroBgImg.style.transform = 'scale(1.1)';
  }

  // ---- Scroll Reveal (Intersection Observer) ----
  const revealElements = document.querySelectorAll('.reveal, .reveal--left, .reveal--right, .reveal--scale, .reveal-stagger');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---- Back to Top Button ----
  const backToTop = document.getElementById('back-to-top');

  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 600) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

// ---- Formulário WhatsApp ----
const newsletterForm = document.getElementById('newsletter-form');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const phoneInput = document.getElementById('newsletter-phone');

    if (phoneInput.value.trim() !== '') {
      const mensagem = `Olá! Vim através do site. Meu telefone é ${phoneInput.value} e gostaria de mais informações.`;

      window.open(
        `https://wa.me/5531995920587?text=${encodeURIComponent(mensagem)}`,
        '_blank'
      );

      phoneInput.value = '';
    }
  });
}

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // ---- Product Search Modal ----
  const searchBtn = document.getElementById('search-btn');
  const searchModal = document.getElementById('search-modal');
  const searchInput = document.getElementById('search-modal-input');
  const searchResults = document.getElementById('search-results');
  const searchHint = document.getElementById('search-hint');

  // Extrai dados dos produtos diretamente do DOM
  function getProductData() {
    const products = [];
    document.querySelectorAll('.product-card').forEach(card => {
      const name  = card.querySelector('.product-card__name')?.textContent.trim() || '';
      const cat   = card.querySelector('.product-card__category')?.textContent.trim() || '';
      const price = card.querySelector('.product-card__price-current')?.textContent.trim() || '';
      const img   = card.querySelector('.product-card__image')?.src || '';
      if (name) products.push({ name, cat, price, img, card });
    });
    return products;
  }

  function openSearchModal() {
    searchModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput && searchInput.focus(), 100);
  }

  window.closeSearchModal = function() {
    searchModal.style.display = 'none';
    document.body.style.overflow = '';
    if (searchInput) searchInput.value = '';
    if (searchResults) searchResults.innerHTML = '';
    if (searchHint) searchHint.style.display = 'block';
  };

  if (searchBtn) {
    searchBtn.addEventListener('click', openSearchModal);
  }

  // Fechar ao clicar fora do painel
  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearchModal();
    });
  }

  // Fechar com Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchModal && searchModal.style.display === 'flex') {
      closeSearchModal();
    }
  });

  // Pesquisa em tempo real
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();
      searchResults.innerHTML = '';

      if (!query) {
        searchHint.style.display = 'block';
        return;
      }
      searchHint.style.display = 'none';

      const all = getProductData();
      const filtered = all.filter(p =>
        p.name.toLowerCase().includes(query) || p.cat.toLowerCase().includes(query)
      );

      if (filtered.length === 0) {
        searchResults.innerHTML = `<div class="search-no-results">Nenhum produto encontrado para "<strong>${searchInput.value}</strong>"</div>`;
        return;
      }

      filtered.forEach(p => {
        const item = document.createElement('div');
        item.className = 'search-result-item';
        item.innerHTML = `
          <img class="search-result-img" src="${p.img}" alt="${p.name}" onerror="this.style.display='none'">
          <div class="search-result-info">
            <div class="search-result-cat">${p.cat}</div>
            <div class="search-result-name">${p.name}</div>
            <div class="search-result-price">${p.price}</div>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d1639e" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        `;
        item.addEventListener('click', () => {
          closeSearchModal();
          p.card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          p.card.style.boxShadow = '0 0 0 3px #d1639e';
          p.card.style.transition = 'box-shadow 0.3s';
          setTimeout(() => { p.card.style.boxShadow = ''; }, 2500);
        });
        searchResults.appendChild(item);
      });
    });
  }
});
