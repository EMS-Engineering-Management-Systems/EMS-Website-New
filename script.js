// ============================================
// INTERACTIVE FEATURES & ANIMATIONS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeScrollAnimations();
    initializeInteractiveElements();
    initializeFormValidation();
    initializeParallaxEffect();
    initializeProductsSection();
    initCardFlip();
    initPanelAnatomy();
    initPreloader();
    initStickyCTA();
    initBackToTop();
    initFAQ();
    initDarkMode();
    initContactForm();
    initFooterYear();
    initClickSpark();
    initMissionVisionModals();
    initCaseStudyVideos();
});

function initCaseStudyVideos() {
    document.querySelectorAll('.case-video-card[data-youtube-id]').forEach((card) => {
        const id = card.getAttribute('data-youtube-id');
        const embedHost = card.querySelector('.case-video-embed');
        if (!id || !embedHost) return;

        let iframe = null;

        const startPreview = () => {
            if (iframe) return;
            iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&playsinline=1&rel=0&modestbranding=1`;
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.title = card.querySelector('h3')?.textContent?.trim() || 'Project video';
            embedHost.appendChild(iframe);
            card.classList.add('is-playing');
        };

        const stopPreview = () => {
            if (iframe) {
                iframe.remove();
                iframe = null;
            }
            card.classList.remove('is-playing');
        };

        card.addEventListener('mouseenter', startPreview);
        card.addEventListener('mouseleave', stopPreview);
        card.addEventListener('focusin', startPreview);
        card.addEventListener('focusout', (e) => {
            if (!card.contains(e.relatedTarget)) stopPreview();
        });
    });
}

const MV_MODAL_CONTENT = {
    mission: {
        title: 'Our Mission',
        img: 'datacenter5.png',
        text: 'Deliver economical, fast, high-quality solutions while analyzing customer needs and ensuring satisfaction. Provide end-to-end MEP systems following latest global technologies.',
    },
    vision: {
        title: 'Our Vision',
        img: 'datacenter2.png',
        text: 'To be a unique and independent MEP provider offering modern, highly professional services covering full MEP requirements while specializing in the latest technologies.',
    },
};

function initMissionVisionModals() {
    const overlay = document.getElementById('mv-modal-overlay');
    if (!overlay) return;

    const imgEl = document.getElementById('mv-modal-img');
    const titleEl = document.getElementById('mv-modal-title');
    const bodyEl = document.getElementById('mv-modal-body');
    const closeBtn = overlay.querySelector('.mv-modal-close');

    const openModal = (key) => {
        const data = MV_MODAL_CONTENT[key];
        if (!data || !imgEl || !titleEl || !bodyEl) return;
        imgEl.src = data.img;
        imgEl.alt = data.title;
        titleEl.textContent = data.title;
        bodyEl.textContent = data.text;
        overlay.classList.add('visible');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        closeBtn?.focus();
    };

    const closeModal = () => {
        overlay.classList.remove('visible');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    document.querySelectorAll('.mv-card[data-mv-open]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-mv-open');
            if (key === 'mission' || key === 'vision') openModal(key);
        });
    });

    closeBtn?.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('visible')) closeModal();
    });
}

function initClickSpark() {
    if (document.getElementById('click-spark-canvas-vanilla')) return;
    const canvas = document.createElement('canvas');
    canvas.id = 'click-spark-canvas-vanilla';
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText =
        'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9998;display:block;';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const sparks = [];
    const sparkColor = '#00d4ff';
    const sparkSize = 10;
    const sparkRadius = 15;
    const sparkCount = 8;
    const duration = 400;
    const easeOut = (t) => t * (2 - t);

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let rafId;
    const draw = (timestamp) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = sparks.length - 1; i >= 0; i--) {
            const spark = sparks[i];
            const elapsed = timestamp - spark.startTime;
            if (elapsed >= duration) {
                sparks.splice(i, 1);
                continue;
            }
            const progress = elapsed / duration;
            const eased = easeOut(progress);
            const distance = eased * sparkRadius;
            const lineLength = sparkSize * (1 - eased);
            for (let j = 0; j < spark.angles.length; j++) {
                const ang = spark.angles[j];
                const x1 = spark.x + distance * Math.cos(ang);
                const y1 = spark.y + distance * Math.sin(ang);
                const x2 = spark.x + (distance + lineLength) * Math.cos(ang);
                const y2 = spark.y + (distance + lineLength) * Math.sin(ang);
                ctx.strokeStyle = sparkColor;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }
        }
        rafId = requestAnimationFrame(draw);
    };
    rafId = requestAnimationFrame(draw);

    const onClick = (e) => {
        if (e.button !== 0) return;
        const angles = Array.from({ length: sparkCount }, (_, i) => (2 * Math.PI * i) / sparkCount);
        sparks.push({
            x: e.clientX,
            y: e.clientY,
            angles,
            startTime: performance.now(),
        });
    };
    document.addEventListener('click', onClick, true);
}

// ============================================
// NAVIGATION
// ============================================

function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            hamburger.style.transform = navLinks.style.display === 'flex' ? 'rotate(90deg)' : 'rotate(0)';
        });
    }

    // Close mobile menu on link click (desktop nav stays visible)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                if (navLinks) navLinks.style.display = 'none';
                if (hamburger) hamburger.style.transform = 'rotate(0)';
            }
        });
    });

    // Hide nav menu on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks) {
            navLinks.style.display = 'flex';
        }
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = getAnimationForElement(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('.service-card, .case-card, .benefit-card, .sector-tile, .partner-logo').forEach(el => {
        observer.observe(el);
    });
}

function getAnimationForElement(element) {
    if (element.classList.contains('service-card')) {
        return 'slideInUp 0.8s ease-out forwards';
    }
    if (element.classList.contains('case-card')) {
        return 'slideInUp 0.8s ease-out forwards';
    }
    if (element.classList.contains('benefit-card')) {
        return 'slideInUp 0.8s ease-out forwards';
    }
    return 'fadeIn 0.6s ease-out forwards';
}

// ============================================
// PARALLAX EFFECT
// ============================================

function initializeParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }

        // Dynamic background glow effect
        updateBackgroundGlow();
    });
}

function updateBackgroundGlow() {
    const scrolled = window.pageYOffset;
    const glowOrbs = document.querySelectorAll('.glow-orb');
    
    glowOrbs.forEach((orb, index) => {
        const parallaxValue = scrolled * (0.3 + index * 0.1);
        orb.style.transform = `translateY(${parallaxValue}px)`;
    });
}

// ============================================
// INTERACTIVE ELEMENTS
// ============================================

function initializeInteractiveElements() {
    // Feature items hover effect
    document.querySelectorAll('.feature-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transition = 'all 0.3s ease-out';
            item.style.transform = 'translateX(10px)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
        });
    });

    // Timeline items interaction
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.addEventListener('click', () => {
            const year = item.getAttribute('data-year');
            addTimelineAnimation(item);
        });
    });

    // Case cards click animation
    document.querySelectorAll('.case-card').forEach(card => {
        card.addEventListener('click', () => {
            card.style.animation = 'pulse 0.6s ease-out';
            setTimeout(() => {
                card.style.animation = '';
            }, 600);
        });
    });
}

function addTimelineAnimation(item) {
    item.style.animation = 'slideInUp 0.6s ease-out';
    setTimeout(() => {
        item.style.animation = '';
    }, 600);
}

// ============================================
// FORM VALIDATION
// ============================================

function initializeFormValidation() {
    const form = document.querySelector('.contact-form form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            validateAndSubmitForm(form);
        });
    }
}

function validateAndSubmitForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            highlightInvalidInput(input);
            isValid = false;
        } else {
            input.style.borderColor = 'rgba(0, 212, 255, 0.5)';
        }
    });

    if (isValid) {
        // Show success animation
        showFormSuccess(form);
        setTimeout(() => {
            form.reset();
        }, 1500);
    }
}

function highlightInvalidInput(input) {
    input.style.borderColor = '#ff006e';
    input.style.boxShadow = '0 0 15px rgba(255, 0, 110, 0.3)';
    
    setTimeout(() => {
        input.style.borderColor = 'rgba(0, 212, 255, 0.2)';
        input.style.boxShadow = 'none';
    }, 1500);
}

function showFormSuccess(form) {
    const button = form.querySelector('button');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    button.style.background = 'linear-gradient(135deg, #00d4ff, #00ff88)';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
    }, 2000);
}

// ============================================
// SCROLL INDICATOR
// ============================================

function addScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 20px;
        height: 20px;
        border: 2px solid var(--accent-cyan);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999;
    `;
    indicator.innerHTML = '<i class="fas fa-chevron-down" style="color: var(--accent-cyan); animation: bounce 2s infinite;"></i>';
    
    document.body.appendChild(indicator);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            indicator.style.display = 'none';
        } else {
            indicator.style.display = 'flex';
        }
    });
}

