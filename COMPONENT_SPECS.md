# EMS Website - Visual Component Specifications

## Component Specifications & Usage

---

## 1. BUTTONS

### Primary Button (CTA - Call to Action)
```html
<a href="#" class="btn btn-primary glow-btn">
    <span>Explore ZETA Platform</span>
    <i class="fas fa-arrow-right"></i>
</a>
```

**Specifications:**
| Property | Value |
|----------|-------|
| Background | Linear gradient (Cyan to Purple) |
| Text Color | White |
| Padding | 12px 30px |
| Border Radius | 8px |
| Border | 2px solid var(--accent-cyan) |
| Box Shadow | 0 0 20px rgba(0, 212, 255, 0.5) |
| Hover Effect | Scale up, enhanced glow |
| Transition | 0.3s ease-in-out |
| Font Weight | 600 |

**Usage Context:**
- Primary calls-to-action
- Download/Sign up buttons
- Hero section buttons
- Form submissions

### Secondary Button
```html
<a href="#" class="btn btn-secondary">
    <span>Our Services</span>
</a>
```

**Specifications:**
| Property | Value |
|----------|-------|
| Background | Transparent |
| Text Color | var(--accent-cyan) |
| Border | 2px solid var(--accent-cyan) |
| Padding | 12px 30px |
| Border Radius | 8px |
| Hover Effect | Fill with cyan background |
| Transition | 0.3s ease-in-out |

**Usage Context:**
- Secondary actions
- Navigation buttons
- Explore more buttons

---

## 2. CARDS

### Service Card
```html
<div class="service-card card-hover">
    <div class="service-icon">
        <i class="fas fa-tasks"></i>
    </div>
    <h3>Project Management</h3>
    <div class="service-features">
        <ul>
            <li><span class="dot"></span>Primavera Planning</li>
            <li><span class="dot"></span>Costing & Budgeting</li>
        </ul>
    </div>
</div>
```

**Specifications:**
| Property | Value |
|----------|-------|
| Width | 280px (responsive grid) |
| Background | Gradient rgba(15, 58, 95, 0.5) to rgba(10, 14, 39, 0.5) |
| Border | 1px solid rgba(0, 212, 255, 0.2) |
| Border Radius | 12px |
| Padding | 2rem (var(--spacing-lg)) |
| Hover Border Top | 3px solid gradient (Cyan to Purple) |
| Hover Shadow | 0 10px 40px rgba(0, 212, 255, 0.2) |
| Hover Transform | translateY(-10px) |
| Icon Size | 2.5rem |
| Icon Color | var(--accent-cyan) |
| Min Height | 280px |

**Animation:**
- Slide in from bottom on scroll (0.8s ease-out)
- Top border scales in on hover
- Icon scales and rotates on parent hover

### Case Study Card
```html
<div class="case-card case-card-1">
    <div class="case-image">
        <div class="case-icon">
            <i class="fas fa-droplet"></i>
        </div>
    </div>
    <div class="case-content">
        <h3>Water Treatment Plant Automation</h3>
        <p class="location">Cairo, Egypt</p>
        <p class="description">Complete IoT integration...</p>
        <div class="case-stats">
            <span>IoT Sensors: 200+</span>
        </div>
    </div>
</div>
```

**Specifications:**
| Property | Value |
|----------|-------|
| Width | 300px (responsive) |
| Background | Linear gradient (primary-blue to secondary-blue) |
| Border | 1px solid rgba(0, 212, 255, 0.2) |
| Image Height | 200px |
| Image Background | Gradient with shimmer animation |
| Icon Size | 4rem |
| Content Padding | 2rem |
| Hover Shadow | 0 15px 40px rgba(0, 212, 255, 0.2) |
| Hover Transform | translateY(-10px) |

**Animation:**
- Shimmer effect on image (3s infinite)
- Slide in from bottom on scroll
- Lift on hover

---

## 3. BADGES & LABELS

### Certification Badge
```html
<div class="cert-badge">
    <i class="fas fa-check-circle"></i>
    <span>Siemens Certified</span>
</div>
```

**Specifications:**
| Property | Value |
|----------|-------|
| Padding | 1rem 1.5rem |
| Background | rgba(0, 212, 255, 0.05) |
| Border | 1px solid rgba(0, 212, 255, 0.3) |
| Border Radius | 12px |
| Color | var(--accent-cyan) |
| Font Size | 0.9rem |
| Font Weight | 600 |
| Icon Size | 1.5rem |
| Hover Shadow | 0 0 20px rgba(0, 212, 255, 0.3) |

### Sector Tile
```html
<div class="sector-tile">
    <i class="fas fa-hospital"></i>
    <span>Hospitals</span>
</div>
```

