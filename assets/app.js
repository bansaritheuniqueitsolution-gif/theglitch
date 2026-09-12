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
      id: 'pub1',
      name: 'Pub 01 — City Centre',
      shortName: 'City Centre',
      address: '37 Prince of Wales Rd, Norwich NR1 1BG, United Kingdom',
      email: 'norwich@pubtheglitch.co.uk',
      phone: '+44 1603 621456',
      hours: 'Tue–Sat: 16:00–03:00',
      color: '#5ce1e6',
      badgeClass: 'bg-[#5ce1e6]/10 border-[#5ce1e6]/30 text-[#5ce1e6]'
    },
    pub2: {
      id: 'pub2',
      name: 'Pub 02 — City Center',
      shortName: 'City Center',
      address: '25b St Giles St, Norwich NR2 1JN, United Kingdom',
      email: 'sg@pubtheglitch.co.uk',
      phone: '+44 1603 630123',
      hours: 'Mon–Sun: 12:00–23:00',
      color: '#ff3b94',
      badgeClass: 'bg-[#ff3b94]/10 border-[#ff3b94]/30 text-[#ff3b94]'
    }
  };

  let activeBookingPubKey = 'pub1';

  function getPubConfig(locationVal) {
    const loc = (locationVal || '').toLowerCase();
    if (loc.includes('center') || loc.includes('northern') || loc.includes('giles') || loc.includes('2')) {
      return PUB_CONFIG.pub2;
    }
    return PUB_CONFIG.pub1;
  }

  // Interactive Pub Selector (Visual Tabs & Dropdown sync)
  window.selectBookingPub = function (pubKey) {
    const targetKey = (pubKey === 'pub2' || pubKey === 'City Center' || (pubKey && pubKey.toLowerCase().includes('center'))) ? 'pub2' : 'pub1';
    activeBookingPubKey = targetKey;
    const config = PUB_CONFIG[targetKey];

    // Synchronize select dropdown
    const select = document.getElementById('bookingLocation');
    if (select) {
      select.value = config.shortName;
    }

    // Synchronize Visual Tab Buttons if present
    const tab1 = document.getElementById('bookingPubTab1');
    const tab2 = document.getElementById('bookingPubTab2');
    if (tab1 && tab2) {
      if (targetKey === 'pub1') {
        tab1.classList.add('active-pub1');
        tab2.classList.remove('active-pub2');
      } else {
        tab2.classList.add('active-pub2');
        tab1.classList.remove('active-pub1');
      }
    }

    // Update Recipient and Venue details
    window.updateBookingRecipient();
  };

  window.updateBookingRecipient = function () {
    const select = document.getElementById('bookingLocation');
    const targetEmailEl = document.getElementById('bookingTargetEmail');
    const targetAddressEl = document.getElementById('bookingTargetAddress');
    const targetMailLinkEl = document.getElementById('bookingTargetMailLink');
    const venueBadgeEl = document.getElementById('bookingVenueBadge');
    const mailNoticeEl = document.getElementById('bookingMailNotice');
    const form = document.getElementById('bookingForm');

    const config = getPubConfig(select ? select.value : activeBookingPubKey);

    if (targetEmailEl) {
      targetEmailEl.textContent = config.email;
    }
    if (targetAddressEl) {
      targetAddressEl.textContent = config.address;
    }
    if (targetMailLinkEl) {
      targetMailLinkEl.href = `mailto:${config.email}`;
      targetMailLinkEl.style.color = config.color;
    }
    if (venueBadgeEl) {
      venueBadgeEl.className = `text-[10px] px-2.5 py-0.5 rounded-full font-bold border transition-all duration-200 ${config.badgeClass}`;
      venueBadgeEl.textContent = config.shortName;
      venueBadgeEl.style.color = config.color;
      venueBadgeEl.style.borderColor = `${config.color}55`;
      venueBadgeEl.style.backgroundColor = `${config.color}1F`;
    }
    if (mailNoticeEl) {
      mailNoticeEl.className = `mt-2 text-[11px] px-3 py-1.5 rounded-md border flex items-center gap-2 font-medium transition-all duration-200 ${config.badgeClass}`;
      mailNoticeEl.style.color = config.color;
      mailNoticeEl.style.borderColor = `${config.color}55`;
      mailNoticeEl.style.backgroundColor = `${config.color}1F`;
    }
    if (form) {
      form.action = `https://formsubmit.co/${config.email}`;
    }
  };

  // Helper to show/clear field errors
  function setBookingFieldError(fieldId, errorMsg) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(fieldId + 'Error');
    if (field) {
      field.classList.add('is-invalid');
    }
    if (errorEl) {
      errorEl.textContent = errorMsg;
      errorEl.style.display = 'block';
    }
  }

  function clearBookingFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(fieldId + 'Error');
    if (field) {
      field.classList.remove('is-invalid');
    }
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.style.display = 'none';
    }
  }

  function clearAllBookingErrors() {
    ['bookingName', 'bookingEmail', 'bookingPhone', 'bookingDate', 'bookingTime'].forEach(clearBookingFieldError);
  }

  function escapeHtml(str) {
    return (str || '').replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    });
  }

  // Format today's date to YYYY-MM-DD for min date
  function getTodayIsoDate() {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  window.openBookingModal = function (locationName) {
    const modal = document.getElementById('bookingModal');
    if (!modal) {
      console.warn('Booking modal element #bookingModal not found.');
      return;
    }

    // Immediately display modal
    modal.classList.remove('hidden');
    modal.classList.add('is-open');
    modal.style.setProperty('display', 'flex', 'important');
    document.body.style.overflow = 'hidden';

    try {
      clearAllBookingErrors();

      // Determine target location
      if (locationName) {
        const loc = String(locationName).toLowerCase();
        if (loc.includes('center') || loc.includes('northern') || loc.includes('giles') || loc.includes('2')) {
          window.selectBookingPub('pub2');
        } else {
          window.selectBookingPub('pub1');
        }
      } else {
        window.selectBookingPub(activeBookingPubKey || 'pub1');
      }

      // Set min date and default date to today or tomorrow
      const dateInput = document.getElementById('bookingDate');
      if (dateInput) {
        const todayIso = getTodayIsoDate();
        dateInput.min = todayIso;
        if (!dateInput.value) {
          dateInput.value = todayIso;
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
        submitBtn.innerHTML = `<span>Directly Send Reservation Mail</span> <span aria-hidden="true">&rarr;</span>`;
      }

      window.updateBookingRecipient();
    } catch (err) {
      console.warn('Booking modal initialization warning:', err);
    }

    // Auto-focus first empty field after smooth transition
    setTimeout(function () {
      const nameInput = document.getElementById('bookingName');
      if (nameInput && !nameInput.value) {
        nameInput.focus();
      }
    }, 150);
  };

  window.closeBookingModal = function () {
    const modal = document.getElementById('bookingModal');
    if (modal) {
      modal.classList.remove('is-open');
      modal.classList.add('hidden');
      modal.style.setProperty('display', 'none', 'important');
      document.body.style.overflow = '';
    }
  };

  // Close modal when pressing Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.keyCode === 27) {
      const modal = document.getElementById('bookingModal');
      if (modal && modal.classList.contains('is-open')) {
        window.closeBookingModal();
      }
    }
  });

  // Close modal when tapping backdrop outside the modal card
  document.addEventListener('click', function (e) {
    const modal = document.getElementById('bookingModal');
    if (modal && e.target === modal) {
      window.closeBookingModal();
    }
  });

  // Attach live input clearing
  document.addEventListener('DOMContentLoaded', function () {
    ['bookingName', 'bookingEmail', 'bookingPhone', 'bookingDate', 'bookingTime'].forEach(function (id) {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', function () {
          clearBookingFieldError(id);
        });
      }
    });

    // Delegate click for any element with .open-booking-modal or [data-open-booking]
    document.addEventListener('click', function (e) {
      const trigger = e.target.closest('.open-booking-modal, [data-open-booking]');
      if (trigger) {
        e.preventDefault();
        const targetPub = trigger.getAttribute('data-book-pub') || trigger.getAttribute('data-open-booking');
        window.openBookingModal(targetPub);
      }
    });
  });

  // Copy reservation ticket details to clipboard
  window.copyBookingDetails = function (btn) {
    const ticketDetails = document.getElementById('bookingTicketSummaryText');
    if (!ticketDetails) return;
    const textToCopy = ticketDetails.innerText || ticketDetails.textContent;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(function () {
        if (btn) {
          const origHtml = btn.innerHTML;
          btn.innerHTML = `<span>✓ Copied to Clipboard!</span>`;
          btn.classList.add('bg-emerald-500', 'text-black');
          setTimeout(function () {
            btn.innerHTML = origHtml;
            btn.classList.remove('bg-emerald-500', 'text-black');
          }, 2500);
        }
      }).catch(function () {
        alert('Reservation details:\n\n' + textToCopy);
      });
    } else {
      alert('Reservation details:\n\n' + textToCopy);
    }
  };

  window.renderBookingSuccess = function (data) {
    const formContainer = document.getElementById('bookingFormContainer');
    const successContainer = document.getElementById('bookingSuccessContainer');
    const form = document.getElementById('bookingForm');

    // Generate Google Calendar Link
    const calendarStartDate = (data.date || '').replace(/-/g, '') + 'T190000Z';
    const calendarEndDate = (data.date || '').replace(/-/g, '') + 'T210000Z';
    const calendarTitle = encodeURIComponent(`Table Booking: The Glitch (${data.pub.shortName})`);
    const calendarDesc = encodeURIComponent(`Reservation at ${data.pub.name}\nBooking Ref: ${data.refCode}\nGuests: ${data.guests}\nSeating: ${data.area || 'Standard'}\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nVenue Email: ${data.pub.email}\nAddress: ${data.pub.address}`);
    const calendarLocation = encodeURIComponent(data.pub.address);
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calendarTitle}&dates=${calendarStartDate}/${calendarEndDate}&details=${calendarDesc}&location=${calendarLocation}`;

    // Generate pre-filled Mailto link for direct client opening
    const mailtoSubject = encodeURIComponent(`Table Booking Confirmation [${data.refCode}] – ${data.pub.name} – ${data.name}`);
    const mailtoBody = encodeURIComponent(
      `Hello The Glitch Team (${data.pub.shortName}),\n\n` +
      `Here are the details for my table booking request:\n\n` +
      `• Booking Reference: ${data.refCode}\n` +
      `• Venue: ${data.pub.name}\n` +
      `• Address: ${data.pub.address}\n` +
      `• Destination Email: ${data.pub.email}\n\n` +
      `• Reservation Date: ${data.date}\n` +
      `• Reservation Time: ${data.time}\n` +
      `• Party Size: ${data.guests}\n` +
      `• Seating Preference: ${data.area || 'Standard Seating'}\n\n` +
      `Customer Details:\n` +
      `• Name: ${data.name}\n` +
      `• Email: ${data.email}\n` +
      `• Contact Number: ${data.phone}\n` +
      (data.notes ? `• Special Requests: ${data.notes}\n\n` : '\n') +
      `Please confirm my reservation. Thank you!`
    );
    const mailtoUrl = `mailto:${data.pub.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

    if (formContainer && successContainer) {
      formContainer.classList.add('hidden');
      successContainer.classList.remove('hidden');

      successContainer.innerHTML = `
        <div class="w-14 h-14 mx-auto rounded-full ${data.pub.badgeClass} border flex items-center justify-center shadow-lg shadow-cyan-500/10">
          <svg class="w-7 h-7 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
          </svg>
        </div>

        <div>
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest border" style="color: ${data.pub.color}; border-color: ${data.pub.color}40; background-color: ${data.pub.color}15;">
            <span>●</span> Direct Mail Dispatched
          </div>
          <h3 class="text-xl sm:text-2xl font-serif font-bold text-white mt-2">Reservation Request Sent!</h3>
          <p class="text-neutral-300 text-xs mt-1.5 max-w-md mx-auto leading-relaxed">
            Your table reservation email has been sent directly to <strong class="text-white">${data.pub.name}</strong> at <strong class="underline" style="color: ${data.pub.color}">${data.pub.email}</strong>.
          </p>
        </div>

        <!-- Reservation Receipt Ticket -->
        <div class="booking-ticket text-left text-xs space-y-2 text-neutral-300">
          <div class="booking-ticket-header flex justify-between items-center">
            <div>
              <span class="text-[10px] text-neutral-400 uppercase tracking-wider font-bold">Booking Reference</span>
              <div class="text-sm font-mono font-bold text-white tracking-wider" style="color: ${data.pub.color}">${data.refCode}</div>
            </div>
            <span class="px-2.5 py-1 rounded-full text-[10px] font-bold ${data.pub.badgeClass} border">
              ${data.pub.shortName}
            </span>
          </div>

          <!-- Hidden formatted text for quick clipboard copying -->
          <div id="bookingTicketSummaryText" class="sr-only">
THE GLITCH TABLE RESERVATION
Booking Reference: ${data.refCode}
Venue: ${data.pub.name}
Venue Email: ${data.pub.email}
Address: ${data.pub.address}
Date & Time: ${data.date} at ${data.time}
Party Size: ${data.guests}
Seating Area: ${data.area || 'Standard'}
Guest Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
${data.notes ? `Special Notes: ${data.notes}` : ''}
          </div>

          <div class="space-y-1.5 text-[12px]">
            <div class="flex justify-between items-start border-b border-white/[0.06] pb-1.5">
              <span class="text-neutral-400">Destination Mailbox:</span>
              <span class="font-bold text-white text-right" style="color: ${data.pub.color}">${data.pub.email}</span>
            </div>
            <div class="flex justify-between items-start border-b border-white/[0.06] pb-1.5">
              <span class="text-neutral-400">Venue Address:</span>
              <span class="text-neutral-200 text-right text-[11px] max-w-[220px]">${data.pub.address}</span>
            </div>
            <div class="flex justify-between items-center border-b border-white/[0.06] pb-1.5">
              <span class="text-neutral-400">Date &amp; Time:</span>
              <span class="text-white font-semibold">${data.date} &bull; ${data.time}</span>
            </div>
            <div class="flex justify-between items-center border-b border-white/[0.06] pb-1.5">
              <span class="text-neutral-400">Party Size:</span>
              <span class="text-white font-semibold">${data.guests}</span>
            </div>
            <div class="flex justify-between items-center border-b border-white/[0.06] pb-1.5">
              <span class="text-neutral-400">Guest Name:</span>
              <span class="text-white font-semibold">${escapeHtml(data.name)}</span>
            </div>
            <div class="flex justify-between items-center border-b border-white/[0.06] pb-1.5">
              <span class="text-neutral-400">Email ID:</span>
              <span class="text-white font-semibold">${escapeHtml(data.email)}</span>
            </div>
            <div class="flex justify-between items-center ${data.notes ? 'border-b border-white/[0.06] pb-1.5' : ''}">
              <span class="text-neutral-400">Contact Phone:</span>
              <span class="text-white font-semibold">${escapeHtml(data.phone)}</span>
            </div>
            ${data.notes ? `
            <div class="flex justify-between items-start pt-0.5">
              <span class="text-neutral-400">Special Notes:</span>
              <span class="text-neutral-200 text-right text-[11px] max-w-[200px] italic">${escapeHtml(data.notes)}</span>
            </div>` : ''}
          </div>
        </div>

        <!-- Action Button: Done • Close Confirmation -->
        <div class="pt-2">
          <button type="button" onclick="closeBookingModal()" class="w-full py-3.5 rounded-full bg-[#f4ede3] hover:bg-white text-neutral-900 font-bold tracking-wider uppercase text-xs transition duration-200 shadow-lg active:scale-95">
            Done &bull; Close Confirmation
          </button>
        </div>
      `;
    } else {
      alert(`🎉 Table Reserved!\n\nThank you ${data.name}, your table request for ${data.guests} at ${data.pub.name} (${data.date} at ${data.time}) has been sent directly to ${data.pub.email}.\nBooking Ref: ${data.refCode}\nContact details: ${data.email} | ${data.phone}`);
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
    const emailEl = document.getElementById('bookingEmail');
    const phoneEl = document.getElementById('bookingPhone');
    const notesEl = document.getElementById('bookingNotes');
    const submitBtn = document.getElementById('bookingSubmitBtn') || (e.target ? e.target.querySelector('button[type="submit"]') : null);

    clearAllBookingErrors();

    const pubConfig = getPubConfig(locEl ? locEl.value : activeBookingPubKey);

    const name = nameEl ? nameEl.value.trim() : '';
    let email = emailEl ? emailEl.value.trim() : '';
    let phone = phoneEl ? phoneEl.value.trim() : '';
    const date = dateEl ? dateEl.value.trim() : '';
    const time = timeEl ? timeEl.value.trim() : '';
    const guests = (guestsEl && guestsEl.value) || '2 Guests';
    const notes = notesEl && notesEl.value ? notesEl.value.trim() : '';

    // Validation
    let isValid = true;
    let firstInvalidEl = null;

    if (!name || name.length < 2) {
      setBookingFieldError('bookingName', 'Please enter your full name (minimum 2 letters).');
      isValid = false;
      if (!firstInvalidEl) firstInvalidEl = nameEl;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email) {
      setBookingFieldError('bookingEmail', 'Please enter your email ID (compulsory for confirmation).');
      isValid = false;
      if (!firstInvalidEl) firstInvalidEl = emailEl;
    } else if (!emailRegex.test(email)) {
      setBookingFieldError('bookingEmail', 'Please enter a valid email address (e.g. name@example.com).');
      isValid = false;
      if (!firstInvalidEl) firstInvalidEl = emailEl;
    }

    const digitsOnly = phone.replace(/[^0-9]/g, '');
    if (!phone) {
      setBookingFieldError('bookingPhone', 'Please enter your contact number (compulsory for confirmation).');
      isValid = false;
      if (!firstInvalidEl) firstInvalidEl = phoneEl;
    } else if (digitsOnly.length < 7) {
      setBookingFieldError('bookingPhone', 'Please enter a valid contact phone number (at least 7 digits).');
      isValid = false;
      if (!firstInvalidEl) firstInvalidEl = phoneEl;
    }

    if (!date) {
      setBookingFieldError('bookingDate', 'Please select a reservation date.');
      isValid = false;
      if (!firstInvalidEl) firstInvalidEl = dateEl;
    }

    if (!time) {
      setBookingFieldError('bookingTime', 'Please select a reservation time.');
      isValid = false;
      if (!firstInvalidEl) firstInvalidEl = timeEl;
    }

    if (!isValid) {
      if (firstInvalidEl) {
        firstInvalidEl.focus();
      }
      return;
    }

    // Generate unique booking reference
    const refCode = 'GLITCH-' + Math.random().toString(36).substring(2, 7).toUpperCase();

    // Show sending state on submit button
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="inline-flex items-center justify-center gap-2">
          <svg class="animate-spin h-4 w-4 text-current inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Directly sending email to ${pubConfig.email}...
        </span>
      `;
    }

    const emailSubject = `Table Booking Request [${refCode}] – ${pubConfig.name} – ${name} (${guests}, ${date} @ ${time})`;

    // 1. Post directly to FormSubmit background delivery endpoint
    try {
      await fetch(`https://formsubmit.co/ajax/${pubConfig.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: emailSubject,
          _replyto: email,
          _cc: email,
          _captcha: "false",
          "Booking Reference": refCode,
          "Pub Location": pubConfig.name,
          "Pub Address": pubConfig.address,
          "Pub Destination Email": pubConfig.email,
          "Customer Name": name,
          "Customer Email ID": email,
          "Contact Number": phone,
          "Reservation Date": date,
          "Reservation Time": time,
          "Party Size": guests,
          "Special Notes / Occasion": notes || "None provided",
          _template: "table"
        })
      }).catch(function (err) {
        console.info('Background email dispatch status:', err);
      });
    } catch (err) {
      console.info('Dispatch note:', err);
    }

    // 2. Render confirmation receipt card directly inside the modal
    window.renderBookingSuccess({
      pub: pubConfig,
      name: name,
      email: email,
      phone: phone,
      date: date,
      time: time,
      guests: guests,
      notes: notes,
      refCode: refCode
    });
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

  // 6. CONTROLLED 2-3 SECOND PRELOADER & SMOOTH PAGE TRANSITIONS
  function dismissGlitchLoader() {
    const loader = document.getElementById('glitchPageLoader');
    if (!loader || loader.classList.contains('loader-hidden')) return;
    loader.classList.add('loader-hidden');
    setTimeout(function () {
      if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
    }, 550);
  }

  // Safety fallback dismiss after 2.3 seconds
  setTimeout(dismissGlitchLoader, 2300);

  // 7. PAGE REDIRECT & NAVIGATION TRANSITION
  document.addEventListener('click', function (e) {
    const link = e.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href) return;

    // Ignore anchors, external links, mailto, tel, special attributes
    if (
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('javascript:') ||
      link.target === '_blank' ||
      link.hasAttribute('download') ||
      e.ctrlKey || e.metaKey || e.shiftKey
    ) {
      return;
    }

    // Intercept internal HTML pages
    const isHtmlPage = href.endsWith('.html') || (href.indexOf('://') === -1 && !href.startsWith('//') && !href.startsWith('http'));
    if (isHtmlPage) {
      let loader = document.getElementById('glitchPageLoader');
      if (!loader) {
        loader = document.createElement('div');
        loader.id = 'glitchPageLoader';
        loader.className = 'glitch-page-loader';
        loader.innerHTML = `
          <div class="glitch-loader-glow"></div>
          <div class="glitch-loader-content">
            <div class="glitch-spinner-box">
              <div class="glitch-ring-cyan"></div>
              <div class="glitch-ring-pink"></div>
              <img src="assets/logo.png" alt="The Glitch Logo" width="140" height="48" class="glitch-loader-logo" />
            </div>
            <div class="glitch-loader-meta">
              <span class="glitch-loader-title">THE GLITCH</span>
              <div class="glitch-loader-track">
                <div class="glitch-loader-bar"></div>
              </div>
              <span class="glitch-loader-tagline">Good Food &bull; Great Drinks &bull; Good Times</span>
            </div>
          </div>
        `;
        document.body.appendChild(loader);
      }
      loader.classList.remove('loader-hidden');

      e.preventDefault();
      setTimeout(function () {
        window.location.href = href;
      }, 200);
    }
  });


  // 7. DATE INPUT DEFAULT & RECIPIENT INITIALIZATION
  document.addEventListener('DOMContentLoaded', function () {
    const dateInput = document.getElementById('bookingDate');
    const today = new Date().toISOString().split('T')[0];
    if (dateInput) {
      dateInput.min = today;
      if (!dateInput.value) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.value = tomorrow.toISOString().split('T')[0];
      }
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

  window.handlePrivateHireSubmit = async function (e) {
    if (e && e.preventDefault) e.preventDefault();
    const select = document.getElementById('hireLocation');
    const form = e.target;
    const guestsInput = form ? form.querySelector('input[type="number"]') : null;
    const dateInput = form ? form.querySelector('input[type="date"]') : null;
    const nameInput = document.getElementById('hireName') || (form ? form.querySelector('input[type="text"]') : null);
    const emailInput = document.getElementById('hireEmail') || (form ? form.querySelector('input[type="email"]') : null);
    const phoneInput = document.getElementById('hirePhone') || (form ? form.querySelector('input[type="tel"]') : null);

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
    const name = (nameInput && nameInput.value.trim()) || '';
    const email = (emailInput && emailInput.value.trim()) || '';
    const phone = (phoneInput && phoneInput.value.trim()) || '';

    if (!name) {
      alert('Please enter your contact name (compulsory).');
      if (nameInput) nameInput.focus();
      return;
    }
    if (!email) {
      alert('Please enter your email address (compulsory).');
      if (emailInput) emailInput.focus();
      return;
    }
    if (!phone) {
      alert('Please enter your phone number (compulsory).');
      if (phoneInput) phoneInput.focus();
      return;
    }

    const contactSummary = `${name} | ${email} | ${phone}`;
    const subject = `Private Hire Inquiry: ${pubName} (${guests} Guests, ${date}) – ${name}`;
    const body = `THE GLITCH — PRIVATE HIRE INQUIRY
========================================
Venue            : ${pubName}
Target Mailbox   : ${targetEmail}
Guests Expected  : ${guests}
Target Date      : ${date}

CUSTOMER CONTACT DETAILS (COMPULSORY):
- Full Name      : ${name}
- Email Address  : ${email}
- Phone Number   : ${phone}

========================================
Sent via The Glitch Online Inquiry System`;

    try {
      if (targetEmail.includes(',')) {
        // Send to both pub email addresses
        await Promise.all([
          fetch(`https://formsubmit.co/ajax/norwich@pubtheglitch.co.uk`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
              _subject: subject,
              _replyto: email,
              _cc: `sg@pubtheglitch.co.uk, ${email}`,
              _captcha: "false",
              "Venue": pubName,
              "Target Email": "norwich@pubtheglitch.co.uk, sg@pubtheglitch.co.uk",
              "Customer Name (Compulsory)": name,
              "Customer Email (Compulsory)": email,
              "Customer Phone (Compulsory)": phone,
              "Guests": guests,
              "Date": date,
              _template: "table"
            })
          }).catch(() => {}),
          fetch(`https://formsubmit.co/ajax/sg@pubtheglitch.co.uk`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
              _subject: subject,
              _replyto: email,
              _cc: `norwich@pubtheglitch.co.uk, ${email}`,
              _captcha: "false",
              "Venue": pubName,
              "Target Email": "norwich@pubtheglitch.co.uk, sg@pubtheglitch.co.uk",
              "Customer Name (Compulsory)": name,
              "Customer Email (Compulsory)": email,
              "Customer Phone (Compulsory)": phone,
              "Guests": guests,
              "Date": date,
              _template: "table"
            })
          }).catch(() => {})
        ]);
      } else {
        await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            _subject: subject,
            _replyto: email,
            _cc: email,
            _captcha: "false",
            "Venue": pubName,
            "Target Email": targetEmail,
            "Customer Name (Compulsory)": name,
            "Customer Email (Compulsory)": email,
            "Customer Phone (Compulsory)": phone,
            "Guests": guests,
            "Date": date,
            _template: "table"
          })
        }).catch(() => {});
      }
    } catch (err) {}

    alert(`🎉 Private Hire Request Sent!\n\nThank you, ${name}!\nYour inquiry for ${pubName} has been sent directly to:\n${targetEmail}\n\nOur private events manager will reach out via ${phone} or ${email} shortly.`);
    window.closePrivateHireModal();
    if (form) form.reset();
  };

  // VIP CLUB NEWSLETTER SUBMISSION
  window.handleNewsletterSubmit = async function (e) {
    if (e && e.preventDefault) e.preventDefault();
    const form = e.target;
    const emailInput = form ? form.querySelector('input[type="email"]') : null;
    const subEmail = (emailInput && emailInput.value.trim()) || '';

    if (!subEmail) {
      alert('Please enter a valid email address.');
      if (emailInput) emailInput.focus();
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Joining...';
    }

    try {
      await fetch('https://formsubmit.co/ajax/norwich@pubtheglitch.co.uk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `New VIP Circle Newsletter Subscriber: ${subEmail}`,
          _replyto: subEmail,
          _cc: `sg@pubtheglitch.co.uk, ${subEmail}`,
          _captcha: 'false',
          "Subscription Type": "VIP Circle Newsletter",
          "Subscriber Email": subEmail,
          "Pub 1 Mailbox": "norwich@pubtheglitch.co.uk",
          "Pub 2 Mailbox": "sg@pubtheglitch.co.uk",
          _template: "table"
        })
      }).catch(() => {});
    } catch (err) {}

    if (form) {
      form.innerHTML = `
        <div class="px-4 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
          <span>You're in! Welcome to The Glitch VIP Circle.</span>
        </div>
      `;
    }
  };

})();
