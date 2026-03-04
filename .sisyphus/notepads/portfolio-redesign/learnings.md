# Learnings - Portfolio Redesign

## [2026-03-04] Session Start
- Project: Next.js 16 portfolio with App Router, Tailwind CSS
- Current 3D: React Three Fiber with tetrahedron (needs torus knot)
- Theme: OS-level dark mode only (needs toggle component)
- Typography: Large sizing (hero h1 text-8xl, sections h2 text-7xl)
- Design: Minimalist & Refined aesthetic goal

## [2026-03-04] Task 1: Theme System Implementation
### Technical Implementation
- Created theme-toggle.tsx component with SVG sun/moon icons (Lucide-style)
- Modified globals.css to use `[data-theme="light"]` and `[data-theme="dark"]` selectors instead of `@media (prefers-color-scheme: dark)`
- Added theme initialization script in layout.tsx head to prevent flash of unstyled content
- Theme persistence via localStorage with "theme" key
- Default to "dark" theme for first-time visitors (localStorage fallback)
- Added `--wireframe` CSS variable: #575279 (light theme), #e0def4 (dark theme) for 3D canvas

### Key Patterns
- Hydration handling: Used `mounted` state to prevent server/client mismatch
- Theme script must run in `<head>` before `<body>` to set `data-theme` attribute early
- Used `dangerouslySetInnerHTML` for inline script to avoid React hydration issues
- Toggle button integrated into navigation bar's flex container with gap-2

### Rose/Pine Color Palette Preservation
- Kept all existing Rose/Pine color values exactly as-is
- Only moved them from `@media` selectors to `[data-theme]` selectors
- Dawn palette (light theme): #faf4ed background, #575279 foreground
- Rose Pine palette (dark theme): #191724 background, #e0def4 foreground

### QA Results
- Scenario 1 (Toggle & Persistence): PASSED
  - Initial theme: dark
  - After toggle: light
  - localStorage updated: "light"
  - After reload: still "light" (persisted)
- Scenario 2 (First-time Visitor): PASSED
  - Cleared localStorage, reloaded
  - Default theme: dark

### Files Modified
- /app/components/theme-toggle.tsx (new)
- /app/globals.css (modified)
- /app/layout.tsx (modified)
- /app/components/navigation.tsx (modified)

### Build Verification
- LSP: Skipped (typescript-language-server not installed, but build catches errors)
- Next.js build: PASSED ✓ Compiled successfully
- Static pages generated: /, /_not-found

## [2026-03-04] Task 5: Navigation and Contact Headers
### Technical Implementation
- Updated /app/components/contact.tsx h2 from `text-3xl md:text-5xl lg:text-6xl` to `text-2xl md:text-4xl lg:text-5xl`
- Contact header reduced by 1 step at each breakpoint (less prominent than sections)
- /app/components/navigation.tsx: No changes needed - already has appropriate sizing (text-sm for desktop, text-base for mobile)
- Theme toggle button sizing unchanged

### Typography Hierarchy Verified
- Contact h2 at lg breakpoint: 48px (3rem - text-5xl)
- Projects h2 at lg breakpoint: 60px (3.75rem - text-6xl from Task 4)
- Contact header is smaller than section headers as intended

### Design Rationale
- Contact section is less prominent than main content sections (Projects, Skills, Experience, Education)
- Maintains visual hierarchy while keeping contact accessible
- Navigation text remains appropriately sized for readability and layout balance

### QA Results
- Build: PASSED ✓ Compiled successfully
- Font size measurement: PASSED
  - Contact h2: 48px (text-5xl) ✓
  - Projects h2: 60px (text-6xl) ✓
  - Contact is smaller than section headers ✓
- Screenshot captured: .sisyphus/evidence/task-5-contact.png (273KB)

### Files Modified
- /app/components/contact.tsx (line 22)

### Verification
- Build passed without errors
- Navigation text sizes unchanged (text-sm preserved)
- Contact header correctly sized relative to section headers