// ============================================
// SMOOTH SCROLL WITH OFFSET
// ============================================

function smoothScrollToElement(target) {
    const offset = 80; // navbar height
    const element = document.querySelector(target);
    
    if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
        });
    }
}

// ============================================
// DYNAMIC BACKGROUND EFFECT
// ============================================

function createDynamicBackground() {
    const particles = document.querySelectorAll('.circuit-dot');
    
    particles.forEach((particle, index) => {
        const randomDelay = Math.random() * 5;
        particle.style.animationDelay = randomDelay + 's';
    });
}

// ============================================
// TEXT GLITCH EFFECT
// ============================================

function initializeGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        const text = element.textContent;
        
        // Create glitch layers
        const layer1 = document.createElement('span');
        layer1.textContent = text;
        layer1.className = 'glitch-layer-1';
        
        const layer2 = document.createElement('span');
        layer2.textContent = text;
        layer2.className = 'glitch-layer-2';
        
        element.appendChild(layer1);
        element.appendChild(layer2);
        
        element.addEventListener('mouseenter', () => {
            element.classList.add('glitch-active');
        });
    });
}

// ============================================
// NUMBER COUNTER ANIMATION
// ============================================

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const duration = 2000;
        const increment = target / (duration / 10);
        
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + (counter.textContent.includes('+') ? '+' : '');
            }
        }, 10);
    });
}

// ============================================
// INITIALIZE ON LOAD
// ============================================