**Specifications:**
| Property | Value |
|----------|-------|
| Size | 120px × 120px (minimum) |
| Padding | 1rem |
| Background | rgba(0, 212, 255, 0.05) |
| Border | 1px solid rgba(0, 212, 255, 0.2) |
| Border Radius | 12px |
| Display | Flex column centered |
| Icon Size | 2rem |
| Text Size | 0.9rem |
| Font Weight | 600 |
| Hover Scale | 1.05 |
| Hover Shadow | 0 10px 30px rgba(0, 212, 255, 0.2) |

---

## 4. FORMS

### Input Field
```html
<div class="form-group">
    <input type="text" placeholder="Your Name" required>
</div>
```

**Specifications:**
| Property | Value |
|----------|-------|
| Width | 100% |
| Padding | 12px 16px |
| Background | rgba(0, 212, 255, 0.05) |
| Border | 1px solid rgba(0, 212, 255, 0.2) |
| Border Radius | 8px |
| Color | var(--text-primary) |
| Font Size | 0.95rem |
| Focus Border | var(--accent-cyan) |
| Focus Shadow | 0 0 15px rgba(0, 212, 255, 0.2) |
| Transition | 0.3s ease-in-out |
| Min Height | 44px (accessibility) |

### Text Area
```html
<div class="form-group">
    <textarea placeholder="Your Message" rows="5" required></textarea>
</div>
```

**Specifications:** Same as input field
| Additional | Value |
|-----------|-------|
| Min Height | Auto (5 rows) |
| Resize | Vertical only |

---

## 5. TYPOGRAPHY HIERARCHY

### Hero Title (H1)
```html
<h1 class="glitch" data-text="Smart Engineering...">
    Smart Engineering. Smart Cities. Smart Future.
</h1>
```

**Specifications:**
| Property | Value |
|----------|-------|
| Font Size | 3.5rem (responsive: 2rem on mobile) |
| Font Weight | Bold (700) |
| Color | Gradient (Cyan to Light) |
| Line Height | 1.2 |
| Text Shadow | 0 0 20px rgba(0, 212, 255, 0.3) |
| Animation | Slide in from left (0.8s ease-out) |

### Section Header (H2)
**Specifications:**
| Property | Value |
|----------|-------|
| Font Size | 2.8rem (responsive: 1.5rem on mobile) |
| Font Weight | Bold (700) |
| Color | Gradient (Cyan to Light) |
| Margin Bottom | 1rem |
| Animation | Fade in (0.6s ease-out) |

### Card Title (H3)
**Specifications:**
| Property | Value |
|----------|-------|
| Font Size | 1.3rem |
| Font Weight | 600 |
| Color | var(--text-light) |
| Margin Bottom | 0.5rem |

### Body Text (p)
**Specifications:**
| Property | Value |
|----------|-------|
| Font Size | 0.95rem - 1rem |
| Color | var(--text-secondary) |
| Line Height | 1.6 - 1.8 |
| Letter Spacing | Normal (0) |

---

## 6. NAVIGATION COMPONENTS

### Navbar
```html
<nav class="navbar">
    <div class="nav-content">
        <div class="logo">...</div>
        <ul class="nav-links">...</ul>
        <div class="hamburger">...</div>
    </div>
</nav>
```

**Specifications:**
| Property | Value |
|----------|-------|
| Position | Fixed (top: 0) |
| Height | Auto (~60px) |
| Background | rgba(10, 14, 39, 0.95) with blur |
| Border Bottom | 1px solid rgba(0, 212, 255, 0.2) |
| Z-Index | 1000 |
| Padding | 1rem 0 |
| Backdrop Filter | blur(10px) |

### Nav Links
**Specifications:**
| Property | Value |
|----------|-------|
| Color | var(--text-primary) |
| Hover Color | var(--accent-cyan) |
| Underline Width | Animated from 0 to 100% |
| Underline Color | var(--accent-cyan) |
| Underline Glow | 0 0 10px var(--accent-cyan) |
| Transition | 0.3s ease-in-out |

### Hamburger Menu
**Specifications:**
| Property | Value |
|----------|-------|
| Display | None (desktop), Flex (mobile) |
| Span Width | 25px |
| Span Height | 3px |
| Span Color | var(--accent-cyan) |
| Border Radius | 2px |
| Margin Between | 5px |
| Gap | 5px |

---

## 7. TIMELINE COMPONENTS

### Timeline Item
```html
<div class="timeline-item">
    <div class="timeline-dot"></div>
    <div class="timeline-content">
        <h3>Founded in UAE</h3>
        <p>Description...</p>
    </div>
</div>
```

**Specifications:**
| Property | Value |
|----------|-------|
| Dot Size | 20px × 20px |
| Dot Color | var(--accent-cyan) |
| Dot Border | 3px solid var(--primary-dark) |
| Dot Shadow | 0 0 15px rgba(0, 212, 255, 0.6) |
| Dot Hover Scale | 1.3 |
| Content Padding Left | 60px |
| Animation | Slide in (0.8s ease-out) |

