/**
 * THE GLITCH — PREMIUM GALLERY CONTROLLER
 * Architecture: Vanilla JavaScript (ES6+)
 * Features:
 *   - Editorial Gallery Data Architecture (18 Images)
 *   - Smooth Masonry Category Filtering
 *   - Fullscreen Cinema Lightbox (Keyboard, Touch/Swipe, Counter)
 *   - Parallax Hero Effect
 *   - Sticky Glass Header on Scroll
 *   - Interactive Reservation Modal
 */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. EDITORIAL GALLERY DATA
  // Easily customizable for future client assets
  // -------------------------------------------------------------------------
  const GALLERY_DATA = [
    {
      id: 1,
      title: 'The Industrial Lounge',
      subtitle: 'Northern Quarter vaulted brick & copper bar',
      category: 'PUB',
      image: 'assets/pub-nq-interior.jpg',
      spanClass: 'col-span-8 row-span-2',
      alt: 'Atmospheric vaulted brick interior of The Glitch Northern Quarter pub'
    },
    {
      id: 2,
      title: 'Midnight Cyan Glow',
      subtitle: 'House gin, butterfly pea flower & electric tonic',
      category: 'FOOD & DRINKS',
      image: 'assets/gallery-1-cocktail.jpg',
      spanClass: 'col-span-4 row-span-2',
      alt: 'Signature glowing cocktail served in premium crystal glassware'
    },
    {
      id: 3,
      title: 'Culinary Precision',
      subtitle: 'Pan-seared sea bass with saffron reduction',
      category: 'RESTAURANT',
      image: 'assets/gallery-3-plate.jpg',
      spanClass: 'col-span-4 row-span-1',
      alt: 'Artisan plated dining dish prepared by executive chef'
    },
    {
      id: 4,
      title: 'Toast to the Weekend',
      subtitle: 'Locally brewed craft IPAs & stouts on tap',
      category: 'PUB',
      image: 'assets/toast-hands.jpg',
      spanClass: 'col-span-4 row-span-1',
      alt: 'Friends toasting craft beers over reclaimed timber tables'
    },
    {
      id: 5,
      title: 'Neon Frequency',
      subtitle: 'Custom hand-bent neon signage installation',
      category: 'ATMOSPHERE',
      image: 'assets/gallery-neon.jpg',
      spanClass: 'col-span-4 row-span-1',
      alt: 'Artistic neon lighting glowing against distressed dark brick'
    },
    {
      id: 6,
      title: "The Chef's Feast",
      subtitle: 'Family-style sharing plates and artisan sides',
      category: 'RESTAURANT',
      image: 'assets/gallery-4-feast.jpg',
      spanClass: 'col-span-6 row-span-2',
      alt: 'Sumptuous table feast showcasing premium dining dishes'
    },
    {
      id: 7,
      title: 'After Dark Residency',
      subtitle: 'Deep house & nu-disco vinyl selectors every weekend',
      category: 'EVENTS',
      image: 'assets/event-dj.jpg',
      spanClass: 'col-span-6 row-span-2',
      alt: 'DJ performing live set under moody magenta stage lighting'
    },
    {
      id: 8,
      title: 'Wood-Fired Crust',
      subtitle: 'San Marzano tomatoes, fior di latte & hot honey',
      category: 'FOOD & DRINKS',
      image: 'assets/menu-pizza.jpg',
      spanClass: 'col-span-4 row-span-1',
      alt: 'Freshly baked Neapolitan pizza fresh from the wood-fired oven'
    },
    {
      id: 9,
      title: 'The Velvet Hideaway',
      subtitle: 'Intimate corner booths for cocktails & conversation',
      category: 'ATMOSPHERE',
      image: 'assets/gallery-5-booth.jpg',
      spanClass: 'col-span-4 row-span-1',
      alt: 'Intimate velvet upholstered seating booth in low ambient lighting'
    },
    {
      id: 10,
      title: 'Smash Patty Perfection',
      subtitle: 'Double dry-aged beef, smoked cheddar & secret glitch sauce',
      category: 'FOOD & DRINKS',
      image: 'assets/menu-burger.jpg',
      spanClass: 'col-span-4 row-span-1',
      alt: 'Gourmet smash burger with melted cheese and crispy fries'
    },
    {
      id: 11,
      title: 'Vault Dining Room',
      subtitle: 'City Centre restored cellar & dining hall',
      category: 'RESTAURANT',
      image: 'assets/pub-cc-interior.jpg',
      spanClass: 'col-span-8 row-span-2',
      alt: 'Dramatic interior of The Glitch City Centre dining room'
    },
    {
      id: 12,
      title: 'Rose Smoke Coupe',
      subtitle: 'Smoked bourbon, sweet vermouth & Luxardo cherry',
      category: 'FOOD & DRINKS',
      image: 'assets/gallery-2-coupe.jpg',
      spanClass: 'col-span-4 row-span-2',
      alt: 'Elegant cocktail in a coupe glass with botanical garnish'
    },
    {
      id: 13,
      title: 'Acoustic Unplugged',
      subtitle: 'Thursday candlelight sessions with indie songwriters',
      category: 'EVENTS',
      image: 'assets/event-music.jpg',
      spanClass: 'col-span-4 row-span-1',
      alt: 'Live acoustic musician performing on candlelit pub stage'
    },
    {
      id: 14,
      title: 'Saturday Revelry',
      subtitle: 'Vibrant weekend energy across the main bar',
      category: 'ATMOSPHERE',
      image: 'assets/gallery-7-crowd.jpg',
      spanClass: 'col-span-4 row-span-1',
      alt: 'Bustling pub crowd socializing on a vibrant Saturday evening'
    },
    {
      id: 15,
      title: 'The Taps & Tanks',
      subtitle: '16 rotating craft beer lines and seasonal ciders',
      category: 'PUB',
      image: 'assets/menu-taproom.jpg',
      spanClass: 'col-span-4 row-span-1',
      alt: 'Polished stainless steel and brass draft beer taps line'
    },
    {
      id: 16,
      title: 'Electric Nights',
      subtitle: 'Special ticketed events & exclusive takeover parties',
      category: 'EVENTS',
      image: 'assets/event-special.jpg',
      spanClass: 'col-span-6 row-span-2',
      alt: 'Crowd celebrating at a nighttime special event at The Glitch'
    },
    {
      id: 17,
      title: 'Sticky Glaze Wings',
      subtitle: 'Crispy tossed wings in Korean gochujang sauce',
      category: 'FOOD & DRINKS',
      image: 'assets/menu-wings.jpg',
      spanClass: 'col-span-3 row-span-1',
      alt: 'Appetizing plate of crispy chicken wings with scallions and sesame'
    },
    {
      id: 18,
      title: 'City Centre Lanterns',
      subtitle: 'Warm street-level welcome on Peter Street',
      category: 'PUB',
      image: 'assets/pub-city-centre.jpg',
      spanClass: 'col-span-3 row-span-1',
      alt: 'Exterior entrance and ambient facade of The Glitch pub'
    }
  ];

  // -------------------------------------------------------------------------
  // 2. STATE MANAGEMENT
  // -------------------------------------------------------------------------
  let currentCategory = 'ALL';
  let filteredItems = [...GALLERY_DATA];
  let activeLightboxIndex = 0;

  // DOM Elements
  const galleryGrid = document.getElementById('galleryGrid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const siteHeader = document.getElementById('siteHeader');
  const heroBgImg = document.getElementById('heroBgImg');
  const navToggle = document.getElementById('navToggle');

  // Lightbox DOM Elements
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxSubtitle = document.getElementById('lightboxSubtitle');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  // Booking Modal DOM Elements
  const bookingModal = document.getElementById('bookingModal');
  const bookingModalClose = document.getElementById('bookingModalClose');
  const bookTriggers = document.querySelectorAll('.open-booking-modal');

  // -------------------------------------------------------------------------
  // 3. RENDER GALLERY CARDS
  // -------------------------------------------------------------------------
  function renderGallery(items) {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = '';

    items.forEach((item, index) => {
      const card = document.createElement('article');
      card.className = `gallery-item ${item.spanClass} filtering-in`;
      card.dataset.id = item.id;
      card.dataset.category = item.category;
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `View ${item.title}`);

      card.innerHTML = `
        <div class="gallery-item-image-wrapper">
          <img src="${item.image}" alt="${item.alt}" class="gallery-item-img" loading="lazy" />
        </div>
        <div class="gallery-item-overlay">
          <div class="overlay-top">
            <span class="item-category-tag">${item.category}</span>
            <span class="item-view-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
              View
            </span>
          </div>
          <div class="overlay-bottom">
            <h3 class="item-title">${item.title}</h3>
            <p class="item-desc">${item.subtitle}</p>
          </div>
        </div>
      `;

      // Open Lightbox on Click or Enter key
      card.addEventListener('click', () => openLightbox(index));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(index);
        }
      });

      galleryGrid.appendChild(card);
    });
  }

  // -------------------------------------------------------------------------
  // 4. CATEGORY FILTERING LOGIC
  // -------------------------------------------------------------------------
  function updateFilterCounts() {
    filterButtons.forEach(btn => {
      const cat = btn.dataset.filter;
      const countEl = btn.querySelector('.filter-count');
      if (countEl) {
        if (cat === 'ALL') {
          countEl.textContent = `(${GALLERY_DATA.length})`;
        } else {
          const count = GALLERY_DATA.filter(item => item.category === cat).length;
          countEl.textContent = `(${count})`;
        }
      }
    });
  }

  function handleFilterClick(e) {
    const btn = e.currentTarget;
    const filterValue = btn.dataset.filter;

    if (filterValue === currentCategory) return;

    // Update active UI tab
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    currentCategory = filterValue;

    // Filter Items
    if (filterValue === 'ALL') {
      filteredItems = [...GALLERY_DATA];
    } else {
      filteredItems = GALLERY_DATA.filter(item => item.category === filterValue);
    }

    // Smooth transition: animate grid cards out, then re-render
    const existingCards = galleryGrid.querySelectorAll('.gallery-item');
    existingCards.forEach(c => c.classList.add('filtering-out'));

    setTimeout(() => {
      renderGallery(filteredItems);
    }, 250);
  }

  // -------------------------------------------------------------------------
  // 5. LIGHTBOX CONTROLLER
  // -------------------------------------------------------------------------
  function openLightbox(index) {
    if (!filteredItems[index]) return;
    activeLightboxIndex = index;
    updateLightboxContent();

    lightbox.classList.add('active');
    document.body.classList.add('modal-open');

    // Accessibility focus
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.classList.remove('modal-open');
  }

  function updateLightboxContent() {
    const item = filteredItems[activeLightboxIndex];
    if (!item) return;

    // Fade out previous image
    lightboxImg.classList.remove('loaded');

    // Update Meta
    lightboxCategory.textContent = item.category;
    const currentNum = String(activeLightboxIndex + 1).padStart(2, '0');
    const totalNum = String(filteredItems.length).padStart(2, '0');
    lightboxCounter.textContent = `${currentNum} / ${totalNum}`;
    lightboxTitle.textContent = item.title;
    lightboxSubtitle.textContent = item.subtitle;

    // Load new image
    const tempImg = new Image();
    tempImg.src = item.image;
    tempImg.onload = () => {
      lightboxImg.src = item.image;
      lightboxImg.alt = item.alt;
      lightboxImg.classList.add('loaded');
    };
  }

  function showNextImage() {
    activeLightboxIndex = (activeLightboxIndex + 1) % filteredItems.length;
    updateLightboxContent();
  }

  function showPrevImage() {
    activeLightboxIndex = (activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length;
    updateLightboxContent();
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNextImage();
    if (e.key === 'ArrowLeft') showPrevImage();
  });

  // Click outside to close
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-body')) {
      closeLightbox();
    }
  });

  // Touch Swipe for Mobile
  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const threshold = 50;
    if (touchEndX < touchStartX - threshold) {
      showNextImage();
    }
    if (touchEndX > touchStartX + threshold) {
      showPrevImage();
    }
  }

  // -------------------------------------------------------------------------
  // 6. SCROLL DYNAMICS & PARALLAX
  // -------------------------------------------------------------------------
  function handleScroll() {
    const scrollY = window.scrollY;

    // Header Blur & Background Transition
    if (siteHeader) {
      if (scrollY > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // Hero Slow Parallax (moves image at 25% scroll speed)
    if (heroBgImg && scrollY < window.innerHeight) {
      heroBgImg.style.transform = `scale(1.05) translateY(${scrollY * 0.22}px)`;
    }
  }

  // -------------------------------------------------------------------------
  // 7. MOBILE MENU TOGGLE (EXPOSED GLOBALLY)
  // -------------------------------------------------------------------------
  window.toggleMobileMenu = function () {
    const menu = document.getElementById('mobileMenu');
    if (menu) {
      menu.classList.toggle('hidden');
    }
  };

  // -------------------------------------------------------------------------
  // 8. TABLE RESERVATION MODAL (EXPOSED GLOBALLY)
  // -------------------------------------------------------------------------
  window.openBookingModal = function (locationName) {
    const modal = document.getElementById('bookingModal');
    const locationSelect = document.getElementById('bookingLocation');
    if (locationName && locationSelect) {
      if (locationName.includes('City')) {
        locationSelect.value = 'City Centre';
      } else if (locationName.includes('Northern')) {
        locationSelect.value = 'Northern Quarter';
      }
    }
    if (modal) {
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeBookingModal = function () {
    const modal = document.getElementById('bookingModal');
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  };

  window.handleBookingSubmit = function (e) {
    if (e && e.preventDefault) e.preventDefault();
    const nameInput = document.getElementById('bookingName');
    const pubInput = document.getElementById('bookingLocation');
    const timeInput = document.getElementById('bookingTime');
    const guestsInput = document.getElementById('bookingGuests');

    const name = nameInput ? nameInput.value : 'Guest';
    const pub = pubInput ? pubInput.value : 'The Glitch';
    const time = timeInput ? timeInput.value : '7:00 PM';
    const guests = guestsInput ? guestsInput.value : '2 Guests';

    alert(`🎉 Table Reserved!\n\nThank you ${name}, your table for ${guests} at The Glitch (${pub}) at ${time} has been requested.\nWe have sent a confirmation to your contact details.`);
    window.closeBookingModal();
  };

  // Click outside to close booking modal
  const bookingModal = document.getElementById('bookingModal');
  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) window.closeBookingModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bookingModal && !bookingModal.classList.contains('hidden')) {
      window.closeBookingModal();
    }
  });

  // -------------------------------------------------------------------------
  // 9. INITIALIZATION
  // -------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    renderGallery(GALLERY_DATA);
    updateFilterCounts();

    // Event Listeners for Filters
    filterButtons.forEach(btn => {
      btn.addEventListener('click', handleFilterClick);
    });

    // Lightbox Controls
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);
    if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);

    // Automatic transparent logo processing on page load
    (function initTransparentLogos() {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = function() {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth || 700;
          canvas.height = img.naturalHeight || 630;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          const idata = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const d = idata.data;
          for (let i = 0; i < d.length; i += 4) {
            const m = Math.max(d[i], d[i+1], d[i+2]);
            if (m <= 14) {
              d[i+3] = 0;
            } else {
              const ratio = (m - 14) / 241;
              d[i+3] = Math.min(255, Math.round(Math.pow(ratio, 0.75) * 255));
              const scale = Math.min(2.0, 1.0 / Math.max(0.2, ratio));
              d[i] = Math.min(255, Math.round(d[i] * scale));
              d[i+1] = Math.min(255, Math.round(d[i+1] * scale));
              d[i+2] = Math.min(255, Math.round(d[i+2] * scale));
            }
          }
          ctx.putImageData(idata, 0, 0);
          const dataUrl = canvas.toDataURL('image/png');
          document.querySelectorAll('img[src*="logo.png"]').forEach(el => {
            el.src = dataUrl;
          });
          const fav = document.querySelector('link[rel="icon"]');
          if (fav) fav.href = dataUrl;
        } catch(e) {}
      };
      img.src = 'assets/logo.png';
    })();
  });

})();
