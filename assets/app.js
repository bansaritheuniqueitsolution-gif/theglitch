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

  // 2. TABLE RESERVATION MODAL & EMAIL ROUTING
  const PUB_CONFIG = {
    pub1: {
      name: 'Pub 01 — City Centre',
      address: '37 Prince of Wales Rd, Norwich NR1 1BG',
      email: 'norwich@pubtheglitch.co.uk',
      color: '#5ce1e6',
      badgeClass: 'bg-[#5ce1e6]/10 border-[#5ce1e6]/30 text-[#5ce1e6]'
    },
    pub2: {
      name: 'Pub 02 — City Center',
      address: '25b St Giles St, Norwich NR2 1JN',
      email: 'sg@pubtheglitch.co.uk',
      color: '#ff3b94',
      badgeClass: 'bg-[#ff3b94]/10 border-[#ff3b94]/30 text-[#ff3b94]'
    }
  };

  function getPubConfig(locationVal) {
    const loc = (locationVal || '').toLowerCase();
    if (loc.includes('center') || loc.includes('northern') || loc.includes('giles') || loc.includes('2')) {
      return PUB_CONFIG.pub2;
    }
    return PUB_CONFIG.pub1;
  }

  window.updateBookingRecipient = function () {
    const select = document.getElementById('bookingLocation');
    const targetEmailEl = document.getElementById('bookingTargetEmail');
    const mailNoticeEl = document.getElementById('bookingMailNotice');
    const form = document.getElementById('bookingForm');

    const config = getPubConfig(select ? select.value : '');

    if (targetEmailEl) {
      targetEmailEl.textContent = config.email;
    }
    if (mailNoticeEl) {
      mailNoticeEl.className = `mt-2 text-[11px] px-3 py-1.5 rounded-md border flex items-center gap-2 font-medium transition-all duration-200 ${config.badgeClass}`;
    }
    if (form) {
      form.action = `https://formsubmit.co/${config.email}`;
    }
  };

  window.openBookingModal = function (locationName) {
    const modal = document.getElementById('bookingModal');
    const select = document.getElementById('bookingLocation');
    if (locationName && select) {
      const loc = locationName.toLowerCase();
      if (loc.includes('center') || loc.includes('northern') || loc.includes('giles') || loc.includes('2')) {
        select.value = 'City Center';
      } else {
        select.value = 'City Centre';
      }
    }

    // Reset view from previous success state
    const formContainer = document.getElementById('bookingFormContainer');
    const successContainer = document.getElementById('bookingSuccessContainer');
    const submitBtn = document.getElementById('bookingSubmitBtn');

    if (formContainer) formContainer.classList.remove('hidden');
    if (successContainer) {
      successContainer.classList.add('hidden');
      successContainer.innerHTML = '';
    }
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Confirm Table Reservation';
    }

    window.updateBookingRecipient();

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

  window.renderBookingSuccess = function (data) {
    const formContainer = document.getElementById('bookingFormContainer');
    const successContainer = document.getElementById('bookingSuccessContainer');
    const form = document.getElementById('bookingForm');

    if (formContainer && successContainer) {
      formContainer.classList.add('hidden');
      successContainer.classList.remove('hidden');

      successContainer.innerHTML = `
        <div class="w-16 h-16 mx-auto rounded-full ${data.pub.badgeClass} border flex items-center justify-center shadow-lg">
          <svg class="w-8 h-8 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <div>
          <span class="text-xs uppercase tracking-widest font-bold" style="color: ${data.pub.color}">Reservation Request Dispatched</span>
          <h3 class="text-2xl font-serif font-bold text-white mt-1">Table Request Sent!</h3>
          <p class="text-neutral-300 text-xs mt-2 max-w-sm mx-auto">
            Your booking inquiry has been routed directly to <strong class="text-white">${data.pub.name}</strong>.
          </p>
        </div>

        <div class="bg-[#080d14] rounded-xl p-4 border border-white/10 text-left text-xs space-y-2 text-neutral-300">
          <div class="flex justify-between items-center border-b border-white/10 pb-2">
            <span class="text-neutral-400">Destination Email:</span>
            <span class="font-bold tracking-wide underline text-white" style="color: ${data.pub.color}">${data.pub.email}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-neutral-400">Selected Pub:</span>
            <span class="font-semibold text-white">${data.pub.name}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-neutral-400">Address:</span>
            <span class="text-neutral-300 text-right">${data.pub.address}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-neutral-400">Guest Name:</span>
            <span class="text-white">${data.name}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-neutral-400">Date &amp; Time:</span>
            <span class="text-white">${data.date} at ${data.time}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-neutral-400">Party Size:</span>
            <span class="text-white">${data.guests}</span>
          </div>
          ${data.area ? `
          <div class="flex justify-between">
            <span class="text-neutral-400">Seating Area:</span>
            <span class="text-white">${data.area}</span>
          </div>` : ''}
          <div class="flex justify-between">
            <span class="text-neutral-400">Contact Info:</span>
            <span class="text-white">${data.contact}</span>
          </div>
        </div>

        <div class="space-y-2 pt-2">
          <a href="${data.mailtoUrl}" class="block w-full py-3 rounded-full text-neutral-900 font-bold tracking-wider uppercase text-xs transition duration-200 shadow-lg text-center bg-[#f4ede3] hover:bg-white">
            Send Directly in Mail App ✉️
          </a>
          <button type="button" onclick="closeBookingModal()" class="w-full py-2.5 rounded-full border border-white/20 hover:bg-white/10 text-white font-semibold text-xs tracking-wider uppercase transition">
            Close Confirmation
          </button>
        </div>
      `;
    } else {
      alert(`🎉 Table Reserved!\n\nThank you ${data.name}, your table request for ${data.guests} at ${data.pub.name} (${data.date} at ${data.time}) has been sent directly to ${data.pub.email}.`);
      window.closeBookingModal();
    }

    if (form) form.reset();
    window.updateBookingRecipient();
  };

  window.handleBookingSubmit = async function (e) {
    if (e && e.preventDefault) e.preventDefault();

    const locEl = document.getElementById('bookingLocation');
    const dateEl = document.getElementById('bookingDate');
    const timeEl = document.getElementById('bookingTime');
    const guestsEl = document.getElementById('bookingGuests');
    const nameEl = document.getElementById('bookingName');
    const contactEl = document.getElementById('bookingContact') || document.getElementById('bookingEmail');
    const areaEl = document.getElementById('bookingArea');
    const submitBtn = document.getElementById('bookingSubmitBtn') || (e.target ? e.target.querySelector('button[type="submit"]') : null);

    const pubConfig = getPubConfig(locEl ? locEl.value : '');

    const name = (nameEl && nameEl.value.trim()) || 'Guest';
    const contact = (contactEl && contactEl.value.trim()) || 'Not provided';
    const date = (dateEl && dateEl.value) || new Date().toISOString().split('T')[0];
    const time = (timeEl && timeEl.value) || '7:30 PM';
    const guests = (guestsEl && guestsEl.value) || '2 Guests';
    const area = areaEl && areaEl.value ? areaEl.value : '';

    // Show sending spinner state on submit button
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="inline-flex items-center justify-center gap-2">
          <svg class="animate-spin h-4 w-4 text-current inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Sending to ${pubConfig.email}...
        </span>
      `;
    }

    const emailSubject = `Table Booking Request – ${pubConfig.name} – ${name} (${guests}, ${date} @ ${time})`;
    const emailBody = 
`THE GLITCH — TABLE RESERVATION REQUEST
========================================
Destination Mail : ${pubConfig.email}
Venue Location   : ${pubConfig.name}
Venue Address    : ${pubConfig.address}

CUSTOMER DETAILS:
- Full Name      : ${name}
- Contact Info   : ${contact}

BOOKING DETAILS:
- Date           : ${date}
- Time           : ${time}
- Party Size     : ${guests}${area ? '\n- Seating Area   : ' + area : ''}

========================================
Sent via The Glitch Online Booking System`;

    const mailtoUrl = `mailto:${pubConfig.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    // 1. Post to FormSubmit background delivery endpoint for instant mailbox dispatch
    try {
      fetch(`https://formsubmit.co/ajax/${pubConfig.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: emailSubject,
          "Pub Location": pubConfig.name,
          "Pub Address": pubConfig.address,
          "Destination Mail": pubConfig.email,
          "Customer Name": name,
          "Contact (Email/Phone)": contact,
          "Reservation Date": date,
          "Reservation Time": time,
          "Party Size": guests,
          "Seating Area": area || "Standard",
          _template: "table"
        })
      }).catch(function (err) {
        console.log('Background dispatch note:', err);
      });
    } catch (err) {
      console.log('Dispatch error:', err);
    }

    // 2. Trigger mailto in background
    setTimeout(function () {
      try {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = mailtoUrl;
        document.body.appendChild(iframe);
        setTimeout(function () {
          if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
        }, 1500);
      } catch (e) {}
    }, 200);

    // 3. Render success card
    setTimeout(function () {
      window.renderBookingSuccess({
        pub: pubConfig,
        name: name,
        contact: contact,
        date: date,
        time: time,
        guests: guests,
        area: area,
        mailtoUrl: mailtoUrl
      });
    }, 600);
  };

  // 3. DIRECTIONS MODAL
  window.openDirectionsModal = function (pub) {
    const modal = document.getElementById('directionsModal');
    const title = document.getElementById('directionsPubTitle');
    const addr = document.getElementById('directionsPubAddress');
    const transit = document.getElementById('directionsTransit');
    const parking = document.getElementById('directionsParking');
    const mapLink = document.getElementById('googleMapsLink');

    const isPub2 = pub && (pub.toLowerCase().includes('center') || pub.toLowerCase().includes('northern') || pub.toLowerCase().includes('giles') || pub.includes('2'));
    if (title) title.innerText = isPub2 ? 'Pub 02 — City Center' : 'Pub 01 — City Centre';
    if (addr) addr.innerText = isPub2 ? '25b St Giles St, Norwich NR2 1JN, United Kingdom' : '37 Prince of Wales Rd, Norwich NR1 1BG, United Kingdom';
    if (transit) transit.innerText = isPub2 ? 'St Giles Street (1 min walk), Norwich Market (3 min walk)' : 'Norwich Railway Station (6 min walk), Prince of Wales Rd (1 min walk)';
    if (parking) parking.innerText = isPub2 ? 'St Giles Multi-Storey car park & on-street bays' : 'Rose Lane Car Park & on-street parking';
    if (mapLink) mapLink.href = isPub2 ? 'https://www.google.com/maps/search/?api=1&query=25b+St+Giles+St+Norwich+NR2+1JN' : 'https://www.google.com/maps/search/?api=1&query=37+Prince+of+Wales+Rd+Norwich+NR1+1BG';

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

  // 7. DATE INPUT DEFAULT & RECIPIENT INITIALIZATION
  document.addEventListener('DOMContentLoaded', function () {
    const dateInput = document.getElementById('bookingDate');
    if (dateInput && !dateInput.value) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.value = tomorrow.toISOString().split('T')[0];
    }
    if (typeof window.updateBookingRecipient === 'function') {
      window.updateBookingRecipient();
    }
  });

  // PRIVATE HIRE MODAL ROUTING (our-pubs.html)
  window.updateHireRecipient = function () {
    const select = document.getElementById('hireLocation');
    const targetEl = document.getElementById('hireTargetEmail');
    if (!select || !targetEl) return;
    const val = select.value.toLowerCase();
    if (val.includes('center') || val.includes('northern') || val.includes('giles') || val.includes('2')) {
      targetEl.textContent = 'sg@pubtheglitch.co.uk';
    } else if (val.includes('both')) {
      targetEl.textContent = 'norwich@pubtheglitch.co.uk, sg@pubtheglitch.co.uk';
    } else {
      targetEl.textContent = 'norwich@pubtheglitch.co.uk';
    }
  };

  window.openPrivateHireModal = function () {
    const modal = document.getElementById('privateHireModal');
    if (modal) {
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      if (typeof window.updateHireRecipient === 'function') {
        window.updateHireRecipient();
      }
    }
  };

  window.closePrivateHireModal = function () {
    const modal = document.getElementById('privateHireModal');
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  };

  window.handlePrivateHireSubmit = function (e) {
    if (e && e.preventDefault) e.preventDefault();
    const select = document.getElementById('hireLocation');
    const form = e.target;
    const guestsInput = form ? form.querySelector('input[type="number"]') : null;
    const dateInput = form ? form.querySelector('input[type="date"]') : null;
    const contactInput = form ? form.querySelector('input[type="text"]') : null;

    const locVal = select ? select.value : 'City Centre';
    let targetEmail = 'norwich@pubtheglitch.co.uk';
    let pubName = 'Pub 01 — City Centre';
    if (locVal.toLowerCase().includes('center') || locVal.toLowerCase().includes('2')) {
      targetEmail = 'sg@pubtheglitch.co.uk';
      pubName = 'Pub 02 — City Center';
    } else if (locVal.toLowerCase().includes('both')) {
      targetEmail = 'norwich@pubtheglitch.co.uk, sg@pubtheglitch.co.uk';
      pubName = 'Both Glitch Locations';
    }

    const guests = (guestsInput && guestsInput.value) || '20+';
    const date = (dateInput && dateInput.value) || 'TBD';
    const contact = (contactInput && contactInput.value) || 'Not provided';

    const subject = `Private Hire Inquiry: ${pubName} (${guests} Guests, ${date})`;
    const body = `THE GLITCH — PRIVATE HIRE INQUIRY\n\nVenue: ${pubName}\nTarget Mailbox: ${targetEmail}\nGuests: ${guests}\nTarget Date: ${date}\nContact Details: ${contact}\n\nSent via The Glitch Online Inquiry System`;

    const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    try {
      fetch(`https://formsubmit.co/ajax/${targetEmail.split(',')[0].trim()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: subject,
          "Venue": pubName,
          "Target Email": targetEmail,
          "Guests": guests,
          "Date": date,
          "Contact": contact,
          _template: "table"
        })
      }).catch(() => {});
    } catch (err) {}

    window.location.href = mailtoUrl;

    alert(`🎉 Private Hire Request Received!\n\nYour inquiry for ${pubName} has been routed directly to ${targetEmail}.\nOur private events manager will be in touch shortly.`);
    window.closePrivateHireModal();
    if (form) form.reset();
  };

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