## [2026-03-04] Task 3: Hero Typography Reduction
### Technical Implementation
- Updated /app/components/hero.tsx h1 from `text-4xl sm:text-5xl md:text-7xl lg:text-8xl` to `text-3xl sm:text-4xl md:text-6xl lg:text-7xl`
- Updated subtitle (profile.title) from `text-lg sm:text-xl md:text-2xl lg:text-3xl` to `text-base sm:text-lg md:text-xl lg:text-2xl`
- Updated body text (profile.bio) from `text-base md:text-lg lg:text-xl` to `text-sm md:text-base lg:text-lg`
- Reduced vertical padding from `py-24 md:py-32 lg:py-40` to `py-20 md:py-28 lg:py-36`
- All typography reduced by exactly 1 step at each breakpoint
- Font weights and families preserved (font-bold for h1, font-medium for subtitle, default for body)

### Typography Measurements
#### Desktop (1920px width)
- h1: 72px (4.5rem - text-7xl) ✓
- subtitle: 24px (1.5rem - text-2xl) ✓
- body: 18px (1.125rem - text-lg) ✓

#### Mobile (375px width)
- h1: 30px (1.875rem - text-3xl) ✓
- subtitle: 16px (1rem - text-base) ✓
- body: 14px (0.875rem - text-sm) ✓

### Visual Hierarchy Preserved
- h1 (30px mobile, 72px desktop) > subtitle (16px mobile, 24px desktop) > body (14px mobile, 18px desktop)
- Clear distinction between elements maintained
- Text remains readable at all sizes
- Vertical spacing reduced but still comfortable

### QA Results
- Build: PASSED ✓ Compiled successfully
- Font size measurements: PASSED
  - Desktop: h1 72px, subtitle 24px, body 18px ✓
  - Mobile: h1 30px, subtitle 16px, body 14px ✓
- Readability: PASSED
  - Text is readable on mobile at reduced sizes ✓
  - Visual hierarchy maintained ✓
- Screenshots captured:
  - .sisyphus/evidence/task-3-hero-desktop.png ✓
  - .sisyphus/evidence/task-3-hero-mobile.png ✓

### Files Modified
- /app/components/hero.tsx (lines 70, 91, 101, 111)

### Verification
- Build passed without errors
- Typography reduced by exactly 1 step at each breakpoint
- Vertical padding reduced for tighter spacing
- Font weights and families unchanged
- Content text unchanged
- Visual hierarchy maintained

## [2026-03-04] Task 6: Global Spacing Refinement
### Technical Implementation
- Section vertical padding reduced: `py-24` → `py-20` (mobile), `md:py-32` → `md:py-28` (desktop), `lg:py-40` → `lg:py-36` (hero only)
- Heading margins tightened: `mb-16` → `mb-12` across all sections
- Card/project gaps refined:
  - Projects grid: `gap-8 md:gap-12` → `gap-6 md:gap-12` (tighter on mobile)
  - Skills categories: `gap-12 md:gap-16` → `gap-10 md:gap-12` (tighter on both)
  - Experience timeline: `space-y-12` → `space-y-10`
  - Education gap: `gap-6` (already appropriate, unchanged)
- Added CSS spacing variables to /app/globals.css for consistent rhythm:
  - `--space-xs` to `--space-5xl` following 4-based scale (0.25rem to 9rem)
  - Variables available for future use but not yet applied to components
- Spacing follows multiples of 4 or 8 rhythm for consistency

### Spacing Changes Summary
| Element | Before | After | Reduction |
|---------|--------|-------|-----------|
| Section padding (mobile) | py-24 (6rem) | py-20 (5rem) | ~17% |
| Section padding (desktop) | md:py-32 (8rem) | md:py-28 (7rem) | 12.5% |
| Hero lg padding | lg:py-40 (10rem) | lg:py-36 (9rem) | 10% |
| Heading margin | mb-16 (4rem) | mb-12 (3rem) | 25% |
| Projects grid gap | gap-8 md:gap-12 | gap-6 md:gap-12 | Mobile: 25% |
| Skills category gap | gap-12 md:gap-16 | gap-10 md:gap-12 | Mobile: 17%, Desktop: 25% |
| Experience timeline | space-y-12 | space-y-10 | ~17% |

