/**
 * ==========================================================================
 * THE GLITCH — Premium Contact Page JavaScript
 * Dual-Pub Email Routing with EmailJS Integration
 * ==========================================================================
 */

// ==========================================================================
// 1. EMAILJS CONFIGURATION
// ==========================================================================
// IMPORTANT: Enter your live EmailJS credentials below.
// Sign up for free at https://www.emailjs.com/
//
// 1. serviceId:  Find in EmailJS Dashboard -> "Email Services" (e.g. "service_xxxxxxx")
// 2. templateId: Find in EmailJS Dashboard -> "Email Templates" (e.g. "template_xxxxxxx")
// 3. publicKey:  Find in EmailJS Dashboard -> "Account" -> "API Keys" (e.g. "user_xxxxxxx" or "xxxxxxx")
//
// SECURITY NOTE:
// The EmailJS Public Key is safe to place in frontend JavaScript.
// NEVER expose your private API secret keys or email account passwords in frontend code.
// ==========================================================================
const EMAIL_CONFIG = {
    serviceId: "YOUR_SERVICE_ID",     // <-- REPLACE WITH YOUR EMAILJS SERVICE ID
    templateId: "YOUR_TEMPLATE_ID",   // <-- REPLACE WITH YOUR EMAILJS TEMPLATE ID
    publicKey: "YOUR_PUBLIC_KEY"      // <-- REPLACE WITH YOUR EMAILJS PUBLIC KEY
};

// ==========================================================================
// 2. PUB LOCATIONS & EMAIL ROUTING DATA
// ==========================================================================
const PUB_DATA = {
    pub1: {
        id: "pub1",
        label: "Pub 1",
        name: "Pub 1 — City Centre",
        email: "norwich@pubtheglitch.co.uk",
        address: "37 Prince of Wales Rd, Norwich NR1 1BG, United Kingdom",
        hours: "Tue – Thu: 16:00 – 23:00 | Fri – Sat: 14:00 – 03:00 | Sun – Mon: Closed",
        themeColor: "#4deeea",
        cardId: "pubCard1",
        toggleBtnId: "togglePub1"
    },
    pub2: {
        id: "pub2",
        label: "Pub 2",
        name: "Pub 2 — City Center",
        email: "sg@pubtheglitch.co.uk",
        address: "25b St Giles St, Norwich NR2 1JN, United Kingdom",
        hours: "Mon – Wed: 12:00 – 21:30 | Thu – Sat: 11:00 – 23:00 | Sun: 12:00 – 21:30",
        themeColor: "#ff2a85",
        cardId: "pubCard2",
        toggleBtnId: "togglePub2"
    }
};

let currentPub = "pub1"; // Active selection defaults to Pub 1

// Initialize EmailJS SDK when library is present and live public key exists
(function initEmailJS() {
    if (typeof emailjs !== 'undefined' && EMAIL_CONFIG.publicKey && EMAIL_CONFIG.publicKey !== "YOUR_PUBLIC_KEY") {
        try {
            emailjs.init(EMAIL_CONFIG.publicKey);
            console.info("[EmailJS] Initialized with public key.");
        } catch (e) {
            console.warn("[EmailJS] Init warning:", e);
        }
    }
})();

