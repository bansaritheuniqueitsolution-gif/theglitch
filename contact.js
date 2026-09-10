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