### Design Rationale
- Spacing reduced ~10-25% while maintaining readability
- Mobile spacing kept comfortable (no cramped feel)
- Consistent 4/8-based rhythm across all spacing values
- Refined aesthetic achieved through tighter, more intentional spacing
- CSS variables provide foundation for systematic spacing approach

### Mobile Spacing Preservation
- Mobile padding `py-20` (5rem = 80px) remains comfortable
- Mobile gaps (`gap-6`, `space-y-10`) provide breathing room
- No spacing reduction below 6-unit minimum on mobile
- Typography reductions (from Tasks 3-5) complement spacing refinement

### QA Results
- Build: PASSED ✓ Compiled successfully
- Spacing verification: PASSED
  - All section padding reduced as specified ✓
  - Heading margins tightened ✓
  - Card gaps feel tighter but not cramped ✓
  - Spacing follows multiples of 4 or 8 rhythm ✓
- Mobile readability: PASSED
  - Comfortable spacing maintained ✓
  - No cramped feeling ✓
- Screenshot captured: .sisyphus/evidence/task-6-spacing.png (63KB)

### Files Modified
- /app/globals.css (added spacing variables)
- /app/components/hero.tsx (line 70: padding)
- /app/components/projects.tsx (lines 15, 25, 32: padding, heading margin, grid gap)
- /app/components/education.tsx (lines 15, 25: padding, heading margin)
- /app/components/experience.tsx (lines 15, 25, 38: padding, heading margin, timeline gap)
- /app/components/skills.tsx (lines 51, 61, 68: padding, heading margin, category gap)
- /app/components/contact.tsx (line 12: padding)

### Verification
- Build passed without errors
- All spacing changes applied correctly
- Spacing rhythm follows consistent pattern
- Mobile spacing preserved
- Visual evidence captured

## [2026-03-04] Task 2: 3D Background - Torus Knot with Theme-Aware Colors
### Technical Implementation
- Replaced `tetrahedronGeometry` with `torusKnotGeometry` in /app/components/three-canvas.tsx
- Used torusKnotGeometry args: [1, 0.3, 128, 32, 2, 3] for smooth, detailed knot
- Changed color from hardcoded `#c4a7e7` to dynamic CSS variable `--wireframe`
- Added state management for wireframe color using useState and useEffect
- Implemented CSS variable reading using `getComputedStyle(document.documentElement).getPropertyValue('--wireframe')`
- Added MutationObserver to watch for theme changes (data-theme attribute changes)
- Implemented reduced motion support using `window.matchMedia('(prefers-reduced-motion: reduce)')`
- Conditional rendering: static mesh when reduced motion, Float wrapper when normal

### Key Patterns
- CSS variable resolution must happen in browser (not SSR) using getComputedStyle
- MutationObserver detects data-theme attribute changes for live theme updates
- Media query listener for prefers-reduced-motion with cleanup on unmount
- Passed resolved color value as prop to FloatingShape component
- Kept existing animation parameters: distort=0.3, speed=2, Float wrapper with rotationIntensity=0.5, floatIntensity=1.5
- Canvas opacity maintained at opacity-40 (40%)

### Theme-Aware Colors
- Light theme: --wireframe = #575279 (dark purple-gray)
- Dark theme: --wireframe = #e0def4 (light purple-white)
- Wireframe color updates in real-time when theme toggles
- No Three.js warning about unknown color models after fix

### Reduced Motion Support
- When prefers-reduced-motion: reduce is true, animation is paused
- Static mesh renders without Float wrapper (no floating, no rotation)
- Distortion effect still active (visual interest without motion)
- Media query listener updates state when user preference changes

### Build Verification
- LSP: Skipped (typescript-language-server not installed)
- Next.js build: PASSED ✓ Compiled successfully
- No TypeScript errors
- Static pages generated: /, /_not-found

### Files Modified
- /app/components/three-canvas.tsx (replaced geometry, added color state, added reduced motion logic)

### QA Results
- Manual verification completed:
  - Build passes without errors
  - Torus knot geometry renders (verified via code inspection)
  - Wireframe color resolves from CSS variable (no Three.js warnings after fix)
  - Reduced motion logic implemented correctly (conditional rendering)
  - Animation parameters preserved (distort, speed, Float wrapper)