// ==========================================================================
// 3. INTERACTIVE PUB LOCATION SELECTOR
// ==========================================================================
window.selectPub = function (pubKey) {
    if (!PUB_DATA[pubKey]) return;
    currentPub = pubKey;
    const pub = PUB_DATA[pubKey];

    // 1. Update Visual Pub Cards (Left Column / Header)
    const card1 = document.getElementById('pubCard1');
    const card2 = document.getElementById('pubCard2');
    const badge1 = document.getElementById('pubCard1Badge');
    const badge2 = document.getElementById('pubCard2Badge');

    if (card1 && card2) {
        if (pubKey === 'pub1') {
            card1.classList.add('active-pub1');
            card1.classList.remove('opacity-70');
            card2.classList.remove('active-pub2');
            card2.classList.add('opacity-70');
            if (badge1) badge1.innerHTML = '<span>Selected</span> &check;';
            if (badge2) badge2.innerHTML = '<span>Select Pub 2</span> &rarr;';
        } else {
            card2.classList.add('active-pub2');
            card2.classList.remove('opacity-70');
            card1.classList.remove('active-pub1');
            card1.classList.add('opacity-70');
            if (badge2) badge2.innerHTML = '<span>Selected</span> &check;';
            if (badge1) badge1.innerHTML = '<span>Select Pub 1</span> &rarr;';
        }
    }

    // 2. Update Form Toggle Buttons [ Pub 1 ] [ Pub 2 ]
    const btn1 = document.getElementById('togglePub1');
    const btn2 = document.getElementById('togglePub2');

    if (btn1 && btn2) {
        if (pubKey === 'pub1') {
            btn1.className = 'pub-toggle-btn active-pub1';
            btn1.setAttribute('aria-pressed', 'true');
            btn2.className = 'pub-toggle-btn';
            btn2.setAttribute('aria-pressed', 'false');
        } else {
            btn2.className = 'pub-toggle-btn active-pub2';
            btn2.setAttribute('aria-pressed', 'true');
            btn1.className = 'pub-toggle-btn';
            btn1.setAttribute('aria-pressed', 'false');
        }
    }

    // 3. Update hidden input for form data
    const pubInput = document.getElementById('contactPub');
    if (pubInput) {
        pubInput.value = pub.label;
    }

    // 4. Update Live Destination Mailbox Notice
    const noticeEl = document.getElementById('contactPubNotice');
    if (noticeEl) {
        if (pubKey === 'pub1') {
            noticeEl.className = 'mt-3 text-xs px-3.5 py-2.5 rounded-lg bg-[#4deeea]/10 border border-[#4deeea]/30 text-[#5ce1e6] flex items-center gap-2.5 font-medium transition-all duration-300';
            noticeEl.innerHTML = `
                <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                <span>Enquiry will route directly to <strong>Pub 1</strong>: <strong class="underline tracking-wide text-white">${pub.email}</strong></span>
            `;
        } else {
            noticeEl.className = 'mt-3 text-xs px-3.5 py-2.5 rounded-lg bg-[#ff2a85]/10 border border-[#ff2a85]/30 text-[#ff4fa8] flex items-center gap-2.5 font-medium transition-all duration-300';
            noticeEl.innerHTML = `
                <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                <span>Enquiry will route directly to <strong>Pub 2</strong>: <strong class="underline tracking-wide text-white">${pub.email}</strong></span>
            `;
        }
    }

    // 5. Synchronize with interactive map switcher if present
    if (typeof window.switchMapLocation === 'function') {
        window.switchMapLocation(pubKey === 'pub1' ? 'cityCentre' : 'cityCenter');
    }
};

// ==========================================================================
// 4. FORM VALIDATION HELPERS
// ==========================================================================
function setFieldError(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(errorId);
    if (field) {
        field.classList.add('is-invalid');
        const group = field.closest('.form-group');
        if (group) group.classList.add('has-error');
    }
    if (errorEl) {
        errorEl.textContent = message;
    }
}

function clearFieldError(fieldId, errorId) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(errorId);
    if (field) {
        field.classList.remove('is-invalid');
        const group = field.closest('.form-group');
        if (group) group.classList.remove('has-error');
    }
    if (errorEl) {
        errorEl.textContent = '';
    }
}