window.addEventListener('load', () => {
    addScrollIndicator();
    createDynamicBackground();
    initializeGlitchEffect();
    animateCounters();
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Add CSS for glitch effect dynamically
const style = document.createElement('style');
style.textContent = `
    .glitch-layer-1,
    .glitch-layer-2 {
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        animation: none;
    }
    
    .glitch-active .glitch-layer-1 {
        animation: glitch1 0.4s ease-out;
    }
    
    .glitch-active .glitch-layer-2 {
        animation: glitch2 0.4s ease-out;
    }
    
    @keyframes glitch1 {
        0% { transform: translate(0); opacity: 1; }
        20% { transform: translate(-2px, 2px); opacity: 1; }
        40% { transform: translate(-2px, -2px); opacity: 1; }
        60% { transform: translate(2px, 2px); opacity: 1; }
        80% { transform: translate(2px, -2px); opacity: 1; }
        100% { transform: translate(0); opacity: 0; }
    }
    
    @keyframes glitch2 {
        0% { transform: translate(0); opacity: 1; }
        20% { transform: translate(2px, -2px); opacity: 1; }
        40% { transform: translate(2px, 2px); opacity: 1; }
        60% { transform: translate(-2px, -2px); opacity: 1; }
        80% { transform: translate(-2px, 2px); opacity: 1; }
        100% { transform: translate(0); opacity: 0; }
    }
    
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll performance
let scrollTimeout;
window.addEventListener('scroll', debounce(() => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        updateBackgroundGlow();
    }, 100);
}, 100), { passive: true });

// ============================================
// ACCESSIBILITY
// ============================================

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) navLinks.style.display = 'none';
        closeQuoteCart();
        closeQuickView();
    }
});

// ============================================
// LAZY LOADING
// ============================================

// ============================================
// PRODUCTS SECTION — ELECTRICAL PANELS
// ============================================

// Product data for quick view modal
const productData = {
    1:  { name:'Acti9 Disbo MDB — 18 Way', brand:'Schneider Electric', icon:'fa-bolt',       price:'EGP 4,857',    desc:'Flush-mounted main distribution board with 125A isolator, 18 outgoing ways, IP30 rated metal enclosure for residential and commercial applications.', specs:[{l:'Current',v:'125A'},{l:'Voltage',v:'400V AC'},{l:'Protection',v:'IP30'},{l:'Ways',v:'18'},{l:'Standard',v:'IEC 60439-3'},{l:'Enclosure',v:'Metal'}] },
    2:  { name:'Acti9 Disbo MDB — 36 Way', brand:'Schneider Electric', icon:'fa-server',     price:'EGP 7,863',    desc:'Main distribution board with 36 outgoing ways, 125A general busbar, metal enclosure ideal for commercial buildings and offices.', specs:[{l:'Current',v:'125A'},{l:'Voltage',v:'400V AC'},{l:'Protection',v:'IP30'},{l:'Ways',v:'36'},{l:'Standard',v:'IEC 60439-3'},{l:'Enclosure',v:'Metal'}] },
    3:  { name:'Acti9 Disbo MDB — 48 Way', brand:'Schneider Electric', icon:'fa-database',   price:'EGP 10,110',   desc:'Industrial main distribution board with 48 outgoing ways, 125A general busbar, suitable for large industrial and commercial facilities.', specs:[{l:'Current',v:'125A'},{l:'Voltage',v:'400V AC'},{l:'Protection',v:'IP30'},{l:'Ways',v:'48'},{l:'Standard',v:'IEC 60439-3'},{l:'Enclosure',v:'Metal'}] },
    4:  { name:'Acti9 Disbo SDB — 18 Way + 19 Resi9', brand:'Schneider Electric', icon:'fa-th-large', price:'EGP 6,049', desc:'Complete sub-distribution board package: 18-way flush panel pre-installed with 19 Resi9 single-pole MCBs. Ready-to-install for apartments and villas.', specs:[{l:'Current',v:'63A'},{l:'Voltage',v:'230V AC'},{l:'MCBs',v:'19x Resi9'},{l:'Ways',v:'18'},{l:'Breaking',v:'4.5kA'},{l:'Type',v:'Package'}] },
    5:  { name:'Disbo 24-Way 3Ph SDB Package', brand:'Schneider Electric', icon:'fa-layer-group', price:'EGP 10,999', desc:'24-way sub-distribution board with 3-phase 6kA MCBs and 3-phase main isolator. Complete ready-to-install commercial package.', specs:[{l:'Current',v:'125A'},{l:'Voltage',v:'400V AC'},{l:'Phase',v:'3-Phase'},{l:'Ways',v:'24'},{l:'Breaking',v:'6kA'},{l:'Standard',v:'IEC 61439-3'}] },
    6:  { name:'SIVACON S4 Motor Control Center', brand:'Siemens', icon:'fa-cogs',         price:'EGP 45,000',  desc:'Modular motor control center with TN-S earthing, withdrawable starters, digital communication capabilities, up to 630A busbar.', specs:[{l:'Current',v:'630A'},{l:'Voltage',v:'400V AC'},{l:'Protection',v:'IP41'},{l:'Form',v:'Form 4'},{l:'Standard',v:'IEC 61439-2'},{l:'Type',v:'MCC'}] },
    7:  { name:'MNS 3.0 Motor Control Center', brand:'ABB', icon:'fa-industry',        price:'EGP 52,000',  desc:'Third-generation MNS MCC with Arc Guard system, integrated safety, withdrawable modules, IEC 61439-2 certified, Form 4 separation.', specs:[{l:'Current',v:'630A'},{l:'Voltage',v:'400V AC'},{l:'Separation',v:'Form 4'},{l:'Safety',v:'Arc Guard'},{l:'Standard',v:'IEC 61439-2'},{l:'Modules',v:'Withdrawable'}] },
    8:  { name:'SIVACON 8PT LV Power Distribution', brand:'Siemens', icon:'fa-network-wired', price:'EGP 85,000', desc:'Modular LV switchgear panel system up to 6300A, IEC 61439-1/2 certified, Form 4b separation, suitable for large industrial plants and data centers.', specs:[{l:'Current',v:'6300A'},{l:'Voltage',v:'400V AC'},{l:'Separation',v:'Form 4b'},{l:'Protection',v:'IP54'},{l:'Standard',v:'IEC 61439-2'},{l:'Type',v:'LV Switchgear'}] },
    9:  { name:'MNS iS Intelligent Switchgear Panel', brand:'ABB', icon:'fa-microchip',    price:'EGP 92,000',  desc:'Smart LV switchgear with IEC 61850 communication, real-time energy monitoring, remote diagnostics, arc flash protection and IoT-ready design.', specs:[{l:'Current',v:'4000A'},{l:'Voltage',v:'400V AC'},{l:'Protocol',v:'IEC 61850'},{l:'Protection',v:'Arc Flash'},{l:'Features',v:'IoT Ready'},{l:'Type',v:'Smart Switchgear'}] },
    10: { name:'Disbo 36-Way 3Ph SDB Package', brand:'Schneider Electric', icon:'fa-cubes', price:'EGP 14,999', desc:'36-way sub-distribution board package with 3-phase MCBs and 3-phase isolator. Ideal for hotels, hospitals and large office buildings.', specs:[{l:'Current',v:'125A'},{l:'Voltage',v:'400V AC'},{l:'Phase',v:'3-Phase'},{l:'Ways',v:'36'},{l:'Breaking',v:'6kA'},{l:'Standard',v:'IEC 61439-3'}] },
    11: { name:'SIRIUS Soft Starter Control Panel', brand:'Siemens', icon:'fa-sliders-h',  price:'EGP 38,000',  desc:'Pre-engineered soft starter panel for pump and fan motor control with SIRIUS 3RW50 starters, integrated protections and IO-Link diagnostics.', specs:[{l:'Current',v:'500A'},{l:'Voltage',v:'400V AC'},{l:'Starters',v:'SIRIUS 3RW50'},{l:'Control',v:'Soft Start'},{l:'Interface',v:'IO-Link'},{l:'Application',v:'Pump/Fan'}] },
    12: { name:'Easy9 Consumer Unit — 36 Way', brand:'Schneider Electric', icon:'fa-home', price:'EGP 2,610',   desc:'Residential consumer unit with 36 ways, 125A main isolator, DIN rail mounted MCBs. Suitable for villas, large apartments and small commercial.', specs:[{l:'Current',v:'125A'},{l:'Voltage',v:'230V AC'},{l:'Ways',v:'36'},{l:'Protection',v:'IP30'},{l:'Mount',v:'DIN Rail'},{l:'Application',v:'Residential'}] },
    13: { name:'Mistral65 IP65 Enclosure Panel', brand:'ABB', icon:'fa-box',           price:'EGP 18,500',  desc:'Outdoor IP65 waterproof enclosure panel, 250A distribution. Suitable for rooftop installations, pump rooms and outdoor electrical distribution points.', specs:[{l:'Current',v:'250A'},{l:'Voltage',v:'400V AC'},{l:'Protection',v:'IP65'},{l:'Environment',v:'Outdoor'},{l:'Material',v:'GRP/Steel'},{l:'Standard',v:'IEC 62208'}] },
    14: { name:'8GK ALPHA Distribution Board', brand:'Siemens', icon:'fa-broadcast-tower', price:'EGP 22,000', desc:'ALPHA distribution board with 3-phase busbar, 250A main switch, 48 module capacity, IEC 60439-3 certified for industrial and commercial use.', specs:[{l:'Current',v:'250A'},{l:'Voltage',v:'400V AC'},{l:'Phase',v:'3-Phase'},{l:'Modules',v:'48'},{l:'Standard',v:'IEC 60439-3'},{l:'Enclosure',v:'Metal'}] },
    15: { name:'MISTRAL41F Flush Consumer Unit', brand:'ABB', icon:'fa-plug',          price:'EGP 3,800',   desc:'Flush-mount consumer unit with transparent door, DIN rail, 24 module capacity, 63A incomer. Clean design for residential and light commercial.', specs:[{l:'Current',v:'63A'},{l:'Voltage',v:'230V AC'},{l:'Modules',v:'24'},{l:'Mount',v:'Flush'},{l:'Door',v:'Transparent'},{l:'Application',v:'Residential'}] },
    16: { name:'SIVACON 8BT Medium Voltage Panel', brand:'Siemens', icon:'fa-charging-station', price:'EGP 120,000', desc:'Air-insulated medium voltage switchgear for 11kV systems, vacuum circuit breaker, SCADA-ready, IEC 62271 certified. For utility substations.', specs:[{l:'Voltage',v:'11kV'},{l:'Breaker',v:'Vacuum (VCB)'},{l:'Standard',v:'IEC 62271'},{l:'SCADA',v:'Ready'},{l:'Application',v:'Utility'},{l:'Insulation',v:'Air'}] },
};

let quoteItems = [];

function initializeProductsSection() {
    setupProductFilters();
    setupProductSearch();
    setupProductSort();
    setupViewToggle();
    setupQuoteCart();
    setupQuickView();
    updateVisibleCount();
}

// --- Filter Logic ---
function setupProductFilters() {
    const checkboxes = document.querySelectorAll('.products-sidebar input[type="checkbox"]');
    checkboxes.forEach(cb => cb.addEventListener('change', applyProductFilters));

    const clearBtn = document.getElementById('clearFilters');
    if (clearBtn) clearBtn.addEventListener('click', () => {
        checkboxes.forEach(cb => cb.checked = false);
        applyProductFilters();
    });
    const resetBtn = document.getElementById('resetSearch');
    if (resetBtn) resetBtn.addEventListener('click', () => {
        checkboxes.forEach(cb => cb.checked = false);
        const searchInput = document.getElementById('productSearch');
        if (searchInput) searchInput.value = '';
        applyProductFilters();
    });
}

function getActiveFilters() {
    const filters = { category: [], brand: [], rating: [], voltage: [], application: [] };
    document.querySelectorAll('.products-sidebar input[type="checkbox"]:checked').forEach(cb => {
        if (filters[cb.name]) filters[cb.name].push(cb.value);
    });
    return filters;
}

function applyProductFilters() {
    const filters = getActiveFilters();
    const searchTerm = (document.getElementById('productSearch')?.value || '').toLowerCase().trim();
    const cards = document.querySelectorAll('.product-card');

    cards.forEach(card => {
        const matchCategory   = !filters.category.length    || filters.category.some(v => card.dataset.category?.includes(v));
        const matchBrand      = !filters.brand.length       || filters.brand.some(v => card.dataset.brand?.includes(v));
        const matchRating     = !filters.rating.length      || filters.rating.some(v => card.dataset.rating?.includes(v));
        const matchVoltage    = !filters.voltage.length     || filters.voltage.some(v => card.dataset.voltage?.includes(v));
        const matchApplication= !filters.application.length || filters.application.some(v => card.dataset.application?.includes(v));
        const matchSearch     = !searchTerm || card.dataset.name?.toLowerCase().includes(searchTerm) || card.querySelector('.product-desc')?.textContent.toLowerCase().includes(searchTerm) || card.dataset.brand?.toLowerCase().includes(searchTerm);

        const visible = matchCategory && matchBrand && matchRating && matchVoltage && matchApplication && matchSearch;
        card.classList.toggle('hidden', !visible);
    });

    updateVisibleCount();
    toggleNoResults();
}

function updateVisibleCount() {
    const visible = document.querySelectorAll('.product-card:not(.hidden)').length;
    const el = document.getElementById('visibleCount');
    if (el) el.textContent = visible;
}

function toggleNoResults() {
    const visible = document.querySelectorAll('.product-card:not(.hidden)').length;
    const noResults = document.getElementById('noResults');
    const pagination = document.getElementById('pagination');
    if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
    if (pagination) pagination.style.display = visible === 0 ? 'none' : 'flex';
}

// --- Search ---
function setupProductSearch() {
    const input = document.getElementById('productSearch');
    if (!input) return;
    let searchTimeout;
    input.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(applyProductFilters, 200);
    });
}

// --- Sort ---
function setupProductSort() {
    const select = document.getElementById('sortSelect');
    if (!select) return;
    select.addEventListener('change', () => {
        const grid = document.getElementById('productsGrid');
        if (!grid) return;
        const cards = Array.from(grid.querySelectorAll('.product-card'));
        const val = select.value;

        cards.sort((a, b) => {
            if (val === 'name-asc')   return (a.dataset.name||'').localeCompare(b.dataset.name||'');
            if (val === 'name-desc')  return (b.dataset.name||'').localeCompare(a.dataset.name||'');
            if (val === 'price-asc')  return parseInt(a.dataset.price||0) - parseInt(b.dataset.price||0);
            if (val === 'price-desc') return parseInt(b.dataset.price||0) - parseInt(a.dataset.price||0);
            if (val === 'rating') {
                const ratingA = a.querySelectorAll('.fa-star:not(.fa-star-half-alt):not(.far)').length;
                const ratingB = b.querySelectorAll('.fa-star:not(.fa-star-half-alt):not(.far)').length;
                return ratingB - ratingA;
            }
            return 0;
        });

        cards.forEach(card => grid.appendChild(card));
    });
}

// --- View Toggle ---
function setupViewToggle() {
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const grid = document.getElementById('productsGrid');
            if (!grid) return;
            if (btn.dataset.view === 'list') {
                grid.classList.add('list-view');
            } else {
                grid.classList.remove('list-view');
            }
        });
    });
}

// --- Quote Cart ---
function setupQuoteCart() {
    const toggleBtn = document.getElementById('quoteToggle');
    const closeBtn  = document.getElementById('closeCart');
    const overlay   = document.getElementById('quoteOverlay');
    const clearBtn  = document.getElementById('clearQuote');

    if (toggleBtn) toggleBtn.addEventListener('click', openQuoteCart);
    if (closeBtn)  closeBtn.addEventListener('click', closeQuoteCart);
    if (overlay)   overlay.addEventListener('click', closeQuoteCart);
    if (clearBtn)  clearBtn.addEventListener('click', clearAllQuote);

    document.querySelectorAll('.add-to-quote-btn').forEach(btn => {
        btn.addEventListener('click', () => addToQuote(btn));
    });
}

function openQuoteCart() {
    document.getElementById('quoteCart')?.classList.add('open');
    document.getElementById('quoteOverlay')?.classList.add('active');
}
function closeQuoteCart() {
    document.getElementById('quoteCart')?.classList.remove('open');
    document.getElementById('quoteOverlay')?.classList.remove('active');
}

function addToQuote(btn) {
    const productName = btn.dataset.product;
    if (!productName) return;

    if (quoteItems.includes(productName)) {
        btn.innerHTML = '<i class="fas fa-check"></i> Added';
        return;
    }

    quoteItems.push(productName);

    // Visual feedback
    const original = btn.innerHTML;
    btn.classList.add('added');
    btn.innerHTML = '<i class="fas fa-check"></i> Added!';
    setTimeout(() => {
        btn.innerHTML = original;
        btn.classList.remove('added');
    }, 2000);

    renderQuoteItems();
    updateQuoteCount();
    openQuoteCart();
}

function removeFromQuote(productName) {
    quoteItems = quoteItems.filter(p => p !== productName);
    renderQuoteItems();
    updateQuoteCount();
}

function clearAllQuote() {
    quoteItems = [];
    renderQuoteItems();
    updateQuoteCount();
}

function renderQuoteItems() {
    const container = document.getElementById('quoteItems');
    const emptyEl   = document.getElementById('quoteEmpty');
    const footer    = document.getElementById('quoteFooter');
    if (!container) return;

    if (quoteItems.length === 0) {
        if (emptyEl)  emptyEl.style.display = 'block';
        if (footer)   footer.style.display = 'none';
        container.querySelectorAll('.quote-item').forEach(el => el.remove());
        return;
    }

    if (emptyEl) emptyEl.style.display = 'none';
    if (footer)  footer.style.display = 'flex';

    container.querySelectorAll('.quote-item').forEach(el => el.remove());

    quoteItems.forEach(name => {
        const item = document.createElement('div');
        item.className = 'quote-item';
        item.innerHTML = `
            <div class="quote-item-icon"><i class="fas fa-bolt"></i></div>
            <div class="quote-item-info">
                <div class="quote-item-name">${name}</div>
                <div class="quote-item-qty">Qty: 1 unit</div>
            </div>
            <button class="remove-quote-item" title="Remove"><i class="fas fa-trash-alt"></i></button>
        `;
        item.querySelector('.remove-quote-item').addEventListener('click', () => removeFromQuote(name));
        container.insertBefore(item, emptyEl);
    });
}

function updateQuoteCount() {
    const count = quoteItems.length;
    const countEl    = document.getElementById('quoteCount');
    const fabCountEl = document.getElementById('quoteFabCount');
    if (countEl) countEl.textContent = count;
    if (fabCountEl) {
        fabCountEl.textContent = count;
        fabCountEl.style.display = count > 0 ? 'flex' : 'none';
    }
}

// --- Quick View Modal ---
function setupQuickView() {
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.product);
            openQuickView(id);
        });
    });

    document.getElementById('modalClose')?.addEventListener('click', closeQuickView);
    document.getElementById('modalBackdrop')?.addEventListener('click', closeQuickView);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeQuickView();
    });
}

function openQuickView(id) {
    const data = productData[id];
    if (!data) return;

    const modal = document.getElementById('quickViewModal');
    const body  = document.getElementById('modalBody');
    if (!modal || !body) return;

    const specsHTML = data.specs.map(s => `
        <div class="modal-spec-item">
            <div class="modal-spec-label">${s.l}</div>
            <div class="modal-spec-value">${s.v}</div>
        </div>
    `).join('');

    body.innerHTML = `
        <div class="modal-product">
            <div class="modal-product-image">
                <i class="fas ${data.icon}"></i>
            </div>
            <div class="modal-product-info">
                <div class="modal-brand">${data.brand}</div>
                <h2>${data.name}</h2>
                <p class="modal-desc">${data.desc}</p>
                <div class="modal-specs-grid">${specsHTML}</div>
                <div class="modal-footer">
                    <div class="product-price">
                        <span class="price-label">Starting from</span>
                        <span class="price-value">${data.price}</span>
                    </div>
                    <button class="add-to-quote-btn modal-quote-btn" data-product="${data.name}">
                        <i class="fas fa-plus"></i> Add to Quote
                    </button>
                </div>
            </div>
        </div>
    `;

    body.querySelector('.modal-quote-btn')?.addEventListener('click', function() {
        addToQuote(this);
        setTimeout(closeQuickView, 800);
    });

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeQuickView() {
    document.getElementById('quickViewModal')?.classList.remove('open');
    document.body.style.overflow = '';
}

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// 5 — PRELOADER
// ============================================
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const bar       = document.getElementById('preloaderBar');
    const pct       = document.getElementById('preloaderPct');
    if (!preloader) return;

    let progress = 0;
    const interval = setInterval(() => {
        // Fast up to 80%, slow near end
        const increment = progress < 70 ? Math.random() * 12 + 4 : Math.random() * 3 + 1;
        progress = Math.min(progress + increment, 95);
        if (bar) bar.style.width = progress + '%';
        if (pct) pct.textContent = Math.round(progress) + '%';
    }, 80);

    const finish = () => {
        clearInterval(interval);
        if (bar) bar.style.width = '100%';
        if (pct) pct.textContent = '100%';
        setTimeout(() => {
            if (preloader) preloader.classList.add('fade-out');
        }, 300);
    };

    if (document.readyState === 'complete') {
        finish();
    } else {
        window.addEventListener('load', finish);
        // Fallback: always remove after 3.5s max
        setTimeout(finish, 3500);
    }
}

// ============================================
// 6 — STICKY CTA BAR
// ============================================
function initStickyCTA() {
    const bar       = document.getElementById('stickyCTA');
    const closeBtn  = document.getElementById('stickyClose');
    const hero      = document.getElementById('home') || document.querySelector('.hero');
    if (!bar) return;

    let dismissed = false;

    closeBtn?.addEventListener('click', () => {
        dismissed = true;
        bar.classList.remove('visible');
        bar.classList.add('hidden');
        // Remember for session
        sessionStorage.setItem('ctaDismissed', '1');
    });

    if (sessionStorage.getItem('ctaDismissed')) { dismissed = true; }

    // Close when any nav link or CTA btn is clicked to scroll to contact
    bar.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            bar.classList.remove('visible');
            bar.classList.add('hidden');
        });
    });

    const checkScroll = () => {
        if (dismissed) return;
        const heroBottom = hero ? hero.getBoundingClientRect().bottom : 600;
        if (heroBottom < 0) {
            bar.classList.add('visible');
            bar.classList.remove('hidden');
        } else {
            bar.classList.remove('visible');
            bar.classList.add('hidden');
        }
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
}

// ============================================
// 8 — BACK TO TOP BUTTON
// ============================================
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// 12 — FAQ ACCORDION
// ============================================
function initFAQ() {
    const items = document.querySelectorAll('.faq-item');
    items.forEach(item => {
        const btn    = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        if (!btn || !answer) return;

        btn.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Close all others
            items.forEach(other => {
                if (other !== item) {
                    other.classList.remove('open');
                    const a = other.querySelector('.faq-answer');
                    if (a) a.style.maxHeight = '0';
                    other.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle this one
            if (isOpen) {
                item.classList.remove('open');
                answer.style.maxHeight = '0';
                btn.setAttribute('aria-expanded', 'false');
            } else {
                item.classList.add('open');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

// ============================================
// 16 — DARK / LIGHT MODE TOGGLE
// ============================================
function initDarkMode() {
    const toggle = document.getElementById('darkModeToggle');
    if (!toggle) return;

    const icon = toggle.querySelector('i');
    const body = document.body;

    // Read saved preference
    const saved = localStorage.getItem('emsTheme');
    if (saved === 'light') {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        if (icon) { icon.classList.remove('fa-sun'); icon.classList.add('fa-moon'); }
    }

    toggle.addEventListener('click', () => {
        const isLight = body.classList.contains('light-mode');
        if (isLight) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            if (icon) { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); }
            localStorage.setItem('emsTheme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            if (icon) { icon.classList.remove('fa-sun'); icon.classList.add('fa-moon'); }
            localStorage.setItem('emsTheme', 'light');
        }
    });
}

// ============================================
// 15 — CONTACT FORM + FORMSPREE
// ============================================
function initContactForm() {
    const form      = document.getElementById('contactForm');
    const submitBtn = document.getElementById('contactSubmitBtn');
    const successEl = document.getElementById('formSuccess');
    const errorEl   = document.getElementById('formError');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Basic validation
        const name    = form.querySelector('[name="name"]')?.value.trim();
        const email   = form.querySelector('[name="email"]')?.value.trim();
        const message = form.querySelector('[name="message"]')?.value.trim();

        if (!name || !email || !message) {
            form.querySelectorAll('[required]').forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#ff006e';
                    field.style.boxShadow = '0 0 12px rgba(255,0,110,0.3)';
                    setTimeout(() => {
                        field.style.borderColor = '';
                        field.style.boxShadow = '';
                    }, 1800);
                }
            });
            return;
        }

        // Loading state
        const origHTML = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        if (successEl) successEl.classList.remove('show');
        if (errorEl)   errorEl.classList.remove('show');

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #34d399, #059669)';
                if (successEl) successEl.classList.add('show');
                form.reset();
                setTimeout(() => {
                    submitBtn.innerHTML = origHTML;
                    submitBtn.disabled  = false;
                    submitBtn.style.background = '';
                    if (successEl) successEl.classList.remove('show');
                }, 5000);
            } else {
                throw new Error('Server error');
            }
        } catch {
            submitBtn.innerHTML = origHTML;
            submitBtn.disabled  = false;
            if (errorEl) errorEl.classList.add('show');
            setTimeout(() => errorEl?.classList.remove('show'), 6000);
        }
    });
}

// ============================================
// FOOTER YEAR
// ============================================
function initFooterYear() {
    const el = document.getElementById('footerYear');
    if (el) el.textContent = new Date().getFullYear();
}

// ============================================
// FEATURE 4 — 3D CARD FLIP WITH CIRCUIT DIAGRAMS
// ============================================

function buildCircuitSVG(category, brand) {
    // Shared defs string
    const defs = `<defs>
        <filter id="cglow"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <linearGradient id="busG" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#00d4ff" stop-opacity="0.2"/>
            <stop offset="50%" stop-color="#00ffff" stop-opacity="1"/>
            <stop offset="100%" stop-color="#00d4ff" stop-opacity="0.2"/>
        </linearGradient>
    </defs>`;

    const circuits = {
        'mdb': () => `<svg viewBox="0 0 220 260" class="circuit-svg" xmlns="http://www.w3.org/2000/svg">${defs}
            <text x="110" y="14" text-anchor="middle" fill="#00d4ff" font-size="7" font-family="monospace" letter-spacing="1.5">MAIN DISTRIBUTION BOARD</text>
            <!-- 3-phase incoming -->
            <line x1="70" y1="22" x2="70" y2="48" stroke="#ef4444" stroke-width="2.5"/>
            <line x1="110" y1="22" x2="110" y2="48" stroke="#fbbf24" stroke-width="2.5"/>
            <line x1="150" y1="22" x2="150" y2="48" stroke="#34d399" stroke-width="2.5"/>
            <text x="70"  y="20" text-anchor="middle" fill="#ef4444" font-size="7">L1</text>
            <text x="110" y="20" text-anchor="middle" fill="#fbbf24" font-size="7">L2</text>
            <text x="150" y="20" text-anchor="middle" fill="#34d399" font-size="7">L3</text>
            <!-- Main MCCB -->
            <rect x="50" y="48" width="120" height="28" rx="4" fill="rgba(0,212,255,0.08)" stroke="#00d4ff" stroke-width="1.5"/>
            <text x="110" y="60" text-anchor="middle" fill="#00d4ff" font-size="8" font-family="monospace">MAIN MCCB</text>
            <text x="110" y="71" text-anchor="middle" fill="#607080" font-size="6.5">125A · 4P · 6kA</text>
            <!-- Connections thru breaker -->
            <line x1="70"  y1="48" x2="70"  y2="76" stroke="#00d4ff" stroke-width="1" stroke-dasharray="3,2" opacity="0.6"/>
            <line x1="110" y1="48" x2="110" y2="76" stroke="#00d4ff" stroke-width="1" stroke-dasharray="3,2" opacity="0.6"/>
            <line x1="150" y1="48" x2="150" y2="76" stroke="#00d4ff" stroke-width="1" stroke-dasharray="3,2" opacity="0.6"/>
            <!-- Busbar -->
            <rect x="20" y="84" width="180" height="10" rx="2" fill="url(#busG)" class="busbar-pulse"/>
            <text x="110" y="106" text-anchor="middle" fill="#7c3aed" font-size="7" font-family="monospace">3Φ BUSBAR — 400V AC</text>
            <!-- Drops to MCBs -->
            <line x1="38"  y1="94" x2="38"  y2="114" stroke="#00d4ff" stroke-width="1.5" opacity="0.7" class="flow-line"/>
            <line x1="72"  y1="94" x2="72"  y2="114" stroke="#00d4ff" stroke-width="1.5" opacity="0.7" class="flow-line"/>
            <line x1="106" y1="94" x2="106" y2="114" stroke="#00d4ff" stroke-width="1.5" opacity="0.7" class="flow-line"/>
            <line x1="140" y1="94" x2="140" y2="114" stroke="#00d4ff" stroke-width="1.5" opacity="0.7" class="flow-line"/>
            <line x1="174" y1="94" x2="174" y2="114" stroke="#00d4ff" stroke-width="1.5" opacity="0.7" class="flow-line"/>
            <!-- 5 MCBs -->
            ${[38,72,106,140,174].map((x,i) => `
            <rect x="${x-10}" y="114" width="20" height="26" rx="3" fill="rgba(0,212,255,0.1)" stroke="#00d4ff" stroke-width="1.2" class="mcb-blink"/>
            <text x="${x}" y="124" text-anchor="middle" fill="#00d4ff" font-size="6.5" font-family="monospace">MCB</text>
            <text x="${x}" y="134" text-anchor="middle" fill="#607080" font-size="6">${['20A','32A','40A','32A','20A'][i]}</text>
            <line x1="${x}" y1="140" x2="${x}" y2="160" stroke="#00d4ff" stroke-width="1.2" opacity="0.6" class="flow-line-slow"/>
            <circle cx="${x}" cy="166" r="6" fill="none" stroke="#7c3aed" stroke-width="1.5" opacity="0.8"/>
            <text x="${x}" y="169" text-anchor="middle" fill="#7c3aed" font-size="7">~</text>`).join('')}
            <!-- Neutral + Earth bars -->
            <rect x="16" y="180" width="188" height="7" rx="2" fill="rgba(0,160,200,0.2)" stroke="#00a0c0" stroke-width="1"/>
            <text x="110" y="197" text-anchor="middle" fill="#00a0c0" font-size="6.5" font-family="monospace">NEUTRAL BAR (N)</text>
            <rect x="16" y="204" width="188" height="7" rx="2" fill="rgba(52,211,153,0.2)" stroke="#34d399" stroke-width="1"/>
            <text x="110" y="221" text-anchor="middle" fill="#34d399" font-size="6.5" font-family="monospace">EARTH BAR (PE)</text>
            <text x="110" y="244" text-anchor="middle" fill="#607080" font-size="6.5" font-family="monospace">IEC 61439-3 CERTIFIED</text>
        </svg>`,

        'sdb': () => `<svg viewBox="0 0 220 260" class="circuit-svg" xmlns="http://www.w3.org/2000/svg">${defs}
            <text x="110" y="14" text-anchor="middle" fill="#00d4ff" font-size="7" font-family="monospace" letter-spacing="1.5">SUB DISTRIBUTION BOARD</text>
            <!-- Incoming feeder -->
            <line x1="110" y1="22" x2="110" y2="48" stroke="#00d4ff" stroke-width="2.5" class="flow-line"/>
            <text x="110" y="20" text-anchor="middle" fill="#00d4ff" font-size="7" font-family="monospace">FROM MDB</text>
            <!-- Incomer MCB -->
            <rect x="80" y="48" width="60" height="26" rx="4" fill="rgba(0,212,255,0.1)" stroke="#00d4ff" stroke-width="1.5"/>
            <text x="110" y="59" text-anchor="middle" fill="#00d4ff" font-size="8" font-family="monospace">INCOMER</text>
            <text x="110" y="69" text-anchor="middle" fill="#607080" font-size="6.5">63A MCB</text>
            <!-- RCCB -->
            <line x1="110" y1="74" x2="110" y2="90" stroke="#a78bfa" stroke-width="1.5" class="flow-line"/>
            <rect x="76" y="90" width="68" height="26" rx="4" fill="rgba(124,58,237,0.1)" stroke="#a78bfa" stroke-width="1.5"/>
            <text x="110" y="101" text-anchor="middle" fill="#a78bfa" font-size="8" font-family="monospace">RCCB</text>
            <text x="110" y="111" text-anchor="middle" fill="#607080" font-size="6.5">63A · 30mA</text>
            <line x1="110" y1="116" x2="110" y2="126" stroke="#00d4ff" stroke-width="1.5" class="flow-line"/>
            <!-- Busbar -->
            <rect x="20" y="126" width="180" height="8" rx="2" fill="url(#busG)" class="busbar-pulse"/>
            <!-- 8 MCBs -->
            ${[30,57,84,111,138,165].map((x,i) => `
            <line x1="${x}" y1="134" x2="${x}" y2="150" stroke="#00d4ff" stroke-width="1.2" opacity="0.7" class="flow-line-slow"/>
            <rect x="${x-9}" y="150" width="18" height="24" rx="2.5" fill="rgba(0,212,255,0.08)" stroke="#00d4ff" stroke-width="1.1" class="mcb-blink"/>
            <text x="${x}" y="160" text-anchor="middle" fill="#00d4ff" font-size="6" font-family="monospace">MCB</text>
            <text x="${x}" y="169" text-anchor="middle" fill="#607080" font-size="5.5">${['16A','16A','20A','20A','32A','32A'][i]}</text>
            <line x1="${x}" y1="174" x2="${x}" y2="188" stroke="#00d4ff" stroke-width="1" opacity="0.5" class="flow-line-slow"/>
            <circle cx="${x}" cy="193" r="5" fill="none" stroke="#7c3aed" stroke-width="1.3" opacity="0.8"/>
            <text x="${x}" y="196" text-anchor="middle" fill="#7c3aed" font-size="6">~</text>`).join('')}
            <rect x="16" y="206" width="188" height="6" rx="2" fill="rgba(0,160,200,0.2)" stroke="#00a0c0" stroke-width="1"/>
            <text x="110" y="222" text-anchor="middle" fill="#00a0c0" font-size="6.5" font-family="monospace">NEUTRAL BAR (N)</text>
            <rect x="16" y="227" width="188" height="6" rx="2" fill="rgba(52,211,153,0.2)" stroke="#34d399" stroke-width="1"/>
            <text x="110" y="243" text-anchor="middle" fill="#34d399" font-size="6.5" font-family="monospace">EARTH BAR (PE)</text>
        </svg>`,

        'mcc': () => `<svg viewBox="0 0 220 270" class="circuit-svg" xmlns="http://www.w3.org/2000/svg">${defs}
            <text x="110" y="14" text-anchor="middle" fill="#00d4ff" font-size="7" font-family="monospace" letter-spacing="1.5">MOTOR CONTROL CENTER</text>
            <!-- 3Φ incoming -->
            <line x1="60"  y1="22" x2="60"  y2="44" stroke="#ef4444" stroke-width="2.5"/>
            <line x1="110" y1="22" x2="110" y2="44" stroke="#fbbf24" stroke-width="2.5"/>
            <line x1="160" y1="22" x2="160" y2="44" stroke="#34d399" stroke-width="2.5"/>
            <text x="60"  y="20" text-anchor="middle" fill="#ef4444"  font-size="7">L1</text>
            <text x="110" y="20" text-anchor="middle" fill="#fbbf24" font-size="7">L2</text>
            <text x="160" y="20" text-anchor="middle" fill="#34d399"  font-size="7">L3</text>
            <!-- Main incomer -->
            <rect x="40" y="44" width="140" height="24" rx="4" fill="rgba(0,212,255,0.08)" stroke="#00d4ff" stroke-width="1.5"/>
            <text x="110" y="54" text-anchor="middle" fill="#00d4ff" font-size="7.5" font-family="monospace">MAIN INCOMER</text>
            <text x="110" y="63" text-anchor="middle" fill="#607080" font-size="6">630A MCCB</text>
            <!-- Busbar -->
            <rect x="16" y="78" width="188" height="9" rx="2" fill="url(#busG)" class="busbar-pulse"/>
            <text x="110" y="97" text-anchor="middle" fill="#7c3aed" font-size="6.5" font-family="monospace">3Φ BUS — 400V AC</text>
            <!-- 3 starters -->
            ${[45,110,175].map((x,i) => `
            <line x1="${x}" y1="87" x2="${x}" y2="106" stroke="#00d4ff" stroke-width="1.5" class="flow-line"/>
            <!-- Contactor symbol -->
            <rect x="${x-18}" y="106" width="36" height="28" rx="3" fill="rgba(0,212,255,0.08)" stroke="#00d4ff" stroke-width="1.3"/>
            <line x1="${x-10}" y1="112" x2="${x-10}" y2="128" stroke="#00d4ff" stroke-width="1.2"/>
            <line x1="${x}"    y1="112" x2="${x}"    y2="128" stroke="#00d4ff" stroke-width="1.2"/>
            <line x1="${x+10}" y1="112" x2="${x+10}" y2="128" stroke="#00d4ff" stroke-width="1.2"/>
            <line x1="${x-14}" y1="119" x2="${x+14}" y2="119" stroke="#00d4ff" stroke-width="1" stroke-dasharray="2,2"/>
            <text x="${x}" y="146" text-anchor="middle" fill="#00d4ff" font-size="6.5" font-family="monospace">DOL</text>
            <!-- Overload relay -->
            <rect x="${x-18}" y="150" width="36" height="16" rx="3" fill="rgba(251,191,36,0.1)" stroke="#fbbf24" stroke-width="1.2"/>
            <text x="${x}" y="161" text-anchor="middle" fill="#fbbf24" font-size="6" font-family="monospace">OVERLOAD</text>
            <!-- Motor symbol -->
            <line x1="${x}" y1="166" x2="${x}" y2="180" stroke="#00d4ff" stroke-width="1.5" class="flow-line-slow"/>
            <circle cx="${x}" cy="192" r="12" fill="rgba(124,58,237,0.1)" stroke="#a78bfa" stroke-width="1.5"/>
            <text x="${x}" y="189" text-anchor="middle" fill="#a78bfa" font-size="8" font-family="monospace">M</text>
            <text x="${x}" y="199" text-anchor="middle" fill="#a78bfa" font-size="6">3~</text>
            <text x="${x}" y="216" text-anchor="middle" fill="#607080" font-size="6" font-family="monospace">${['PUMP-1','FAN-2','PUMP-3'][i]}</text>`).join('')}
            <text x="110" y="244" text-anchor="middle" fill="#607080" font-size="6.5" font-family="monospace">IEC 61439-2 · FORM 4</text>
            <text x="110" y="256" text-anchor="middle" fill="#7c3aed" font-size="6.5" font-family="monospace">EMS ENGINEERING</text>
        </svg>`,

        'lv-panel': () => `<svg viewBox="0 0 220 270" class="circuit-svg" xmlns="http://www.w3.org/2000/svg">${defs}
            <text x="110" y="14" text-anchor="middle" fill="#00d4ff" font-size="7" font-family="monospace" letter-spacing="1">LV SWITCHGEAR PANEL</text>
            <!-- Utility supply -->
            <text x="110" y="24" text-anchor="middle" fill="#607080" font-size="7" font-family="monospace">UTILITY / TRANSFORMER</text>
            <line x1="110" y1="26" x2="110" y2="46" stroke="#00d4ff" stroke-width="3" class="flow-line"/>
            <!-- Incoming ACB -->
            <rect x="60" y="46" width="100" height="30" rx="5" fill="rgba(0,212,255,0.1)" stroke="#00d4ff" stroke-width="2"/>
            <rect x="70" y="52" width="80" height="18" rx="3" fill="rgba(0,212,255,0.06)" stroke="#00d4ff" stroke-width="1"/>
            <text x="110" y="62" text-anchor="middle" fill="#00d4ff" font-size="8" font-family="monospace">MAIN ACB</text>
            <text x="110" y="72" text-anchor="middle" fill="#607080" font-size="6.5">4000A · Drawout</text>
            <line x1="110" y1="76" x2="110" y2="92" stroke="#00d4ff" stroke-width="2" class="flow-line"/>
            <!-- Bus section -->
            <rect x="16" y="92" width="188" height="11" rx="3" fill="url(#busG)" class="busbar-pulse"/>
            <text x="110" y="115" text-anchor="middle" fill="#7c3aed" font-size="7" font-family="monospace">MAIN BUSBAR — 4000A</text>
            <!-- 4 feeder ACBs -->
            ${[36,84,136,184].map((x,i) => `
            <line x1="${x}" y1="103" x2="${x}" y2="120" stroke="#00d4ff" stroke-width="1.5" class="flow-line"/>
            <rect x="${x-20}" y="120" width="40" height="32" rx="4" fill="rgba(0,212,255,0.08)" stroke="#00d4ff" stroke-width="1.5"/>
            <text x="${x}" y="133" text-anchor="middle" fill="#00d4ff" font-size="7" font-family="monospace">ACB</text>
            <text x="${x}" y="144" text-anchor="middle" fill="#607080" font-size="6">${['800A','630A','630A','400A'][i]}</text>
            <line x1="${x}" y1="152" x2="${x}" y2="172" stroke="#00d4ff" stroke-width="1.5" class="flow-line-slow"/>
            <rect x="${x-18}" y="172" width="36" height="20" rx="3" fill="rgba(124,58,237,0.1)" stroke="#a78bfa" stroke-width="1.2"/>
            <text x="${x}" y="183" text-anchor="middle" fill="#a78bfa" font-size="6.5" font-family="monospace">MCC</text>
            <text x="${x}" y="204" text-anchor="middle" fill="#607080" font-size="6" font-family="monospace">${['MDB-A','MDB-B','MCC-1','SDB-1'][i]}</text>`).join('')}
            <text x="110" y="228" text-anchor="middle" fill="#607080" font-size="6.5" font-family="monospace">IEC 61439-2 · FORM 4b</text>
            <text x="110" y="241" text-anchor="middle" fill="#00d4ff" font-size="6.5" font-family="monospace">IP54 · ARC FLASH RATED</text>
            <text x="110" y="256" text-anchor="middle" fill="#7c3aed" font-size="6.5" font-family="monospace">EMS ENGINEERING</text>
        </svg>`,

        'mcb-panel': () => `<svg viewBox="0 0 220 260" class="circuit-svg" xmlns="http://www.w3.org/2000/svg">${defs}
            <text x="110" y="14" text-anchor="middle" fill="#00d4ff" font-size="7" font-family="monospace" letter-spacing="1.5">MCB DISTRIBUTION PANEL</text>
            <!-- Incoming -->
            <line x1="110" y1="22" x2="110" y2="50" stroke="#00d4ff" stroke-width="2.5" class="flow-line"/>
            <text x="110" y="20" text-anchor="middle" fill="#607080" font-size="7" font-family="monospace">INCOMER</text>
            <!-- Main isolator -->
            <rect x="75" y="50" width="70" height="26" rx="4" fill="rgba(0,212,255,0.1)" stroke="#00d4ff" stroke-width="1.5"/>
            <text x="110" y="61" text-anchor="middle" fill="#00d4ff" font-size="8" font-family="monospace">ISOLATOR</text>
            <text x="110" y="71" text-anchor="middle" fill="#607080" font-size="6.5">125A 1P</text>
            <!-- Busbar -->
            <line x1="110" y1="76" x2="110" y2="88" stroke="#00d4ff" stroke-width="2" class="flow-line"/>
            <rect x="20" y="88" width="180" height="8" rx="2" fill="url(#busG)" class="busbar-pulse"/>
            <!-- RCCB -->
            <line x1="60" y1="96" x2="60" y2="112" stroke="#a78bfa" stroke-width="1.5" class="flow-line"/>
            <rect x="38" y="112" width="44" height="24" rx="3" fill="rgba(124,58,237,0.1)" stroke="#a78bfa" stroke-width="1.5"/>
            <text x="60" y="123" text-anchor="middle" fill="#a78bfa" font-size="7.5" font-family="monospace">RCCB</text>
            <text x="60" y="132" text-anchor="middle" fill="#607080" font-size="6">30mA</text>
            <!-- 6 MCBs -->
            ${[100,128,156,184].map((x,i) => `
            <line x1="${x}" y1="96" x2="${x}" y2="112" stroke="#00d4ff" stroke-width="1.4" class="flow-line"/>
            <rect x="${x-11}" y="112" width="22" height="24" rx="3" fill="rgba(0,212,255,0.08)" stroke="#00d4ff" stroke-width="1.2" class="mcb-blink"/>
            <text x="${x}" y="123" text-anchor="middle" fill="#00d4ff" font-size="6.5" font-family="monospace">MCB</text>
            <text x="${x}" y="132" text-anchor="middle" fill="#607080" font-size="6">${['20A','20A','16A','16A'][i]}</text>
            <line x1="${x}" y1="136" x2="${x}" y2="154" stroke="#00d4ff" stroke-width="1.2" opacity="0.6" class="flow-line-slow"/>
            <circle cx="${x}" cy="160" r="6" fill="none" stroke="#7c3aed" stroke-width="1.3"/>
            <text x="${x}" y="163" text-anchor="middle" fill="#7c3aed" font-size="7">~</text>
            <text x="${x}" y="178" text-anchor="middle" fill="#607080" font-size="6" font-family="monospace">${['LTNG','SOCS','A/C','MISC'][i]}</text>`).join('')}
            <rect x="16" y="194" width="188" height="6" rx="2" fill="rgba(0,160,200,0.2)" stroke="#00a0c0" stroke-width="1"/>
            <text x="110" y="210" text-anchor="middle" fill="#00a0c0" font-size="6.5" font-family="monospace">NEUTRAL BAR (N)</text>
            <rect x="16" y="215" width="188" height="6" rx="2" fill="rgba(52,211,153,0.2)" stroke="#34d399" stroke-width="1"/>
            <text x="110" y="231" text-anchor="middle" fill="#34d399" font-size="6.5" font-family="monospace">EARTH BAR (PE)</text>
            <text x="110" y="250" text-anchor="middle" fill="#607080" font-size="6.5" font-family="monospace">IEC 61439-3 RESIDENTIAL</text>
        </svg>`,
    };

    const fallback = circuits['mdb'];
    return (circuits[category] || fallback)();
}

function getStandardByCategory(category) {
    const map = {
        'mdb': 'IEC 61439-3',
        'sdb': 'IEC 61439-3',
        'mcc': 'IEC 61439-2',
        'lv-panel': 'IEC 61439-2',
        'mcb-panel': 'IEC 61439-3',
    };
    return map[category] || 'IEC 61439';
}

function initCardFlip() {
    const cards = document.querySelectorAll('.product-card');

    cards.forEach(card => {
        const badge   = card.querySelector('.product-badge');
        const image   = card.querySelector('.product-image');
        const info    = card.querySelector('.product-info');
        const category = card.dataset.category || 'mdb';
        const brand    = card.dataset.brand    || '';
        const name     = card.querySelector('.product-name')?.textContent || '';
        const standard = getStandardByCategory(category);

        // Build card-inner with front and back
        const cardInner = document.createElement('div');
        cardInner.className = 'card-inner';

        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        if (image) cardFront.appendChild(image);
        if (info)  cardFront.appendChild(info);

        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.innerHTML = `
            <div class="circuit-svg-wrap">${buildCircuitSVG(category, brand)}</div>
            <div class="card-back-info">
                <div class="card-back-title">${name}</div>
                <div class="card-back-standard">${standard}</div>
                <div class="card-back-hint"><i class="fas fa-sync-alt"></i> Tap button to flip back</div>
            </div>
        `;

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);

        // Re-insert: badge stays first (absolutely positioned on top), then inner
        card.innerHTML = '';
        if (badge) card.appendChild(badge);
        card.appendChild(cardInner);

        // Flip button
        const flipBtn = document.createElement('button');
        flipBtn.className = 'card-flip-btn';
        flipBtn.title = card.classList.contains('flipped') ? 'View Details' : 'View Circuit Diagram';
        flipBtn.innerHTML = '<i class="fas fa-project-diagram"></i>';
        card.appendChild(flipBtn);

        flipBtn.addEventListener('click', e => {
            e.stopPropagation();
            const isFlipped = card.classList.toggle('flipped');
            flipBtn.title   = isFlipped ? 'View Details' : 'View Circuit Diagram';
            flipBtn.innerHTML = isFlipped
                ? '<i class="fas fa-info-circle"></i>'
                : '<i class="fas fa-project-diagram"></i>';
        });
    });

    // Re-bind quote + quickview buttons after DOM rebuild
    document.querySelectorAll('.add-to-quote-btn').forEach(btn => {
        btn.addEventListener('click', () => addToQuote(btn));
    });
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            openQuickView(parseInt(btn.dataset.product));
        });
    });
}

// ============================================
// FEATURE 5 — PANEL ANATOMY HOTSPOT DIAGRAM
// ============================================

function initPanelAnatomy() {
    const hotspots   = document.querySelectorAll('.hotspot');
    const components = document.querySelectorAll('.anatomy-component');
    const svg        = document.getElementById('panelAnatomySvg');

    if (!hotspots.length) return;

    function activateItem(partId, hsId) {
        // Deactivate all
        hotspots.forEach(h => h.classList.remove('active'));
        components.forEach(c => c.classList.remove('active'));
        if (svg) {
            svg.querySelectorAll('.part-highlight').forEach(el => {
                el.classList.remove('lit');
                el.style.filter = '';
            });
        }

        // Activate matching hotspot
        const hs = document.getElementById(hsId);
        if (hs) hs.classList.add('active');

        // Activate matching component list item
        const comp = document.querySelector(`.anatomy-component[data-hs="${hsId}"]`);
        if (comp) {
            comp.classList.add('active');
            comp.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Highlight SVG part
        if (svg && partId) {
            const part = svg.querySelector(`#${partId}`);
            if (part) {
                part.classList.add('lit');
                part.style.filter = 'drop-shadow(0 0 8px rgba(0,212,255,0.9))';
            }
        }
    }

    // Hotspot click
    hotspots.forEach(hs => {
        hs.addEventListener('click', () => {
            const isActive = hs.classList.contains('active');
            if (isActive) {
                // Toggle off
                hs.classList.remove('active');
                const comp = document.querySelector(`.anatomy-component[data-hs="${hs.id}"]`);
                if (comp) comp.classList.remove('active');
                if (svg && hs.dataset.part) {
                    const part = svg.querySelector(`#${hs.dataset.part}`);
                    if (part) { part.classList.remove('lit'); part.style.filter = ''; }
                }
            } else {
                activateItem(hs.dataset.part, hs.id);
            }
        });
    });

    // Component list click
    components.forEach(comp => {
        comp.addEventListener('click', () => {
            activateItem(comp.dataset.part, comp.dataset.hs);
        });
    });

    // Scroll-triggered entrance animation for anatomy section
    const anatomySection = document.getElementById('panel-anatomy');
    if (anatomySection && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Sequentially pulse each hotspot on first view
                    hotspots.forEach((hs, i) => {
                        setTimeout(() => {
                            hs.style.opacity = '0';
                            hs.style.transform = 'translate(-50%,-50%) scale(0)';
                            hs.style.transition = 'all 0.3s ease-out';
                            requestAnimationFrame(() => {
                                setTimeout(() => {
                                    hs.style.opacity = '1';
                                    hs.style.transform = 'translate(-50%,-50%) scale(1)';
                                }, 50);
                            });
                        }, i * 80);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(anatomySection);
    }
}