### Technical Notes
- Initial implementation used `color="var(--wireframe)"` which caused Three.js warning: "Unknown color model var(--wireframe)"
- Fixed by reading CSS variable in JavaScript and passing resolved hex string to MeshDistortMaterial
- MutationObserver watches document.documentElement for attribute changes (data-theme changes)
- Clean up both event listeners and observer in useEffect return function
- Canvas opacity at 40% provides subtle background without overwhelming content

### Geometry Details
- torusKnotGeometry parameters:
  - radius: 1 (overall size)
  - tube: 0.3 (tube thickness)
  - tubularSegments: 128 (smoothness along tube)
  - radialSegments: 32 (smoothness around tube)
  - p: 2 (first winding parameter)
  - q: 3 (second winding parameter)
- Result: Detailed, complex knot shape that fills the canvas space

### Material Properties
- MeshDistortMaterial with:
  - distort: 0.3 (subtle wave distortion effect)
  - speed: 2 (distortion animation speed)
  - roughness: 0.2 (slightly shiny surface)
  - metalness: 0.8 (metallic appearance)
  - wireframe: true (show wireframe mesh only)

## [2026-03-04] Task 4: Section Header Typography Reduction
### Technical Implementation
- Updated section h2 typography across all 4 component files:
  - /app/components/projects.tsx: `text-4xl md:text-6xl lg:text-7xl` → `text-3xl md:text-5xl lg:text-6xl`
  - /app/components/education.tsx: `text-4xl md:text-6xl lg:text-7xl` → `text-3xl md:text-5xl lg:text-6xl`
  - /app/components/experience.tsx: `text-4xl md:text-6xl lg:text-7xl` → `text-3xl md:text-5xl lg:text-6xl`
  - /app/components/skills.tsx: `text-4xl md:text-6xl lg:text-7xl` → `text-3xl md:text-5xl lg:text-6xl`
- Updated skills.tsx category h3: `text-xl md:text-2xl` → `text-lg md:text-xl`
- Maintained all other classes: `font-bold tracking-tight mb-16 text-center`
- Typography reduced by exactly 1 step at each breakpoint as specified

### Typography Measurements
#### Section Headers (h2) at lg breakpoint (1920px width)
- Projects: 60px (3.75rem - text-6xl) ✓
- Education: 60px (3.75rem - text-6xl) ✓
- Experience: 60px (3.75rem - text-6xl) ✓
- Skills: 60px (3.75rem - text-6xl) ✓
- Previous size: 72px (4.5rem - text-7xl)

#### Skills Category Headers (h3) at md breakpoint
- Frontend, Backend, Database, DevOps, Tools: 20px (1.25rem - text-xl) ✓
- Previous size: 24px (1.5rem - text-2xl)

### Consistency Verification
- All section h2 elements have identical sizing at each breakpoint
- Typography hierarchy maintained: Hero h1 (72px) > Section h2 (60px) > Contact h2 (48px) > Skills h3 (20px)
- No content or structural changes made
- mb-16 margin preserved (section separation maintained)

### QA Results
- Build: PASSED ✓ Compiled successfully
- LSP: Skipped (typescript-language-server not installed, but build catches errors)
- Font size measurements: PASSED
  - All section h2: 60px at lg breakpoint ✓
  - Skills category h3: 20px at md breakpoint ✓
  - Consistency across all sections verified ✓
- Screenshot captured: .sisyphus/evidence/task-4-sections.png (786KB)

### Files Modified
- /app/components/projects.tsx (line 25: h2 typography)
- /app/components/education.tsx (line 25: h2 typography)
- /app/components/experience.tsx (line 25: h2 typography)
- /app/components/skills.tsx (lines 61, 77: h2 and h3 typography)

### Verification
- Build passed without errors
- Typography reduced by exactly 1 step at each breakpoint
- All section h2 elements have consistent sizing
- Skills category h3 reduced as specified
- mb-16 margin preserved (no section separation reduction)
- Content and structure unchanged
- Visual evidence captured
