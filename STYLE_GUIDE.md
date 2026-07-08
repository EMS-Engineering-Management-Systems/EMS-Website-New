# EMS Website - Style Guide & Component Documentation

## Table of Contents
1. [Brand Identity](#brand-identity)
2. [Component Library](#component-library)
3. [Animation Specifications](#animation-specifications)
4. [Accessibility Guidelines](#accessibility-guidelines)
5. [Developer Notes](#developer-notes)

---

## Brand Identity

### Logo & Branding
- **Logo**: EMS (Engineering Management Systems)
- **Style**: Futuristic, tech-forward, modern
- **Tagline**: "Smart Engineering. Smart Cities. Smart Future."
- **Industries**: MEP, Automation, IoT, AI, Energy Management

### Visual Language
The design uses:
- **Neon glow effects** for futuristic feel
- **Geometric shapes** and rounded rectangles
- **Circuit patterns** suggesting digital systems
- **Holographic elements** for premium feel
- **Deep blues and cyans** for tech aesthetic
- **Grid-based layouts** for organization

### Tone & Voice
- Professional yet approachable
- Technical but understandable
- Forward-thinking and innovative
- Reliable and trustworthy

---

## Component Library

### Buttons

#### Primary Button
```html
<a href="#" class="btn btn-primary glow-btn">
    <span>Explore ZETA Platform</span>
    <i class="fas fa-arrow-right"></i>
</a>
```
**Styling**:
- Background: Cyan to Purple gradient
- Text: White
- Glow effect on hover
- 3px vertical lift animation
- Border radius: 8px

#### Secondary Button
```html
<a href="#" class="btn btn-secondary">
    <span>Our Services</span>
</a>
```
**Styling**:
- Background: Transparent
- Border: 2px solid cyan
- Text: Cyan
- Hover: Filled background

### Cards

#### Service Card
```html
<div class="service-card card-hover">
    <div class="service-icon">
        <i class="fas fa-tasks"></i>
    </div>
    <h3>Service Title</h3>
    <div class="service-features">
        <ul>
            <li><span class="dot"></span>Feature</li>
        </ul>
    </div>
</div>
```
**Features**:
- Gradient border on top on hover
- Icon animation on hover
- List items animate on parent hover
- Smooth elevation effect
- Responsive grid layout

#### Case Study Card
```html
<div class="case-card case-card-1">
    <div class="case-image">
        <div class="case-icon">
            <i class="fas fa-droplet"></i>
        </div>
    </div>
    <div class="case-content">
        <h3>Project Title</h3>
        <p class="location">Location</p>
        <p class="description">Description</p>
        <div class="case-stats">
            <span>Stat 1: Value</span>
            <span>Stat 2: Value</span>
        </div>
    </div>
</div>
```
**Features**:
- Background shimmer animation
- Icon glow effect
- Hover lift with enhanced shadow
- Stats displayed at bottom

### Forms

#### Input Field
```html
<div class="form-group">
    <input type="text" placeholder="Your Name" required>
</div>
```
**Styling**:
- Background: Semi-transparent dark with cyan tint
- Border: 1px solid cyan at 20% opacity
- Focus: Enhanced border and glow
- Rounded corners: 8px
- Padding: 12px 16px

#### Text Area
```html
<div class="form-group">
    <textarea placeholder="Your Message" rows="5" required></textarea>
</div>
```
**Features**:
- Same styling as input
- Responsive height
- Scrollable content
- Focus glow effect

### Navigation

#### Navbar Structure
```html
<nav class="navbar">
    <div class="container">
        <div class="nav-content">
            <div class="logo">
                <div class="logo-icon">EMS</div>
                <span>Engineering Management Systems</span>
            </div>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <!-- More links -->
            </ul>
            <div class="hamburger">
                <span></span><span></span><span></span>
            </div>
        </div>
    </div>
</nav>
```
**Features**:
- Fixed position with blur backdrop
- Cyan border bottom
- Active link indicators
- Responsive hamburger menu
- Smooth transitions

---

## Animation Specifications

### Page Load Animations

#### Slide In Left
```css
animation: slideInLeft 0.8s ease-out;
```
- Duration: 800ms
- Easing: ease-out for snappy feel
- Used for: Hero text, left-aligned content
- Translation: -50px to 0

#### Slide In Right
```css
animation: slideInRight 0.8s ease-out;
```
- Duration: 800ms
- Used for: Hero visual, right-aligned content
- Translation: 50px to 0

#### Slide In Up
```css
animation: slideInUp 0.8s ease-out;
```
- Duration: 800ms
- Used for: Cards, buttons, bottom content
- Translation: 30px down to 0
- Opacity fade in

#### Fade In
```css
animation: fadeIn 0.6s ease-out;
```
- Duration: 600ms
- Used for: Subtitles, descriptions
- Opacity: 0 to 1

### Continuous Animations

#### Spin (3D)
```css
animation: spin 20s linear infinite;
```
- Duration: 20 seconds
- Infinite loop
- Linear easing for constant speed
- Used for: Hologram layers, rotating elements

#### Pulse
```css
animation: pulse 4s ease-in-out infinite;
```
- Duration: 4 seconds
- Ease-in-out for smooth pulsing
- Scale: 1 to 1.3
- Used for: Glow orbs, emphasis elements

#### Float
```css
animation: float 6s ease-in-out infinite;
```
- Duration: 6 seconds
- Combination of translateY and translateX
- Used for: Circuit dots, floating elements

#### Scan
```css
animation: scan 8s linear infinite;
```
- Duration: 8 seconds
- Creates CRT monitor scanning effect
- Used for: Background lines

### Hover Animations

#### Transform Scale
```css
transform: scale(1.1);
transition: 0.3s ease-out;
```
- Subtle scale increase
- Smooth transition
- Used for: Icons, small elements

#### Transform Translate
```css
transform: translateY(-3px);
transition: 0.3s ease-out;
```
- Slight vertical lift
- Creates depth effect
- Used for: Cards, buttons

#### Glow Enhancement
```css
box-shadow: 0 0 40px rgba(0, 212, 255, 0.8);
```
- Enhanced glow on hover
- Dynamic shadow update
- Used for: Interactive elements

### Scroll Animations

#### Staggered Card Animations
Each card in a grid animates with slight delay:
```css
.service-card:nth-child(1) { animation-delay: 0.1s; }
.service-card:nth-child(2) { animation-delay: 0.2s; }
/* etc. */
```

#### Parallax Scrolling
Background moves at 50% of scroll speed:
```javascript
translate: translateY(${scrolled * 0.5}px);
```

---

## Accessibility Guidelines

### Color Contrast
- Text on dark backgrounds: White/Light gray
- Minimum contrast ratio: 4.5:1 for normal text
- 7:1 for large text

### Interactive Elements
- Minimum touch target size: 44x44px
- Clear focus states (visible outline)
- Keyboard navigable (Tab, Enter, Escape)

### Typography
- Base font size: 16px (1rem)
- Line height: 1.6 for body text
- Font weight: Varies from 400-700
- Letter spacing: Normal (0)

### Forms
- Label associations (implicit or explicit)
- Clear error messages
- Required field indicators
- Success feedback

### Images & Icons
- Decorative images: `role="presentation"`
- Functional icons: aria-label or context
- Font Awesome icons: Semantic HTML

### Motion
- Respect `prefers-reduced-motion`
- No auto-playing animations (optional: can be added)
- Animations serve a purpose

---

## Developer Notes

### CSS Variables Usage
```css
:root {
    --primary-dark: #0a0e27;
    --accent-cyan: #00d4ff;
    --transition-normal: 0.3s ease-in-out;
}

/* Usage */
.element {
    background: var(--primary-dark);
    transition: var(--transition-normal);
}
```

### Responsive Breakpoints
- **Large Desktop**: 1200px (container max-width)
- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: < 768px

### Grid System
- 12-column conceptual grid
- CSS Grid for main layouts
- Flexbox for component layouts
- Auto-fit and minmax for responsiveness

### Performance Optimization
1. **CSS Transforms**: Use for animations (GPU accelerated)
2. **Will-change**: Applied sparingly for heavy animations
3. **Intersection Observer**: For scroll-triggered animations
4. **Debouncing**: For scroll and resize events
5. **Event Delegation**: For multiple similar elements

### Browser-Specific Prefixes
```css
/* Gradient text */
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;

/* Backdrop blur */
backdrop-filter: blur(10px);
-webkit-backdrop-filter: blur(10px);
```

### JavaScript Implementation

#### Intersection Observer (Scroll Animations)
```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
});
```

#### Event Debouncing
```javascript
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}
```

#### Form Validation
```javascript
function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            highlightInvalid(input);
            isValid = false;
        }
    });
    
    return isValid;
}
```

### Common Customization Tasks

#### Change Primary Color
1. Update `--accent-cyan` in :root
2. All elements using this variable automatically update
3. Affects gradients, glows, borders, text

#### Add New Animation
```css
@keyframes newAnimation {
    0% { /* start state */ }
    100% { /* end state */ }
}

.element {
    animation: newAnimation 0.5s ease-out;
}
```

#### Create New Card Variant
```html
<div class="card-base custom-card">
    <!-- Content -->
</div>
```

```css
.custom-card {
    /* Extend card styles */
    background: var(--primary-blue);
    border: 1px solid var(--accent-cyan);
    /* Custom styles */
}
```

### Testing Checklist
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Animation smoothness (60fps)
- [ ] Form submission and validation
- [ ] Cross-browser compatibility
- [ ] Keyboard navigation
- [ ] Color contrast accessibility
- [ ] Link functionality
- [ ] Mobile touch interactions

---

## Component State Variations

### Hover States
- Buttons: Lift + Enhanced glow
- Cards: Elevation + Border highlight
- Links: Underline + Color change
- Forms: Border highlight + Glow

### Focus States
- All interactive elements have visible focus
- Outline or border highlight
- Sufficient contrast

### Active States
- Navigation links: Color highlight
- Buttons: Pressed appearance
- Forms: Filled state

### Loading States (Optional)
- Spinner animation
- Disabled state styling
- Reduced opacity

### Error States
- Red/pink border/text
- Error message display
- Icon indication

### Success States
- Green/cyan highlight
- Checkmark icon
- Success message

---

**Note**: This style guide is a living document and may be updated as the design evolves.

Last Updated: December 2024