function validateEmail(email) {
    // Robust email regex checking local-part and domain with TLD
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function validatePhone(phone) {
    // Allows UK/International formats: e.g. 07123456789, +44 7123 456789
    const digitsOnly = phone.replace(/[^0-9]/g, '');
    return digitsOnly.length >= 7 && /^[+0-9\s\-()./]{7,25}$/.test(phone);
}

// ==========================================================================
// 5. MAIN FORM SUBMISSION & EMAILJS INTEGRATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Set initial pub selection state
    window.selectPub('pub1');

    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('contactSubmitBtn');
    const statusBanner = document.getElementById('formStatusBanner');

    // Input fields
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const phoneInput = document.getElementById('contactPhone');
    const subjectInput = document.getElementById('contactSubject');
    const messageInput = document.getElementById('contactMessage');

    // Attach real-time validation clear handlers
    if (nameInput) {
        nameInput.addEventListener('input', () => clearFieldError('contactName', 'nameError'));
    }
    if (emailInput) {
        emailInput.addEventListener('input', () => clearFieldError('contactEmail', 'emailError'));
    }
    if (phoneInput) {
        phoneInput.addEventListener('input', () => clearFieldError('contactPhone', 'phoneError'));
    }
    if (subjectInput) {
        subjectInput.addEventListener('input', () => clearFieldError('contactSubject', 'subjectError'));
        subjectInput.addEventListener('change', () => clearFieldError('contactSubject', 'subjectError'));
    }
    if (messageInput) {
        messageInput.addEventListener('input', () => clearFieldError('contactMessage', 'messageError'));
    }

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Clear previous general status banner
            if (statusBanner) {
                statusBanner.style.display = 'none';
                statusBanner.className = 'form-status-banner';
                statusBanner.innerHTML = '';
            }

            // Extract values
            const nameVal = nameInput ? nameInput.value.trim() : '';
            const emailVal = emailInput ? emailInput.value.trim() : '';
            const phoneVal = phoneInput ? phoneInput.value.trim() : '';
            const subjectVal = subjectInput ? subjectInput.value.trim() : '';
            const messageVal = messageInput ? messageInput.value.trim() : '';

            // Run validations
            let isValid = true;
            let firstInvalidEl = null;

            // 1. Validate Name
            if (!nameVal || nameVal.length < 2) {
                setFieldError('contactName', 'nameError', 'Please enter your full name (minimum 2 characters).');
                isValid = false;
                if (!firstInvalidEl) firstInvalidEl = nameInput;
            } else {
                clearFieldError('contactName', 'nameError');
            }

            // 2. Validate Email
            if (!emailVal) {
                setFieldError('contactEmail', 'emailError', 'Please enter your email address.');
                isValid = false;
                if (!firstInvalidEl) firstInvalidEl = emailInput;
            } else if (!validateEmail(emailVal)) {
                setFieldError('contactEmail', 'emailError', 'Please enter a valid email address (e.g. alex@example.com).');
                isValid = false;
                if (!firstInvalidEl) firstInvalidEl = emailInput;
            } else {
                clearFieldError('contactEmail', 'emailError');
            }

            // 3. Validate Phone
            if (!phoneVal) {
                setFieldError('contactPhone', 'phoneError', 'Please enter your phone number.');
                isValid = false;
                if (!firstInvalidEl) firstInvalidEl = phoneInput;
            } else if (!validatePhone(phoneVal)) {
                setFieldError('contactPhone', 'phoneError', 'Please enter a valid phone number (at least 7 digits).');
                isValid = false;
                if (!firstInvalidEl) firstInvalidEl = phoneInput;
            } else {
                clearFieldError('contactPhone', 'phoneError');
            }

            // 4. Validate Subject
            if (!subjectVal) {
                setFieldError('contactSubject', 'subjectError', 'Please select or provide an enquiry subject.');
                isValid = false;
                if (!firstInvalidEl) firstInvalidEl = subjectInput;
            } else {
                clearFieldError('contactSubject', 'subjectError');
            }

            // 5. Validate Message
            if (!messageVal || messageVal.length < 10) {
                setFieldError('contactMessage', 'messageError', 'Please enter your message (at least 10 characters).');
                isValid = false;
                if (!firstInvalidEl) firstInvalidEl = messageInput;
            } else {
                clearFieldError('contactMessage', 'messageError');
            }

            if (!isValid) {
                if (firstInvalidEl) {
                    firstInvalidEl.focus();
                    firstInvalidEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }

            // ==============================================================
            // 6. ASSEMBLE EMAIL PAYLOAD & ROUTE TO SELECTED PUB
            // ==============================================================
            const selectedPubInfo = PUB_DATA[currentPub] || PUB_DATA.pub1;
            const recipientEmail = selectedPubInfo.email;
            const selectedPubName = selectedPubInfo.label; // "Pub 1" or "Pub 2"

            const templateParams = {
                customer_name: nameVal,
                customer_email: emailVal,
                customer_phone: phoneVal,
                selected_pub: selectedPubName,
                subject: subjectVal,
                message: messageVal,
                recipient_email: recipientEmail
            };

            // Loading state on button
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-black inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>SENDING MESSAGE...</span>
                `;
            }

            // ==============================================================
            // 7. EXECUTE DIRECT DISPATCH (EmailJS if configured, FormSubmit live delivery)
            // ==============================================================
            const isPlaceholderConfig = !EMAIL_CONFIG.publicKey ||
                EMAIL_CONFIG.publicKey === "YOUR_PUBLIC_KEY" ||
                EMAIL_CONFIG.serviceId === "YOUR_SERVICE_ID";

            try {
                let sentViaEmailJS = false;

                // 1. Attempt EmailJS if real credentials have been provided
                if (!isPlaceholderConfig && typeof emailjs !== 'undefined') {
                    try {
                        await emailjs.send(EMAIL_CONFIG.serviceId, EMAIL_CONFIG.templateId, templateParams);
                        console.info("[EmailJS] Message sent successfully to " + recipientEmail);
                        sentViaEmailJS = true;
                    } catch (ejsErr) {
                        console.warn("[EmailJS dispatch issue, attempting FormSubmit fallback]:", ejsErr);
                    }
                }

                // 2. If EmailJS is not configured or failed, dispatch via FormSubmit
                if (!sentViaEmailJS) {
                    console.info(`[Email Dispatch] Sending live enquiry to ${recipientEmail} via FormSubmit...`);
                    const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            _subject: `New Contact Enquiry [${selectedPubName}]: ${subjectVal} - ${nameVal}`,
                            _replyto: emailVal,
                            _cc: emailVal,
                            _captcha: "false",
                            "Selected Pub": selectedPubName,
                            "Destination Email": recipientEmail,
                            "Customer Name": nameVal,
                            "Customer Email": emailVal,
                            "Customer Phone": phoneVal,
                            "Subject": subjectVal,
                            "Message": messageVal,
                            _template: "table"
                        })
                    });

                    const resData = await response.json().catch(() => ({ success: 'true' }));
                    console.info("[FormSubmit Result]", resData);
                }

                // SUCCESS NOTIFICATION
                if (statusBanner) {
                    statusBanner.className = 'form-status-banner success';
                    statusBanner.innerHTML = `
                        <svg class="w-6 h-6 shrink-0 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div class="space-y-2 flex-1">
                            <div class="font-serif font-bold text-white text-base">Enquiry Sent Directly!</div>
                            <p class="text-sm text-neutral-200">
                                Thank you, <strong>${escapeHtml(nameVal)}</strong>! Your enquiry regarding <em>"${escapeHtml(subjectVal)}"</em> has been dispatched directly to <strong class="text-white">${selectedPubInfo.name}</strong> at <strong class="underline" style="color: ${selectedPubInfo.themeColor}">${recipientEmail}</strong>.
                            </p>
                            <p class="text-xs text-neutral-400">
                                Our hospitality team will review your message and reply to <strong>${escapeHtml(emailVal)}</strong> within 24 hours.
                            </p>
                        </div>
                    `;
                    statusBanner.style.display = 'flex';
                    statusBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }

                // Reset form fields
                contactForm.reset();
                window.selectPub('pub1'); // Reset to default location

            } catch (error) {
                console.error("[EmailJS Error]", error);

                // ERROR NOTIFICATION (Customer-safe message)
                if (statusBanner) {
                    statusBanner.className = 'form-status-banner error';
                    statusBanner.innerHTML = `
                        <svg class="w-6 h-6 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div class="space-y-2 flex-1">
                            <div class="font-serif font-bold text-red-300 text-base">Network Error Sending Online</div>
                            <p class="text-sm text-red-200">
                                We could not send your message online due to a network interruption. Please send it directly to <strong>${selectedPubInfo.name}</strong>:
                            </p>
                            <a href="mailto:${recipientEmail}?subject=${encodeURIComponent(`Enquiry [${selectedPubName}]: ${subjectVal} - ${nameVal}`)}&body=${encodeURIComponent(`Name: ${nameVal}\nPhone: ${phoneVal}\nEmail: ${emailVal}\nPub: ${selectedPubName}\n\nMessage:\n${messageVal}`)}" class="inline-flex items-center gap-2 px-4 py-2 mt-1 rounded-lg bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition">
                                <span>Send Directly to ${recipientEmail}</span>
                                <span>&rarr;</span>
                            </a>
                        </div>
                    `;
                    statusBanner.style.display = 'flex';
                    statusBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            } finally {
                // Restore button state
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `
                        <span>SEND MESSAGE</span>
                        <span class="btn-arrow" aria-hidden="true">&rarr;</span>
                    `;
                }
            }
        });
    }

    // Interactive Map switcher logic
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
        } else {
            if (mapTabNQ) mapTabNQ.classList.add('active');
            if (mapTabCC) mapTabCC.classList.remove('active');
            mapIframe.src = mapLocations.cityCenter.url;
            if (mapExtLink) {
                mapExtLink.href = mapLocations.cityCenter.extUrl;
                mapExtLink.textContent = mapLocations.cityCenter.label;
            }
        }
    };

    if (mapTabCC) {
        mapTabCC.addEventListener('click', () => {
            window.selectPub('pub1');
        });
    }
    if (mapTabNQ) {
        mapTabNQ.addEventListener('click', () => {
            window.selectPub('pub2');
        });
    }

    // Scroll trigger from hero
    const scrollIndicator = document.getElementById('heroScrollTrigger');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById('contact-main');
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    }
});

function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
