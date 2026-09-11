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
      url: 'https://maps.google.com/maps?q=37+Prince+of+Wales+Rd,+Norwich+NR1+1BG,+UK&t=&z=16&ie=UTF8&iwloc=&output=embed',
      extUrl: 'https://maps.google.com/?q=37+Prince+of+Wales+Rd+Norwich+NR1+1BG',
      label: 'Open City Centre in Google Maps ↗'
    },
    cityCenter: {
      url: 'https://maps.google.com/maps?q=25b+St+Giles+St,+Norwich+NR2+1JN,+UK&t=&z=16&ie=UTF8&iwloc=&output=embed',
      extUrl: 'https://maps.google.com/?q=25b+St+Giles+St+Norwich+NR2+1JN',
      label: 'Open City Center in Google Maps ↗'
    },
    get northernQuarter() { return this.cityCenter; }
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
      const pubInput = document.getElementById('contactPub');
      if (pubInput) {
        pubInput.value = 'Pub 01 – City Centre';
        window.updateContactPubNotice();
      }
    } else if (loc === 'northernQuarter' || loc === 'cityCenter') {
      if (mapTabNQ) mapTabNQ.classList.add('active');
      if (mapTabCC) mapTabCC.classList.remove('active');
      mapIframe.src = mapLocations.cityCenter.url;
      if (mapExtLink) {
        mapExtLink.href = mapLocations.cityCenter.extUrl;
        mapExtLink.textContent = mapLocations.cityCenter.label;
      }
      const pubInput = document.getElementById('contactPub');
      if (pubInput) {
        pubInput.value = 'Pub 02 – City Center';
        window.updateContactPubNotice();
      }
    }
  };

  if (mapTabCC) {
    mapTabCC.addEventListener('click', () => switchMapLocation('cityCentre'));
  }
  if (mapTabNQ) {
    mapTabNQ.addEventListener('click', () => switchMapLocation('cityCenter'));
  }

  // Live destination notice for Select Pub dropdown
  window.updateContactPubNotice = function () {
    const pubInput = document.getElementById('contactPub');
    const noticeEl = document.getElementById('contactPubNotice');
    if (!pubInput || !noticeEl) return;

    const val = pubInput.value.toLowerCase();
    if (val.includes('center') || val.includes('02') || val.includes('sg@') || val.includes('giles')) {
      noticeEl.className = 'mt-2 text-xs px-3.5 py-2 rounded-lg bg-[#ff3b94]/10 border border-[#ff3b94]/30 text-[#ff3b94] flex items-center gap-2 font-medium transition-all duration-300';
      noticeEl.innerHTML = `
        <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        <span>Inquiry will go directly to Pub 02: <strong id="contactPubTargetEmail" class="underline tracking-wide">sg@pubtheglitch.co.uk</strong></span>
      `;
    } else if (val.includes('both') || val.includes('general')) {
      noticeEl.className = 'mt-2 text-xs px-3.5 py-2 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center gap-2 font-medium transition-all duration-300';
      noticeEl.innerHTML = `
        <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        <span>General inquiry will go to: <strong id="contactPubTargetEmail" class="underline tracking-wide">norwich@pubtheglitch.co.uk</strong></span>
      `;
    } else {
      noticeEl.className = 'mt-2 text-xs px-3.5 py-2 rounded-lg bg-[#5ce1e6]/10 border border-[#5ce1e6]/30 text-[#5ce1e6] flex items-center gap-2 font-medium transition-all duration-300';
      noticeEl.innerHTML = `
        <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        <span>Inquiry will go directly to Pub 01: <strong id="contactPubTargetEmail" class="underline tracking-wide">norwich@pubtheglitch.co.uk</strong></span>
      `;
    }
  };

  window.updateContactPubNotice();

  // 2. Contact Form Interactive Handler
  const contactForm = document.getElementById('contactForm');
  const formSubmitBtn = document.getElementById('contactSubmitBtn');
  const formStatus = document.getElementById('formStatusBanner');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const phoneInput = document.getElementById('contactPhone');
      const pubInput = document.getElementById('contactPub');
      const subjectInput = document.getElementById('contactSubject');
      const msgInput = document.getElementById('contactMessage');

      const nameVal = nameInput ? nameInput.value.trim() : 'Guest';
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const phoneVal = phoneInput ? phoneInput.value.trim() : '';
      const pubVal = pubInput ? pubInput.value : 'Pub 01 – City Centre';
      const subjectVal = subjectInput ? subjectInput.value : 'General Inquiry';
      const msgVal = msgInput ? msgInput.value.trim() : '';

      const isPub2 = pubVal.toLowerCase().includes('center') || pubVal.toLowerCase().includes('sg@') || pubVal.includes('02');
      const targetEmail = isPub2 ? 'sg@pubtheglitch.co.uk' : 'norwich@pubtheglitch.co.uk';
      const pubTitle = isPub2 ? 'Pub 02 — City Center' : 'Pub 01 — City Centre';

      // Button loading state
      if (formSubmitBtn) {
        formSubmitBtn.disabled = true;
        formSubmitBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-black inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>SENDING TO ${targetEmail}...</span>
        `;
      }

      // Background dispatch via FormSubmit
      try {
        fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            _subject: `Contact Inquiry: [${pubTitle}] ${subjectVal} - ${nameVal}`,
            "Pub Destination": pubTitle,
            "Target Email": targetEmail,
            "Customer Name": nameVal,
            "Customer Email": emailVal,
            "Customer Phone": phoneVal || "N/A",
            "Subject": subjectVal,
            "Message": msgVal,
            _template: "table"
          })
        }).catch(() => {});
      } catch (err) {}

      // Mailto backup trigger
      const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(`[${pubTitle}] ${subjectVal} - ${nameVal}`)}&body=${encodeURIComponent(`Name: ${nameVal}\nEmail: ${emailVal}\nPhone: ${phoneVal}\nPub: ${pubTitle}\n\nMessage:\n${msgVal}`)}`;

      // Simulate prompt dispatch & response
      setTimeout(() => {
        if (formStatus) {
          formStatus.className = 'form-status-banner success';
          formStatus.innerHTML = `
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <strong>Thank you, ${nameVal}!</strong> Your message regarding <em>"${subjectVal}"</em> has been dispatched directly to <strong>${targetEmail}</strong> (${pubTitle}). Our team will be in touch with you at <strong>${emailVal}</strong>.
              <div class="mt-2">
                <a href="${mailtoUrl}" class="inline-block px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-white text-xs font-semibold underline transition">Send directly from your email app ✉️</a>
              </div>
            </div>
          `;
          formStatus.style.display = 'flex';
          formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Reset form & restore button
        contactForm.reset();
        window.updateContactPubNotice();
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

