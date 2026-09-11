/**
 * ==========================================================================
 * THE GLITCH — CORE APPLICATION JAVASCRIPT (assets/app.js)
 * Consolidated, modular, and lightweight interactive logic for all pages.
 * Handles modals, navigation drawer, preloader, lightbox, and logo processing.
 * ==========================================================================
 */

(function () {
  'use strict';

  // 1. MOBILE NAVIGATION TOGGLE
  window.toggleMobileMenu = function () {
    const menu = document.getElementById('mobileMenu');
    if (menu) {
      menu.classList.toggle('hidden');
      menu.classList.toggle('is-open');
    }
  };

  // 2. TABLE RESERVATION MODAL
  window.openBookingModal = function (locationName) {
    const modal = document.getElementById('bookingModal');
    const select = document.getElementById('bookingLocation');
    if (locationName && select) {
      if (locationName.toLowerCase().includes('city')) {
        select.value = 'City Centre';
      } else if (locationName.toLowerCase().includes('northern')) {
        select.value = 'Northern Quarter';
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
    const nameEl = document.getElementById('bookingName');
    const locEl = document.getElementById('bookingLocation');
    const timeEl = document.getElementById('bookingTime');
    const guestsEl = document.getElementById('bookingGuests');

    const name = nameEl ? nameEl.value : 'Guest';
    const pub = locEl ? locEl.value : 'The Glitch';
    const time = timeEl ? timeEl.value : '7:00 PM';
    const guests = guestsEl ? guestsEl.value : '2 Guests';

    alert(`🎉 Table Reserved!\n\nThank you ${name}, your table for ${guests} at The Glitch (${pub}) at ${time} has been requested.\nWe have sent an instant confirmation email.`);
    window.closeBookingModal();
  };

  // 3. DIRECTIONS MODAL
  window.openDirectionsModal = function (pub) {
    const modal = document.getElementById('directionsModal');
    const title = document.getElementById('directionsPubTitle');
    const addr = document.getElementById('directionsPubAddress');
    const transit = document.getElementById('directionsTransit');
    const parking = document.getElementById('directionsParking');
    const mapLink = document.getElementById('googleMapsLink');

    const isNQ = pub && pub.toLowerCase().includes('northern');
    if (title) title.innerText = isNQ ? 'Pub 02 — Northern Quarter' : 'Pub 01 — City Centre';
    if (addr) addr.innerText = isNQ ? '25b St Giles St, Norwich NR2 1JN, United Kingdom' : '37 Prince of Wales Rd, Norwich NR1 1BG, United Kingdom';
    if (transit) transit.innerText = isNQ ? 'Stevenson Square (2 min walk), Shudehill Interchange (4 min walk)' : 'Piccadilly Gardens (3 min walk), Piccadilly Station (7 min walk)';
    if (parking) parking.innerText = isNQ ? 'Port Street Car Park & on-street bays' : 'NCP Manchester Central & Church Street';
    if (mapLink) mapLink.href = isNQ ? 'https://www.google.com/maps/search/?api=1&query=25b+St+Giles+St+Norwich+NR2+1JN' : 'https://www.google.com/maps/search/?api=1&query=37+Prince+of+Wales+Rd+Norwich+NR1+1BG';

    if (modal) {
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeDirectionsModal = function () {
    const modal = document.getElementById('directionsModal');
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  };

  // 4. LIGHTBOX MODAL
  window.openLightbox = function (src, caption) {
    const modal = document.getElementById('lightboxModal');
    const img = document.getElementById('lightboxImg');
    const cap = document.getElementById('lightboxCaption');
    if (img) img.src = src;
    if (cap) cap.innerText = caption || '';
    if (modal) {
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeLightbox = function () {
    const modal = document.getElementById('lightboxModal');
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  };

  // 5. ESCAPE KEY MODAL CLOSER
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      window.closeBookingModal();
      window.closeDirectionsModal();
      window.closeLightbox();
      const hireModal = document.getElementById('privateHireModal');
      if (hireModal) hireModal.classList.add('hidden');
      const itemModal = document.getElementById('itemModal');
      if (itemModal) itemModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });

  // 6. PRELOADER DISMISSAL
  function dismissLoader() {
    const loader = document.getElementById('glitchPageLoader');
    if (loader && !loader.classList.contains('loader-fade-out')) {
      loader.classList.add('loader-fade-out');
      setTimeout(function () { loader.remove(); }, 600);
    }
  }

  window.addEventListener('load', function () {
    setTimeout(dismissLoader, 400);
  });
  setTimeout(dismissLoader, 2500); // Safety fallback

  // 7. DATE INPUT DEFAULT
  document.addEventListener('DOMContentLoaded', function () {
    const dateInput = document.getElementById('bookingDate');
    if (dateInput && !dateInput.value) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.value = tomorrow.toISOString().split('T')[0];
    }
  });

  // 8. TRANSPARENT LOGO PROCESSOR (SAFETY FALLBACK)
  (function initTransparentLogos() {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function () {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || 700;
        canvas.height = img.naturalHeight || 630;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const idata = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = idata.data;
        let hasBlack = false;
        for (let i = 0; i < d.length; i += 4) {
          const m = Math.max(d[i], d[i + 1], d[i + 2]);
          if (m <= 14 && d[i + 3] > 0) {
            d[i + 3] = 0;
            hasBlack = true;
          }
        }
        if (hasBlack) {
          ctx.putImageData(idata, 0, 0);
          const dataUrl = canvas.toDataURL('image/png');
          document.querySelectorAll('img[src*="logo.png"]').forEach(function (el) {
            el.src = dataUrl;
          });
        }
      } catch (e) {}
    };
    img.src = 'assets/logo.png';
  })();

})();
