/**
 * THE GLITCH — DUAL LOCATION EDITORIAL GALLERY CONTROLLER
 * Architecture: Vanilla JavaScript (ES6+)
 * Features:
 *   - Automatic Default to Pub 1 (The Glitch 1 – Prince of Wales Rd) on Page Load
 *   - Dual Location Switching: Glitch 1 (Prince of Wales Rd) vs Glitch 2 (Norwich Market) vs All
 *   - Synchronized Showcase Cards, Hero Parallax, and Sticky Location Controls
 *   - Dynamic Category Filtering & Live Item Counts per Location
 *   - Cinema Lightbox with Venue Badges, Counter, Keyboard & Touch/Swipe
 */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. EDITORIAL GALLERY DATA (CURATED PHOTOS ACROSS BOTH PUBS)
  // -------------------------------------------------------------------------
  const GALLERY_DATA = [
    // =======================================================================
    // PUB 1: THE GLITCH 1 — PRINCE OF WALES RD (37 Prince of Wales Rd, Norwich)
    // =======================================================================
    {
      id: 101,
      location: 'glitch1',
      locationLabel: 'The Glitch 1 — Prince of Wales Rd',
      locationBadge: 'Pub 1 • Prince of Wales Rd',
      locationColor: 'cyan',
      title: 'Glitch Neon Facade & Weekend Offers',
      subtitle: '37 Prince of Wales Rd illuminated storefront & fresh draught pints',
      category: 'PUB',
      image: 'assets/pub1-exterior-facade.jpg',
      spanClass: 'col-span-8 row-span-2',
      alt: 'Glowing neon Glitch Pub facade and weekend offer display at 37 Prince of Wales Rd'
    },
    {
      id: 102,
      location: 'glitch1',
      locationLabel: 'The Glitch 1 — Prince of Wales Rd',
      locationBadge: 'Pub 1 • Prince of Wales Rd',
      locationColor: 'cyan',
      title: 'Craft Draught Beer Wall & Foliage',
      subtitle: 'Cold Carling, Guinness, Aspall cider & fresh ivy foliage garland',
      category: 'PUB',
      image: 'assets/pub1-taps.jpg',
      spanClass: 'col-span-4 row-span-2',
      alt: 'Craft draught beer taps with fresh foliage garland at The Glitch Pub 1'
    },
    {
      id: 103,
      location: 'glitch1',
      locationLabel: 'The Glitch 1 — Prince of Wales Rd',
      locationBadge: 'Pub 1 • Prince of Wales Rd',
      locationColor: 'cyan',
      title: 'The Perfect Pint of Guinness',
      subtitle: 'Creamy cold pour with shamrock head on rustic timber counter',
      category: 'DRINKS',
      image: 'assets/pub1-guinness.jpg',
      spanClass: 'col-span-4 row-span-1',
      alt: 'Freshly poured pint of Guinness with shamrock at The Glitch 1'
    },
    {
      id: 104,
      location: 'glitch1',
      locationLabel: 'The Glitch 1 — Prince of Wales Rd',
      locationBadge: 'Pub 1 • Prince of Wales Rd',
      locationColor: 'cyan',
      title: 'Matchday Sports Lounge & Darts',
      subtitle: 'Live football screens, team flags and lively social corner',
      category: 'PUB',
      image: 'assets/pub1-sports.jpg',
      spanClass: 'col-span-4 row-span-1',
      alt: 'Live sports lounge with TVs and dart board at The Glitch 1'
    },
    {
      id: 105,
      location: 'glitch1',
      locationLabel: 'The Glitch 1 — Prince of Wales Rd',
      locationBadge: 'Pub 1 • Prince of Wales Rd',
      locationColor: 'cyan',
      title: 'Prince of Wales Rd Main Bar & Spirits',
      subtitle: 'Rustic wood bar counter, optic spirits and mirror reflections',
      category: 'PUB',
      image: 'assets/pub1-bar.jpg',
      spanClass: 'col-span-4 row-span-1',
      alt: 'Main wooden bar counter with optic bottles and glassware at The Glitch 1'
    },
    {
      id: 106,
      location: 'glitch1',
      locationLabel: 'The Glitch 1 — Prince of Wales Rd',
      locationBadge: 'Pub 1 • Prince of Wales Rd',
      locationColor: 'cyan',
      title: 'Fresh Pours & Signature Spirits',
      subtitle: 'Chilled pints, IPAs and cocktails lined up along the bar',
      category: 'DRINKS',
      image: 'assets/pub1-drinks.jpg',
      spanClass: 'col-span-6 row-span-2',
      alt: 'Selection of pints and spirit drinks lined up on the bar at The Glitch 1'
    },
    {
      id: 108,
      location: 'glitch1',
      locationLabel: 'The Glitch 1 — Prince of Wales Rd',
      locationBadge: 'Pub 1 • Prince of Wales Rd',
      locationColor: 'cyan',
      title: 'Chilled Craft Ciders & Bottles',
      subtitle: 'Crisp refreshment under warm amber back-lighting',
      category: 'DRINKS',
      image: 'assets/pub1-cider.jpg',
      spanClass: 'col-span-6 row-span-1',
      alt: 'Cold craft cider pints and bottles at The Glitch 1'
    },
    {
      id: 109,
      location: 'glitch1',
      locationLabel: 'The Glitch 1 — Prince of Wales Rd',
      locationBadge: 'Pub 1 • Prince of Wales Rd',
      locationColor: 'cyan',
      title: 'Prince of Wales Rd Daytime Facade',
      subtitle: 'Heart of Norwich Prince of Wales Rd pub facade in natural daylight',
      category: 'ATMOSPHERE',
      image: 'assets/pub1-exterior-day.jpg',
      spanClass: 'col-span-6 row-span-1',
      alt: 'Daytime street entrance of The Glitch Pub 1 on Prince of Wales Rd'
    },
    {
      id: 107,
      location: 'glitch1',
      locationLabel: 'The Glitch 1 — Prince of Wales Rd',
      locationBadge: 'Pub 1 • Prince of Wales Rd',
      locationColor: 'cyan',
      title: 'The Glitch Private Reserve VIP Suite',
      subtitle: 'Luxury curved leather booths, ambient cyan neon glow & private celebration table',
      category: 'ATMOSPHERE',
      image: 'assets/pub1-party-suite.jpg?v=2',
      spanClass: 'col-span-8 row-span-2',
      alt: 'The Glitch Private Reserve VIP Party Room & Celebration Suite at Prince of Wales Rd'
    },
    {
      id: 111,
      location: 'glitch1',
      locationLabel: 'The Glitch 1 — Prince of Wales Rd',
      locationBadge: 'Pub 1 • Prince of Wales Rd',
      locationColor: 'cyan',
      title: 'Tropical Dragonfruit Mocktail',
      subtitle: 'Vibrant crushed ice, fresh dragonfruit slice, aromatic mint & zesty lime wedge',
      category: 'DRINKS',
      image: 'assets/pub1-dragonfruit-mocktail.jpg?v=2',
      spanClass: 'col-span-4 row-span-1',
      alt: 'Signature Tropical Dragonfruit Mocktail in crystal highball glass at The Glitch 1'
    },
    {
      id: 110,
      location: 'glitch1',
      locationLabel: 'The Glitch 1 — Prince of Wales Rd',
      locationBadge: 'Pub 1 • Prince of Wales Rd',
      locationColor: 'cyan',
      title: 'Weekend DJ Party & Club Decks Atmosphere',
      subtitle: 'Resident & guest DJs spinning vinyl, dance anthems & party bangers every Friday & Saturday night',
      category: 'ATMOSPHERE',
      image: 'assets/event-dj-pub1.jpg',
      spanClass: 'col-span-6 row-span-2',
      alt: 'Weekend DJ party lights and club atmosphere at Pub 1 Prince of Wales Rd'
    },

    // =======================================================================
    // PUB 2: THE GLITCH 2 — NORWICH MARKET (25b St Giles St, Norwich)
    // =======================================================================
    {
      id: 200,
      location: 'glitch2',
      locationLabel: 'The Glitch 2 — Norwich Market',
      locationBadge: 'Pub 2 • Norwich Market',
      locationColor: 'pink',
      title: 'St Giles Street Twilight Facade & Patio',
      subtitle: 'Glowing neon sign, cobblestones, outdoor street seating & warm evening pub glow',
      category: 'PUB',
      image: 'assets/pub2-exterior-twilight.jpg',
      spanClass: 'col-span-8 row-span-2',
      alt: 'Atmospheric twilight exterior facade and outdoor patio of The Glitch 2 on St Giles Street'
    },
    {
      id: 201,
      location: 'glitch2',
      locationLabel: 'The Glitch 2 — Norwich Market',
      locationBadge: 'Pub 2 • Norwich Market',
      locationColor: 'pink',
      title: 'Curved Golden Bar Counter',
      subtitle: 'Hand-hammered brass finish with amber drop lights & velvet stools',
      category: 'PUB',
      image: 'assets/pub2-golden-bar.jpg',
      spanClass: 'col-span-4 row-span-2',
      alt: 'Atmospheric curved golden bar counter at The Glitch 2 St Giles'
    },
    {
      id: 202,
      location: 'glitch2',
      locationLabel: 'The Glitch 2 — Norwich Market',
      locationBadge: 'Pub 2 • Norwich Market',
      locationColor: 'pink',
      title: 'The Bathtub Snug',
      subtitle: 'Signature clawfoot bathtub seating with gilded vintage mirror',
      category: 'ATMOSPHERE',
      image: 'assets/pub2-bathtub-snug.jpg',
      spanClass: 'col-span-4 row-span-2',
      alt: 'Unique clawfoot bathtub lounge snug at The Glitch 2'
    },
    {
      id: 203,
      location: 'glitch2',
      locationLabel: 'The Glitch 2 — Norwich Market',
      locationBadge: 'Pub 2 • Norwich Market',
      locationColor: 'pink',
      title: 'Canopy Daybed Snug',
      subtitle: 'Ivy-draped four-poster booth with moody fairy lights',
      category: 'ATMOSPHERE',
      image: 'assets/pub2-canopy-snug.jpg',
      spanClass: 'col-span-4 row-span-1',
      alt: 'Four-poster daybed booth with ivy and fairy lights at The Glitch 2'
    },
    {
      id: 204,
      location: 'glitch2',
      locationLabel: 'The Glitch 2 — Norwich Market',
      locationBadge: 'Pub 2 • Norwich Market',
      locationColor: 'pink',
      title: 'No Old Favourites & Chess Nook',
      subtitle: 'Illuminated neon signage & handcrafted chess corner',
      category: 'ATMOSPHERE',
      image: 'assets/pub2-chess.jpg',
      spanClass: 'col-span-4 row-span-1',
      alt: 'Handcrafted chess board with glowing neon sign at The Glitch 2'
    },
    {
      id: 205,
      location: 'glitch2',
      locationLabel: 'The Glitch 2 — Norwich Market',
      locationBadge: 'Pub 2 • Norwich Market',
      locationColor: 'pink',
      title: 'St Giles Street Piano Lounge',
      subtitle: 'Vintage upright wooden piano overlooking historic St Giles St',
      category: 'PUB',
      image: 'assets/pub2-piano.jpg',
      spanClass: 'col-span-4 row-span-1',
      alt: 'Vintage upright piano by the street window at The Glitch 2'
    },
    {
      id: 206,
      location: 'glitch2',
      locationLabel: 'The Glitch 2 — Norwich Market',
      locationBadge: 'Pub 2 • Norwich Market',
      locationColor: 'pink',
      title: 'Signature Sunset Highball',
      subtitle: 'Layered citrus aperitif, botanical gin & fresh orange wheel',
      category: 'FOOD & DRINKS',
      image: 'assets/pub2-cocktail.jpg',
      spanClass: 'col-span-6 row-span-2',
      alt: 'Signature sunset layered highball cocktail in ribbed glassware'
    },
    {
      id: 207,
      location: 'glitch2',
      locationLabel: 'The Glitch 2 — Norwich Market',
      locationBadge: 'Pub 2 • Norwich Market',
      locationColor: 'pink',
      title: 'Smoked Botanical Coupe',
      subtitle: 'Bespoke artisan cocktail infused with herbal aromatics',
      category: 'FOOD & DRINKS',
      image: 'assets/pub2-artisan-cocktail.jpg',
      spanClass: 'col-span-6 row-span-2',
      alt: 'Smoked botanical cocktail coupe at The Glitch 2'
    },
    {
      id: 208,
      location: 'glitch2',
      locationLabel: 'The Glitch 2 — Norwich Market',
      locationBadge: 'Pub 2 • Norwich Market',
      locationColor: 'pink',
      title: 'Velvet Lounge & Cyan Glow',
      subtitle: 'Moody seating under dual cyan & magenta neon ambient lights',
      category: 'ATMOSPHERE',
      image: 'assets/pub2-neon-lounge.jpg',
      spanClass: 'col-span-4 row-span-1',
      alt: 'Moody velvet lounge booths with neon signs at The Glitch 2'
    },
    {
      id: 209,
      location: 'glitch2',
      locationLabel: 'The Glitch 2 — Norwich Market',
      locationBadge: 'Pub 2 • Norwich Market',
      locationColor: 'pink',
      title: 'Intimate Candlelit Tables',
      subtitle: 'Romantic evening dining and cocktails under warm candlelight',
      category: 'ATMOSPHERE',
      image: 'assets/pub2-candle-vibe.jpg',
      spanClass: 'col-span-4 row-span-1',
      alt: 'Atmospheric candlelit dining table at The Glitch 2'
    },
    {
      id: 210,
      location: 'glitch2',
      locationLabel: 'The Glitch 2 — Norwich Market',
      locationBadge: 'Pub 2 • Norwich Market',
      locationColor: 'pink',
      title: 'Ruby Velvet Lounge & Bathtub Snug',
      subtitle: 'Deep crimson wingbacks, antique parlor table & candlelight next to clawfoot bathtub',
      category: 'ATMOSPHERE',
      image: 'assets/pub2-red-lounge.jpg',
      spanClass: 'col-span-6 row-span-1',
      alt: 'Ruby red velvet wingback lounge suite and parlor table at The Glitch 2'
    },
    {
      id: 211,
      location: 'glitch2',
      locationLabel: 'The Glitch 2 — Norwich Market',
      locationBadge: 'Pub 2 • Norwich Market',
      locationColor: 'pink',
      title: 'Velvet Music Lounge & Acoustic Corner',
      subtitle: 'Moody purple ceiling illumination, classic rock acoustics & plush tufted velvet armchairs',
      category: 'PUB',
      image: 'assets/pub2-velvet-snug.jpg',
      spanClass: 'col-span-6 row-span-1',
      alt: 'Velvet music lounge and acoustic corner at The Glitch 2 Norwich Market'
    },
    // =======================================================================
    // PUB 2 CURATED SIGNATURE FOOD DISHES (EXACTLY 6 DISTINCT HIGHLIGHTS)
    // =======================================================================
    {
      id: 212,
      location: 'glitch2',
      locationLabel: 'The Glitch 2 — Norwich Market',
      locationBadge: 'Pub 2 • Norwich Market',
      locationColor: 'pink',
      title: 'Authentic Masala Curry Feast Spread',
      subtitle: 'Chicken tadka & paneer curries, saffron rice, flaky parathas & chutney dips',
      category: 'FOOD & DRINKS',
      image: 'assets/pub2-indian-feast.jpg',
      spanClass: 'col-span-6 row-span-1',
      alt: 'Authentic Indian curry feast with chicken tadka, paneer masala, paratha bread, basmati rice and dips at Pub 2'
    },
    {
      id: 213,
      location: 'glitch2',
      locationLabel: 'The Glitch 2 — Norwich Market',
      locationBadge: 'Pub 2 • Norwich Market',
      locationColor: 'pink',
      title: 'The Glitch Prime Cheeseburger',
      subtitle: 'Juicy seared beef patty, melted cheddar, lettuce, tomato & seasoned fries',
      category: 'FOOD & DRINKS',
      image: 'assets/menu-burger.jpg',
      spanClass: 'col-span-6 row-span-1',
      alt: 'Classic beef cheeseburger on black plate at The Glitch 2'
    },
    {
      id: 214,
      location: 'glitch2',
      locationLabel: 'The Glitch 2 — Norwich Market',
      locationBadge: 'Pub 2 • Norwich Market',
      locationColor: 'pink',
      title: 'Wood-Fired Neapolitan Pepperoni Pizza',
      subtitle: 'San Marzano tomato base, melted fior di latte mozzarella & spicy pepperoni',
      category: 'FOOD & DRINKS',
      image: 'assets/menu-pizza.jpg',
      spanClass: 'col-span-6 row-span-1',
      alt: 'Freshly baked wood-fired pepperoni pizza at The Glitch 2'
    },
    {
      id: 215,
      location: 'glitch2',
      locationLabel: 'The Glitch 2 — Norwich Market',
      locationBadge: 'Pub 2 • Norwich Market',
      locationColor: 'pink',
      title: 'Crispy Glazed Chicken Wings',
      subtitle: 'Tender chicken wings tossed in rich smokey BBQ glaze with signature dipping sauce',
      category: 'FOOD & DRINKS',
      image: 'assets/food-wings-bbq.jpg',
      spanClass: 'col-span-6 row-span-1',
      alt: 'Crispy chicken wings with BBQ dip at The Glitch 2'
    },
    {
      id: 216,
      location: 'glitch2',
      locationLabel: 'The Glitch 2 — Norwich Market',
      locationBadge: 'Pub 2 • Norwich Market',
      locationColor: 'pink',
      title: 'Melted Cheese Loaded Fries',
      subtitle: 'Hot skin-on fries smothered in bubbling melted cheddar & fresh spring onions',
      category: 'FOOD & DRINKS',
      image: 'assets/menu-loaded-fries.jpg',
      spanClass: 'col-span-6 row-span-1',
      alt: 'Melted cheese loaded fries at The Glitch 2'
    },
    {
      id: 217,
      location: 'glitch2',
      locationLabel: 'The Glitch 2 — Norwich Market',
      locationBadge: 'Pub 2 • Norwich Market',
      locationColor: 'pink',
      title: 'Warm Chocolate Fudge Brownie',
      subtitle: 'Warm gooey double chocolate brownie served with vanilla bean ice cream & chocolate drizzle',
      category: 'FOOD & DRINKS',
      image: 'assets/food-chocolate-brownie.jpg',
      spanClass: 'col-span-6 row-span-1',
      alt: 'Decadent warm chocolate fudge brownie with vanilla ice cream at The Glitch 2'
    }
  ];

  // -------------------------------------------------------------------------
  // 2. STATE MANAGEMENT (DEFAULTS TO PUB 1 AUTOMATICALLY)
  // -------------------------------------------------------------------------
  let currentLocation = 'glitch1'; // Default: The Glitch 1 (Prince of Wales Rd)
  let currentCategory = 'ALL';
  let filteredItems = [];
  let activeLightboxIndex = 0;

  // DOM Elements
  const galleryGrid = document.getElementById('galleryGrid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const heroBgImg = document.getElementById('heroBgImg');
  const heroVenuePill = document.getElementById('heroVenuePill');
  const heroMainSubtitle = document.getElementById('heroMainSubtitle');
  const venueInfoBadge = document.getElementById('venueInfoBadge');

  // Showcase Cards DOM Elements
  const heroCardGlitch1 = document.getElementById('heroCardGlitch1');
  const heroCardGlitch2 = document.getElementById('heroCardGlitch2');
  const cardBtnGlitch1 = document.getElementById('cardBtnGlitch1');
  const cardBtnGlitch2 = document.getElementById('cardBtnGlitch2');

  // Location Pills
  const locBtnAll = document.getElementById('loc-btn-all');
  const locBtnGlitch1 = document.getElementById('loc-btn-glitch1');
  const locBtnGlitch2 = document.getElementById('loc-btn-glitch2');

  // Lightbox DOM Elements
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxVenue = document.getElementById('lightboxVenue');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxSubtitle = document.getElementById('lightboxSubtitle');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  // -------------------------------------------------------------------------
  // 3. RENDER GALLERY CARDS
  // -------------------------------------------------------------------------
  function renderGallery(items) {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = '';

    if (!items || items.length === 0) {
      galleryGrid.innerHTML = `
        <div class="col-span-12 py-16 text-center text-neutral-400">
          <p class="text-base font-medium">No photos found for this category in the selected pub.</p>
          <button type="button" onclick="filterCategory('ALL')" class="mt-3 px-5 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider transition">
            View All Photos
          </button>
        </div>
      `;
      return;
    }

    items.forEach((item, index) => {
      const card = document.createElement('article');
      card.className = `gallery-item filtering-in`;
      card.dataset.id = item.id;
      card.dataset.location = item.location;
      card.dataset.category = item.category;
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `View ${item.title} at ${item.locationLabel}`);

      const venueBadgeClass = item.location === 'glitch1' ? 'venue-tag-g1' : 'venue-tag-g2';

      card.innerHTML = `
        <div class="gallery-item-image-wrapper">
          <img src="${item.image}" alt="${item.alt}" class="gallery-item-img" loading="lazy" />
        </div>
        <div class="gallery-item-overlay">
          <div class="overlay-top">
            <div class="item-badges-left">
              <span class="item-venue-tag ${venueBadgeClass}">${item.locationBadge}</span>
              <span class="item-category-tag">${item.category}</span>
            </div>
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
  // 4. CATEGORY COUNTS (DYNAMICALLY ADAPTED TO CURRENT LOCATION)
  // -------------------------------------------------------------------------
  function updateFilterCounts() {
    const locationSet = currentLocation === 'all'
      ? GALLERY_DATA
      : GALLERY_DATA.filter(item => item.location === currentLocation);

    const filterBtnDrinks = document.getElementById('filterBtnDrinks');
    const filterBtnDrinksLabel = document.getElementById('filterBtnDrinksLabel');
    if (filterBtnDrinks && filterBtnDrinksLabel) {
      if (currentLocation === 'glitch1') {
        filterBtnDrinksLabel.textContent = 'Drinks';
        filterBtnDrinks.dataset.filter = 'DRINKS';
      } else if (currentLocation === 'glitch2') {
        filterBtnDrinksLabel.textContent = 'Food & Drinks';
        filterBtnDrinks.dataset.filter = 'FOOD & DRINKS';
      } else {
        filterBtnDrinksLabel.textContent = 'Food & Drinks';
        filterBtnDrinks.dataset.filter = 'FOOD_OR_DRINKS';
      }
    }

    filterButtons.forEach(btn => {
      const cat = btn.dataset.filter;
      const countEl = btn.querySelector('.filter-count');
      if (countEl) {
        if (cat === 'ALL') {
          countEl.textContent = `(${locationSet.length})`;
        } else if (cat === 'FOOD_OR_DRINKS') {
          const count = locationSet.filter(item => item.category === 'FOOD & DRINKS' || item.category === 'DRINKS').length;
          countEl.textContent = `(${count})`;
        } else {
          const count = locationSet.filter(item => item.category === cat).length;
          countEl.textContent = `(${count})`;
        }
      }
    });
  }

  // -------------------------------------------------------------------------
  // 5. MASTER LOCATION FILTER (PUB 1 vs PUB 2 vs ALL)
  // -------------------------------------------------------------------------
  function filterByLocation(loc, shouldScroll = false) {
    currentLocation = loc;

    // Reset location pills active styles
    const allPills = [locBtnAll, locBtnGlitch1, locBtnGlitch2];
    allPills.forEach(btn => {
      if (!btn) return;
      btn.classList.remove('active-glitch1', 'active-glitch2', 'active-all', 'bg-[#4deeea]', 'bg-[#ff2a85]', 'bg-[#f4ede3]', 'text-neutral-950', 'text-white', 'font-bold');
      btn.classList.add('text-neutral-300');
      btn.setAttribute('aria-selected', 'false');
      const dot = btn.querySelector('.loc-dot');
      if (dot) dot.classList.remove('bg-[#060a0f]');
    });

    // Update Featured Experience Sections
    const exp1Eyebrow = document.getElementById('exp1Eyebrow');
    const exp1Heading = document.getElementById('exp1Heading');
    const exp1Desc = document.getElementById('exp1Desc');
    const exp1Btn = document.getElementById('exp1Btn');
    const exp1BtnText = document.getElementById('exp1BtnText');
    const exp1ImgMain = document.getElementById('exp1ImgMain');
    const exp1ImgSub1 = document.getElementById('exp1ImgSub1');
    const exp1ImgSub2 = document.getElementById('exp1ImgSub2');

    const exp2Eyebrow = document.getElementById('exp2Eyebrow');
    const exp2Heading = document.getElementById('exp2Heading');
    const exp2Desc = document.getElementById('exp2Desc');
    const exp2ImgMain = document.getElementById('exp2ImgMain');
    const exp2ImgSub1 = document.getElementById('exp2ImgSub1');
    const exp2ImgSub2 = document.getElementById('exp2ImgSub2');

    // Update Pills, Hero Cards, and Hero Background based on selected location
    if (loc === 'glitch1') {
      // 1. Location Pill
      if (locBtnGlitch1) {
        locBtnGlitch1.classList.add('active-glitch1');
        locBtnGlitch1.setAttribute('aria-selected', 'true');
        const dot = locBtnGlitch1.querySelector('.loc-dot');
        if (dot) dot.classList.add('bg-[#060a0f]');
      }

      // 2. Showcase Cards: Highlight Card 1 (Glitch 1)
      if (heroCardGlitch1) {
        heroCardGlitch1.className = 'gallery-hero-card active-g1 relative group rounded-2xl overflow-hidden border-2 border-[#4deeea] shadow-[0_0_35px_rgba(77,238,234,0.35)] ring-2 ring-[#4deeea]/50 bg-[#0c1219] h-84 sm:h-96 flex flex-col justify-end p-8 sm:p-10 transition-all duration-500 cursor-pointer opacity-100';
      }
      if (cardBtnGlitch1) {
        cardBtnGlitch1.className = 'card-action-btn inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#4deeea] bg-[#4deeea] text-neutral-950 font-extrabold text-xs tracking-widest uppercase transition duration-300 hover:scale-105 shadow-lg';
        cardBtnGlitch1.innerHTML = '<span>Showing Pub 1</span> <span>&check;</span>';
      }

      if (heroCardGlitch2) {
        heroCardGlitch2.className = 'gallery-hero-card relative group rounded-2xl overflow-hidden border border-white/[0.15] bg-[#0c1219] shadow-2xl h-84 sm:h-96 flex flex-col justify-end p-8 sm:p-10 transition-all duration-500 hover:border-[#ff2a85]/60 cursor-pointer opacity-85 hover:opacity-100';
      }
      if (cardBtnGlitch2) {
        cardBtnGlitch2.className = 'card-action-btn inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/30 bg-black/60 backdrop-blur-md hover:bg-[#ff2a85] text-white font-semibold text-xs tracking-widest uppercase transition duration-300 hover:scale-105 shadow-lg';
        cardBtnGlitch2.innerHTML = '<span>View Pub 2 Photos</span> <span>&rarr;</span>';
      }

      // 3. Hero Visuals
      if (heroBgImg) heroBgImg.src = 'assets/pub1-exterior-facade.jpg';
      if (heroVenuePill) heroVenuePill.innerHTML = '<span>🍺 Pub 01 &bull; Prince of Wales Rd</span>';
      if (heroMainSubtitle) heroMainSubtitle.textContent = 'Now showcasing The Glitch 1 — Prince of Wales Rd. Cold craft draughts, live matchdays, and authentic pub energy.';
      if (venueInfoBadge) {
        venueInfoBadge.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-[#4deeea] animate-pulse"></span><span>Showing Pub 1 &bull; Prince of Wales Rd</span>';
      }
      const vBookBtn1 = document.querySelector('.venue-book-btn');
      if (vBookBtn1) {
        vBookBtn1.innerHTML = '<span>Private Hire Enquiry</span> &rarr;';
        vBookBtn1.onclick = function () { window.openPrivateHireModal(); };
      }

      // 4. Experience Section: 100% Drinks and Bar (Zero Food for Pub 1)
      if (exp1Eyebrow) exp1Eyebrow.textContent = '🍺 THE CRAFT BAR & DRINKS';
      if (exp1Heading) exp1Heading.textContent = 'WHERE DRINKS MEET ATMOSPHERE.';
      if (exp1Desc) exp1Desc.textContent = 'At The Glitch 1 (37 Prince of Wales Rd), our focus is 100% on exceptional drinks. Cold craft draughts on tap, creamy Guinness, crisp ciders, premium spirits, live sports on big screens, and vibrant weekend DJ nightlife. (Food is served exclusively at our Pub 2 St Giles location).';
      if (exp1Btn) exp1Btn.href = 'menu.html#drinksSection';
      if (exp1BtnText) exp1BtnText.textContent = 'Explore Drinks Menu';
      if (exp1ImgMain) exp1ImgMain.src = 'assets/pub1-bar.jpg';
      if (exp1ImgSub1) exp1ImgSub1.src = 'assets/pub1-drinks.jpg';
      if (exp1ImgSub2) exp1ImgSub2.src = 'assets/pub1-taps.jpg';

      if (exp2Eyebrow) exp2Eyebrow.textContent = 'THE PUB & NIGHTLIFE';
      if (exp2Heading) exp2Heading.textContent = 'WHERE THE NIGHT COMES ALIVE.';
      if (exp2Desc) exp2Desc.textContent = 'Good drinks, great company and an atmosphere designed for nights worth remembering. From craft draught taps and cold pints to weekend DJ party anthems and live sports, we set the stage for Norwich revelry.';
      if (exp2ImgMain) exp2ImgMain.src = 'assets/pub1-exterior-night.jpg';
      if (exp2ImgSub1) exp2ImgSub1.src = 'assets/event-dj-pub1.jpg';
      if (exp2ImgSub2) exp2ImgSub2.src = 'assets/pub1-guinness.jpg';

    } else if (loc === 'glitch2') {
      // 1. Location Pill
      if (locBtnGlitch2) {
        locBtnGlitch2.classList.add('active-glitch2');
        locBtnGlitch2.setAttribute('aria-selected', 'true');
        const dot = locBtnGlitch2.querySelector('.loc-dot');
        if (dot) dot.classList.add('bg-[#ffffff]');
      }

      // 2. Showcase Cards: Highlight Card 2 (Glitch 2)
      if (heroCardGlitch2) {
        heroCardGlitch2.className = 'gallery-hero-card active-g2 relative group rounded-2xl overflow-hidden border-2 border-[#ff2a85] shadow-[0_0_35px_rgba(255,42,133,0.35)] ring-2 ring-[#ff2a85]/50 bg-[#0c1219] h-84 sm:h-96 flex flex-col justify-end p-8 sm:p-10 transition-all duration-500 cursor-pointer opacity-100';
      }
      if (cardBtnGlitch2) {
        cardBtnGlitch2.className = 'card-action-btn inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#ff2a85] bg-[#ff2a85] text-white font-extrabold text-xs tracking-widest uppercase transition duration-300 hover:scale-105 shadow-lg';
        cardBtnGlitch2.innerHTML = '<span>Showing Pub 2</span> <span>&check;</span>';
      }

      if (heroCardGlitch1) {
        heroCardGlitch1.className = 'gallery-hero-card relative group rounded-2xl overflow-hidden border border-white/[0.15] bg-[#0c1219] shadow-2xl h-84 sm:h-96 flex flex-col justify-end p-8 sm:p-10 transition-all duration-500 hover:border-[#4deeea]/60 cursor-pointer opacity-85 hover:opacity-100';
      }
      if (cardBtnGlitch1) {
        cardBtnGlitch1.className = 'card-action-btn inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/30 bg-black/60 backdrop-blur-md hover:bg-[#4deeea] hover:text-black text-white font-semibold text-xs tracking-widest uppercase transition duration-300 hover:scale-105 shadow-lg';
        cardBtnGlitch1.innerHTML = '<span>View Pub 1 Photos</span> <span>&rarr;</span>';
      }

      // 3. Hero Visuals
      if (heroBgImg) heroBgImg.src = 'assets/pub2-exterior-twilight.jpg';
      if (heroVenuePill) heroVenuePill.innerHTML = '<span>🍸 Pub 02 &bull; Norwich Market</span>';
      if (heroMainSubtitle) heroMainSubtitle.textContent = 'Now showcasing The Glitch 2 — Norwich Market (25b St Giles St). Curved gold bar, bathtub snugs, chess nook & artisan cocktails.';
      if (venueInfoBadge) {
        venueInfoBadge.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-[#ff2a85] animate-pulse"></span><span>Showing Pub 2 &bull; Norwich Market</span>';
      }
      const vBookBtn2 = document.querySelector('.venue-book-btn');
      if (vBookBtn2) {
        vBookBtn2.innerHTML = '<span>Book a Table (Pub 2)</span> &rarr;';
        vBookBtn2.onclick = function () { window.openBookingModal('Norwich Market'); };
      }

      // 4. Experience Section: Pub 2 Dining & Speakeasy
      if (exp1Eyebrow) exp1Eyebrow.textContent = '🍸 THE RESTAURANT & DINING (PUB 02)';
      if (exp1Heading) exp1Heading.textContent = 'WHERE FOOD MEETS ATMOSPHERE.';
      if (exp1Desc) exp1Desc.textContent = 'At The Glitch 2 (25b St Giles St), experience artisan dining paired with handcrafted cocktails. Seasonal gourmet pizzas, smash burgers, authentic sharing platters, and our bohemian lounge with bathtub snugs.';
      if (exp1Btn) exp1Btn.href = 'menu.html';
      if (exp1BtnText) exp1BtnText.textContent = 'Explore Food Menu';
      if (exp1ImgMain) exp1ImgMain.src = 'assets/food-grand-feast.jpg';
      if (exp1ImgSub1) exp1ImgSub1.src = 'assets/menu-burger.jpg';
      if (exp1ImgSub2) exp1ImgSub2.src = 'assets/pub2-golden-bar.jpg';

      if (exp2Eyebrow) exp2Eyebrow.textContent = 'THE BOHEMIAN SPEAKEASY (PUB 02)';
      if (exp2Heading) exp2Heading.textContent = 'COCKTAILS, BATHTUB SNUGS & ACOUSTICS.';
      if (exp2Desc) exp2Desc.textContent = 'Hand-hammered gold bar, clawfoot bathtub snugs, cozy chess corners, and live acoustic piano sets overlooking historic St Giles St.';
      if (exp2ImgMain) exp2ImgMain.src = 'assets/pub2-golden-bar.jpg';
      if (exp2ImgSub1) exp2ImgSub1.src = 'assets/pub2-bathtub-snug.jpg';
      if (exp2ImgSub2) exp2ImgSub2.src = 'assets/pub2-piano.jpg';

    } else {
      // 'all'
      if (locBtnAll) {
        locBtnAll.classList.add('active-all');
        locBtnAll.setAttribute('aria-selected', 'true');
        const dot = locBtnAll.querySelector('.loc-dot');
        if (dot) dot.classList.add('bg-[#060a0f]');
      }
      const vBookBtnAll = document.querySelector('.venue-book-btn');
      if (vBookBtnAll) {
        vBookBtnAll.innerHTML = '<span>Book a Table (Pub 2)</span> &rarr;';
        vBookBtnAll.onclick = function () { window.openBookingModal('Norwich Market'); };
      }

      if (heroCardGlitch1) {
        heroCardGlitch1.className = 'gallery-hero-card relative group rounded-2xl overflow-hidden border border-white/[0.2] bg-[#0c1219] shadow-2xl h-84 sm:h-96 flex flex-col justify-end p-8 sm:p-10 transition-all duration-500 hover:border-[#4deeea]/60 cursor-pointer opacity-95 hover:opacity-100';
      }
      if (cardBtnGlitch1) {
        cardBtnGlitch1.className = 'card-action-btn inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#4deeea]/50 bg-black/60 backdrop-blur-md hover:bg-[#4deeea] hover:text-black text-white font-semibold text-xs tracking-widest uppercase transition duration-300 hover:scale-105 shadow-lg';
        cardBtnGlitch1.innerHTML = '<span>Filter Pub 1 Only</span> <span>&rarr;</span>';
      }

      if (heroCardGlitch2) {
        heroCardGlitch2.className = 'gallery-hero-card relative group rounded-2xl overflow-hidden border border-white/[0.2] bg-[#0c1219] shadow-2xl h-84 sm:h-96 flex flex-col justify-end p-8 sm:p-10 transition-all duration-500 hover:border-[#ff2a85]/60 cursor-pointer opacity-95 hover:opacity-100';
      }
      if (cardBtnGlitch2) {
        cardBtnGlitch2.className = 'card-action-btn inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#ff2a85]/50 bg-black/60 backdrop-blur-md hover:bg-[#ff2a85] text-white font-semibold text-xs tracking-widest uppercase transition duration-300 hover:scale-105 shadow-lg';
        cardBtnGlitch2.innerHTML = '<span>Filter Pub 2 Only</span> <span>&rarr;</span>';
      }

      if (heroVenuePill) heroVenuePill.innerHTML = '<span>✨ The Glitch &bull; All Locations</span>';
      if (heroMainSubtitle) heroMainSubtitle.textContent = 'Discover photos from both of our unique Norwich venues.';
      if (venueInfoBadge) {
        venueInfoBadge.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span><span>Showing All Locations &bull; Both Pubs</span>';
      }

      // Experience Section: Both Pubs Highlighted
      if (exp1Eyebrow) exp1Eyebrow.textContent = 'TWO UNIQUE NORWICH VENUES';
      if (exp1Heading) exp1Heading.textContent = 'DRINKS AT PUB 1 • FOOD & DRINKS AT PUB 2.';
      if (exp1Desc) exp1Desc.textContent = 'Visit Pub 1 on Prince of Wales Rd for pure pub vibes, cold craft draughts, live sports, and weekend DJ sets (Drinks only). Visit Pub 2 on St Giles St for our full kitchen menu, artisan burgers, stone-baked pizzas, bathtub snugs, and cocktails.';
      if (exp1Btn) exp1Btn.href = 'menu.html';
      if (exp1BtnText) exp1BtnText.textContent = 'Explore Full Menu';
      if (exp1ImgMain) exp1ImgMain.src = 'assets/pub1-bar.jpg';
      if (exp1ImgSub1) exp1ImgSub1.src = 'assets/menu-burger.jpg';
      if (exp1ImgSub2) exp1ImgSub2.src = 'assets/pub2-golden-bar.jpg';

      if (exp2Eyebrow) exp2Eyebrow.textContent = 'NORWICH REVELRY';
      if (exp2Heading) exp2Heading.textContent = 'WHERE THE NIGHT COMES ALIVE.';
      if (exp2Desc) exp2Desc.textContent = 'Good drinks, great company and an atmosphere designed for nights worth remembering across both of our unique city centre locations.';
      if (exp2ImgMain) exp2ImgMain.src = 'assets/pub1-exterior-night.jpg';
      if (exp2ImgSub1) exp2ImgSub1.src = 'assets/event-dj-pub1.jpg';
      if (exp2ImgSub2) exp2ImgSub2.src = 'assets/pub2-exterior-twilight.jpg';
    }

    // Apply combined Location + Category Filters
    applyActiveFilters();

    // Scroll to filters if requested
    if (shouldScroll) {
      const filtersEl = document.getElementById('galleryFilters');
      if (filtersEl) {
        filtersEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  // -------------------------------------------------------------------------
  // 6. CATEGORY FILTER LOGIC
  // -------------------------------------------------------------------------
  function applyActiveFilters() {
    // 1. Filter by location
    let locationFiltered = currentLocation === 'all'
      ? [...GALLERY_DATA]
      : GALLERY_DATA.filter(item => item.location === currentLocation);

    // 2. Filter by category
    if (currentCategory === 'ALL') {
      filteredItems = locationFiltered;
    } else if (currentCategory === 'FOOD_OR_DRINKS') {
      filteredItems = locationFiltered.filter(item => item.category === 'FOOD & DRINKS' || item.category === 'DRINKS');
    } else {
      filteredItems = locationFiltered.filter(item => item.category === currentCategory);
      // If current category has no matches in this location, reset category to ALL
      if (filteredItems.length === 0 && locationFiltered.length > 0) {
        currentCategory = 'ALL';
        filteredItems = locationFiltered;
        filterButtons.forEach(b => {
          b.classList.remove('active');
          if (b.dataset.filter === 'ALL') b.classList.add('active');
        });
      }
    }

    // Update Category Counts for this location
    updateFilterCounts();

    // Transition grid cards smoothly
    const existingCards = galleryGrid ? galleryGrid.querySelectorAll('.gallery-item') : [];
    existingCards.forEach(c => c.classList.add('filtering-out'));

    setTimeout(() => {
      renderGallery(filteredItems);
    }, 180);
  }

  function handleFilterClick(e) {
    const btn = e.currentTarget;
    const filterValue = btn.dataset.filter;

    if (filterValue === currentCategory) return;

    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    currentCategory = filterValue;
    applyActiveFilters();
  }

  // Helper for programmatically switching category
  window.filterCategory = function (cat) {
    currentCategory = cat;
    filterButtons.forEach(b => {
      b.classList.remove('active');
      if (b.dataset.filter === cat) b.classList.add('active');
    });
    applyActiveFilters();
  };

  // -------------------------------------------------------------------------
  // 7. LIGHTBOX CONTROLLER
  // -------------------------------------------------------------------------
  function openLightbox(index) {
    if (!filteredItems[index]) return;
    activeLightboxIndex = index;
    updateLightboxContent();

    lightbox.classList.add('active');
    document.body.classList.add('modal-open');

    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.classList.remove('modal-open');
  }

  function updateLightboxContent() {
    const item = filteredItems[activeLightboxIndex];
    if (!item) return;

    if (lightboxImg) lightboxImg.classList.remove('loaded');

    // Update Venue Badge
    if (lightboxVenue) {
      lightboxVenue.textContent = item.locationBadge;
      lightboxVenue.className = `lightbox-venue-badge ${item.location === 'glitch2' ? 'venue-g2' : ''}`;
    }

    // Update Category
    if (lightboxCategory) lightboxCategory.textContent = item.category;

    // Update Counter
    const currentNum = String(activeLightboxIndex + 1).padStart(2, '0');
    const totalNum = String(filteredItems.length).padStart(2, '0');
    if (lightboxCounter) lightboxCounter.textContent = `${currentNum} / ${totalNum}`;

    // Update Titles
    if (lightboxTitle) lightboxTitle.textContent = item.title;
    if (lightboxSubtitle) lightboxSubtitle.textContent = item.subtitle;

    // Load Image
    const tempImg = new Image();
    tempImg.src = item.image;
    tempImg.onload = () => {
      if (lightboxImg) {
        lightboxImg.src = item.image;
        lightboxImg.alt = item.alt;
        lightboxImg.classList.add('loaded');
      }
    };
  }

  function showNextImage() {
    if (filteredItems.length === 0) return;
    activeLightboxIndex = (activeLightboxIndex + 1) % filteredItems.length;
    updateLightboxContent();
  }

  function showPrevImage() {
    if (filteredItems.length === 0) return;
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
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-body')) {
        closeLightbox();
      }
    });
  }

  // Touch Swipe for Mobile
  let touchStartX = 0;
  let touchEndX = 0;

  if (lightbox) {
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

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
  // 8. SCROLL DYNAMICS & PARALLAX
  // -------------------------------------------------------------------------
  function handleScroll() {
    const scrollY = window.scrollY;
    if (heroBgImg && scrollY < window.innerHeight) {
      heroBgImg.style.transform = `scale(1.05) translateY(${scrollY * 0.22}px)`;
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // -------------------------------------------------------------------------
  // 9. EXPOSE GLOBAL API & INITIALIZATION
  // -------------------------------------------------------------------------
  // Expose filterByLocation to window for inline onclick handlers on showcase cards & pills
  window.filterByLocation = function (loc) {
    filterByLocation(loc, false);
  };

  document.addEventListener('DOMContentLoaded', () => {
    // 1. Check URL Hash (e.g. #pub2, #glitch2, #all)
    const hash = window.location.hash.toLowerCase();
    let initialLocation = 'glitch1'; // DEFAULT AUTOMATICALLY TO PUB 1!

    if (hash === '#pub2' || hash === '#glitch2') {
      initialLocation = 'glitch2';
    } else if (hash === '#all') {
      initialLocation = 'all';
    }

    // 2. Initialize with Pub 1 (or URL hash)
    filterByLocation(initialLocation, false);

    // 3. Bind Category Filter Buttons
    filterButtons.forEach(btn => {
      btn.addEventListener('click', handleFilterClick);
    });

    // 4. Lightbox Controls
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);
    if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);
  });

})();