---

## 8. HOLOGRAPHIC ELEMENTS

### Rotating Hologram
```html
<div class="hologram-container">
    <div class="hologram rotating">
        <div class="hologram-layer"></div>
        <div class="hologram-layer"></div>
        <div class="hologram-layer"></div>
        <i class="fas fa-microchip"></i>
    </div>
    <div class="glow-orb"></div>
</div>
```

**Specifications:**
| Property | Value |
|----------|-------|
| Container Size | 300px × 300px |
| Hologram Size | 250px × 250px |
| Layer 1 Border | 2px solid rgba(0, 212, 255, 0.3) |
| Layer 2 Border | 2px solid rgba(0, 212, 255, 0.5) |
| Layer 3 Border | 2px solid var(--accent-cyan) with glow |
| Rotation Speed | 20s continuous |
| Icon Size | 5rem |
| Icon Color | var(--accent-cyan) |
| Glow Orb Size | 150px × 150px |
| Glow Blur | 30px |
| Glow Scale Animation | 1 to 1.3 over 4s |

---

## 9. BENEFIT CARDS

### Benefit Card
```html
<div class="benefit-card">
    <div class="benefit-icon">
        <i class="fas fa-bolt"></i>
    </div>
    <h4>Energy Efficiency</h4>
    <p>Optimize energy consumption across all systems</p>
</div>
```

**Specifications:**
| Property | Value |
|----------|-------|
| Padding | 2rem |
| Background | Linear gradient with cyan/purple transparency |
| Border | 1px solid rgba(0, 212, 255, 0.2) |
| Border Radius | 12px |
| Icon Size | 2.5rem |
| Icon Color | var(--accent-cyan) |
| Icon Margin | 1rem bottom |
| Text Alignment | Center |
| Min Height | 200px |
| Hover Transform | translateY(-10px) |
| Hover Shadow | 0 20px 40px rgba(0, 212, 255, 0.2) |
| Shimmer Animation | Left to right over 3s |

---

## 10. FOOTER

### Footer Structure
```html
<footer class="footer">
    <div class="footer-content">
        <!-- Multiple sections -->
    </div>
    <div class="footer-bottom">
        <!-- Copyright -->
    </div>
</footer>
```

**Specifications:**
| Property | Value |
|----------|-------|
| Background | var(--primary-dark) |
| Border Top | 1px solid rgba(0, 212, 255, 0.2) |
| Padding | 60px 0 20px |
| Text Color | var(--text-secondary) |

### Social Icons
**Specifications:**
| Property | Value |
|----------|-------|
| Size | 40px × 40px |
| Border Radius | 50% (circular) |
| Background | rgba(0, 212, 255, 0.1) |
| Border | 1px solid rgba(0, 212, 255, 0.3) |
| Color | var(--accent-cyan) |
| Hover Background | var(--accent-cyan) |
| Hover Color | var(--primary-dark) |
| Hover Transform | translateY(-3px) |
| Gap Between | 1rem |

---

## 11. RESPONSIVE BREAKPOINTS

### Desktop (1024px+)
- Full multi-column layouts
- All animations enabled
- Hover effects active
- Full navigation visible

### Tablet (768px - 1023px)
- 2-column grids become 1 column
- Hamburger menu appears
- Touch-optimized spacing
- Slightly smaller fonts

### Mobile (< 768px)
- Single column layouts
- Hamburger navigation
- 44px minimum touch targets
- Reduced padding/margins
- Stacked hero section
- Smaller fonts (but readable)

---

## 12. COLOR APPLICATIONS

### Accent Cyan (#00d4ff)
**Used for:**
- Primary links
- Button borders
- Icon colors
- Highlights
- Glow effects
- Active states

### Accent Purple (#7c3aed)
**Used for:**
- Gradient overlays
- Secondary highlights
- Hover states
- Accent combinations

### Accent Pink (#ff006e)
**Used for:**
- Error states
- Error text
- Invalid borders
- Alert indicators

---

## Loading States (Optional Implementation)

### Spinner Animation
```css
@keyframes spinner {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.spinner {
    border: 3px solid rgba(0, 212, 255, 0.2);
    border-top: 3px solid var(--accent-cyan);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spinner 1s linear infinite;
}
```

---

## Accessibility Color Combinations

**Sufficient Contrast (WCAG AA - 4.5:1):**
- White text (#FFFFFF) on primary-dark (#0a0e27) ✅
- Accent Cyan (#00d4ff) on dark backgrounds ✅
- Text-light (#f0f0f0) on primary-blue (#1a2f4a) ✅

**Avoid:**
- Text-secondary on primary-dark (insufficient contrast)
- Use for decorative elements only

---

**Last Updated**: December 2024
**Component Version**: 1.0
**Status**: Production Ready
