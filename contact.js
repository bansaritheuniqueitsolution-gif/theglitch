/**
 * ==========================================================================
 * THE GLITCH — Premium Contact Page JavaScript
 * Brand: THE GLITCH | PUB & RESTAURANT
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Interactive Map Switcher
  const mapTabCC = document.getElementById('mapTabCityCentre');
  const mapTabNQ = document.getElementById('mapTabNorthernQuarter');
  const mapIframe = document.getElementById('contactMapIframe');
  const mapExtLink = document.getElementById('mapExternalLink');

  const mapLocations = {
    cityCentre: {
      url: 'https://maps.google.com/maps?q=42+Peter+Street,+Manchester+M2+5GP,+UK&t=&z=16&ie=UTF8&iwloc=&output=embed',
      extUrl: 'https://maps.google.com/?q=42+Peter+Street+Manchester+M2+5GP',
      label: 'Open City Centre in Google Maps ↗'
    },
    northernQuarter: {
      url: 'https://maps.google.com/maps?q=18+Dale+Street,+Northern+Quarter,+Manchester+M1+1EZ,+UK&t=&z=16&ie=UTF8&iwloc=&output=embed',
      extUrl: 'https://maps.google.com/?q=18+Dale+Street+Manchester+M1+1EZ',
      label: 'Open Northern Quarter in Google Maps ↗'
    }
  };

  window.switchMapLocation = function (loc) {
    if (!mapIframe) return;

    if (loc === 'cityCentre') {
      if (mapTabCC) mapTabCC.classList.add('active');
      if (mapTabNQ) mapTabNQ.classList.remove('active');
      mapIframe.src = mapLocations.cityCentre.url;
      if (mapExtLink) {
        mapExtLink.href = mapLocations.cityCentre.extUrl;
        mapExtLink.textContent = mapLocations.cityCentre.label;
      }
    } else if (loc === 'northernQuarter') {
      if (mapTabNQ) mapTabNQ.classList.add('active');
      if (mapTabCC) mapTabCC.classList.remove('active');
      mapIframe.src = mapLocations.northernQuarter.url;
      if (mapExtLink) {
        mapExtLink.href = mapLocations.northernQuarter.extUrl;
        mapExtLink.textContent = mapLocations.northernQuarter.label;
      }
    }
  };

  if (mapTabCC) {
    mapTabCC.addEventListener('click', () => switchMapLocation('cityCentre'));
  }
  if (mapTabNQ) {
    mapTabNQ.addEventListener('click', () => switchMapLocation('northernQuarter'));
  }

  // 2. Contact Form Interactive Handler
  const contactForm = document.getElementById('contactForm');
  const formSubmitBtn = document.getElementById('contactSubmitBtn');
  const formStatus = document.getElementById('formStatusBanner');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const subjectInput = document.getElementById('contactSubject');

      const nameVal = nameInput ? nameInput.value.trim() : 'Guest';
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const subjectVal = subjectInput ? subjectInput.value : 'General Inquiry';

      // Button loading state
      if (formSubmitBtn) {
        formSubmitBtn.disabled = true;
        formSubmitBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-black inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>SENDING MESSAGE...</span>
        `;
      }

      // Simulate prompt dispatch & response
      setTimeout(() => {
        if (formStatus) {
          formStatus.className = 'form-status-banner success';
          formStatus.innerHTML = `
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <strong>Thank you, ${nameVal}!</strong> Your message regarding <em>"${subjectVal}"</em> has been received. Our hospitality team will be in touch shortly at <strong>${emailVal}</strong>.
            </div>
          `;
          formStatus.style.display = 'flex';
          formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Reset form & restore button
        contactForm.reset();
        if (formSubmitBtn) {
          formSubmitBtn.disabled = false;
          formSubmitBtn.innerHTML = `
            <span>SEND MESSAGE</span>
            <span class="btn-arrow" aria-hidden="true">&rarr;</span>
          `;
        }
      }, 700);
    });
  }

  // 3. Smooth Scroll Indicator Trigger
  const scrollIndicator = document.getElementById('heroScrollTrigger');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('contact-main');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});

// ==========================================================================
// GLOBAL MODAL & NAVIGATION HELPERS
// ==========================================================================

// Mobile Menu Drawer Toggle
window.toggleMobileMenu = function () {
  const menu = document.getElementById('mobileMenu');
  if (menu) {
    menu.classList.toggle('hidden');
  }
};

// Booking Modal Controls
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

