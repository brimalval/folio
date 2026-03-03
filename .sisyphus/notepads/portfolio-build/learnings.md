# Learnings

---

## Task 2: Content Assets Confirmation (2026-03-03)

### Asset Status Summary
- **S3 URLs:** All accessible (5/5 - 100% HTTP 200 OK)
- **Profile Data:** Complete except resume URL
- **Project Images:** 3 images for OMNI project, verified and accessible
- **Blocker:** Resume URL is placeholder "/"

### Key Findings

1. **S3 Hosting Working Well**
   - All images served from `https://brimalval-public-site-assets.s3.ap-southeast-1.amazonaws.com/folio/`
   - HTTP verification method: `curl -sI <URL> | head -1`
   - All verified URLs return HTTP 200 OK

2. **Profile Data Quality**
   - All required fields populated with real data
   - No placeholder text detected in critical fields
   - Bio is complete and professional
   - Contact info: email, phone, location all present

3. **Resume URL Issue**
   - Current: "/" (placeholder)
   - Required: External URL to resume PDF
   - Plan states user confirmed external link in interview
   - Action needed: User provides actual resume URL

4. **Project Image Distribution**
   - OMNI Platform: 3 images (verified accessible)
   - HRIS System: 0 images (may need later)
   - ChAI Assistant: 0 images (may need later)

### Verification Method

Used systematic curl approach:
```bash
# Check HTTP status of each URL
curl -sI <URL> | head -1
```

All S3 URLs returned: `HTTP/1.1 200 OK`

### Data File Locations
- Profile: `/folio-work/portfolio/data/profile.json`
- Projects: `/folio-work/portfolio/data/projects.json`
- Evidence: `.sisyphus/evidence/task-2-assets-status.md`

### Next Steps
- User to provide actual resume URL
- Update profile.json resumeUrl field
- Proceed with section implementation

---

## Task 1: React 19 + Motion/R3F Compatibility Verification (2026-03-04)

### Overall Status
✅ All libraries (Motion, React Three Fiber, Tailwind CSS v4) confirmed compatible with React 19.0+
✅ No critical blockers identified
✅ Production examples found in major codebases (Vercel, NASA, Ollama)

### Key Technical Findings

1. **Motion Library (formerly Framer Motion)**
   - Must use new `motion` package (not `framer-motion`)
   - Version 12+ required for React 19
   - React 19 ref API change: pass ref directly via props
   - No forwardRef wrapper needed in React 19
   - Install: `npm install motion`
   - Import: `import { motion } from "motion/react"`

2. **React Three Fiber**
   - Version 9+ required for React 19
   - Official pairing: `@react-three/fiber@8` → React 18, `@react-three/fiber@9` → React 19
   - All PMNDRS ecosystem packages support React 19 (drei, lamina, etc.)
   - Install: `npm install three @react-three/fiber@^9.0.0`

3. **Tailwind CSS v4**
   - v4.2 with PostCSS plugin confirmed working
   - Standard installation with React 19 and Next.js 16
   - No special configuration needed
   - Already configured in the project

### Production Evidence

**Motion + React 19:**
- vercel/next.js (turbopack/benchmark-apps): React 19.0.0 + framer-motion 12.0.0
- ollama/ollama: React 19.1.0 + framer-motion 12.17.0
- Shubhamsaboo/awesome-llm-apps: React 19.0.0 + framer-motion 11.0.0

**React Three Fiber + React 19:**
- NASA-AMMOS/3DTilesRendererJS: peerDependencies supports React ^19.0.0
- pmndrs/drei: peerDependencies requires React ^19
- pmndrs/lamina: peerDependencies requires React >=19.0

### Installation Commands (Recommended Order)

```bash
# Motion (new package for React 19)
npm install motion

# React Three Fiber (v9 for React 19)
npm install three @react-three/fiber@^9.0.0 @react-three/drei@latest

# Tailwind CSS v4 (already installed, no action needed)
```

### Known Issues & Workarounds

**Motion:**
- React 19 ref forwarding: use `<div ref={props.ref} />` instead of forwardRef
- Must use `motion` package, not `framer-motion`

**React Three Fiber:**
- Ensure all R3F ecosystem packages are latest versions
- Version 9+ is mandatory for React 19

### Documentation Sources
- Motion: https://motion.dev/docs/react-upgrade-guide
- R3F: https://github.com/pmndrs/react-three-fiber (official docs)
- Tailwind: https://tailwindcss.com/docs/installation/framework-guides/nextjs

### Evidence Saved
`.sisyphus/evidence/task-1-compatibility-report.md` - Full compatibility report with all findings

---

## Task 3: Project Setup & Configuration (2026-03-04)

### Overall Status
✅ All setup tasks completed successfully

### Key Learnings

1. **Package Manager**
    - Project uses pnpm (not npm)
    - Use `pnpm install` and `pnpm add -D` for dependencies

2. **Dependencies Installed**
    - Production: motion 12.34.5, three 0.183.2, @react-three/fiber 9.5.0, @react-three/drei 10.7.7
    - Dev: vitest 4.0.18, @testing-library/react 16.3.2, @testing-library/jest-dom 6.9.1, @vitest/coverage-v8 4.0.18, jsdom 28.1.0, zod 4.3.6

3. **TypeScript Path Resolution**
    - Issue: lib/data.ts and lib/async-data.ts had incorrect imports
    - Solution: Created types/portfolio.ts with all type definitions
    - Both files now import from "@/types/portfolio"

4. **Vitest Configuration**
    - Simple config with jsdom environment and v8 coverage
    - No @vitejs/plugin-react needed for Vitest

5. **Git Hooks**
    - Pre-commit hook created at .git/hooks/pre-commit
    - Runs npm run lint && npm run test

### Build Verification
- ✅ Dev server starts successfully
- ✅ Test infrastructure works
- ✅ Build completes successfully
- ✅ .next directory created

### Issues Resolved
1. **Missing zod dependency** - Installed with `pnpm add -D zod`
2. **TypeScript import path errors** - Created types/portfolio.ts


---

## Task 6: Hero Section with 3D Accent (2026-03-04)

### Overall Status
✅ Hero section complete with TDD tests passing (12/12)
✅ 3D floating shape using React Three Fiber
✅ CSS gradient fallback for WebGL-disabled browsers
✅ Responsive at all breakpoints (320px, 768px, 1024px, 1440px)
✅ Rose Pine color theme applied
✅ Japanese Ma principle (generous spacing) implemented

### Key Technical Decisions

1. **Motion Library**
   - Use `motion` package (not `framer-motion`) for React 19
   - Import from `motion/react`
   - Fade-in animations with staggered delays for hero elements

2. **React Three Fiber Setup**
   - Canvas with Suspense boundary for graceful loading
   - Float component from drei for floating animation
   - MeshDistortMaterial for organic, distorted shape effect
   - WebGL detection via useEffect + canvas.getContext('webgl')

3. **Rose Pine Color Variables**
   - Light mode (Dawn): Warm, muted palette
   - Dark mode (Pine): Cool, deep palette
   - Key colors: --iris (accent), --love (secondary), --subtle (muted text)
   - CSS variables defined in globals.css with @theme inline for Tailwind

4. **Japanese Ma Principle**
   - Generous padding: py-24 md:py-32 lg:py-40
   - Large gaps: gap-12 md:gap-16
   - Max-width constraint: max-w-4xl for readability
   - Space-y-8 between text elements

### Component Structure

```
app/components/
├── hero.tsx              # Main hero component
└── __tests__/
    └── hero.test.tsx     # 12 TDD tests
```

### Test Coverage
- Content rendering (name, title, bio, section container)
- CTA links (2 links present)
- 3D element (canvas or fallback)
- Scroll indicator (renders + animation class)
- Accessibility (h1 heading, focus states)
- Spacing (Ma principle classes)

### Files Created/Modified
- `app/components/hero.tsx` - Hero component
- `app/components/__tests__/hero.test.tsx` - TDD tests
- `app/globals.css` - Rose Pine color variables + animations
- `app/page.tsx` - Integrated Hero component
- `types/portfolio.ts` - Type definitions for data files
- `vitest.config.ts` - Added path alias resolution

### QA Evidence
- `.sisyphus/evidence/task-6-hero-content.txt` - Content verification
- `.sisyphus/evidence/task-6-responsive-{size}.png` - Screenshots at 320px, 768px, 1024px, 1440px

### Issues Resolved
1. **Vitest path alias** - Added resolve.alias to vitest.config.ts for `@/` imports
2. **Type definitions** - Created types/portfolio.ts with all required interfaces
3. **Zod dependency** - Added to production dependencies (not dev)
4. **R3F mock in tests** - Mocked Canvas, Float, MeshDistortMaterial for jsdom

---

## Task 12: Education Section (2026-03-04)

### Overall Status
✅ Education component built with TDD approach
✅ All 7 tests passing

### Key Learnings

1. **Component Structure**
   - Simple card layout with degree, institution, location, highlights
   - Uses motion library for staggered entrance animations
   - Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop
   - Max 3 items displayed (enforced with `.slice(0, 3)`)

2. **Rose Pine Color Integration**
   - Uses Tailwind theme colors from globals.css
   - `text-foreground`, `text-muted-foreground`, `bg-card`, `border-border`
   - `bg-primary/10` for icon background with opacity
   - `text-primary` for icon color, `text-accent` for checkmarks

3. **Motion Library Usage**
   - Import: `import { motion } from "motion/react"`
   - Used `motion.h2` for title with fade-in animation
   - Used `motion.div` for cards with staggered delays (`index * 0.1`)
   - Animation config: `initial`, `animate`, `transition`

4. **Design Decisions**
   - Academic cap icon (graduation cap SVG) for visual interest
   - Location pin icon for location display
   - Checkmark icons for highlights
   - Card hover effect: `hover:border-accent transition-colors duration-200`
   - Clean hierarchy: icon → degree → institution → location → highlights

5. **Test Patterns**
   - 7 tests covering: section render, degree display, institution display, highlights display, card count, max 3 limit, responsive grid
   - Uses `data-testid` attributes for reliable element selection
   - `screen.getByText()` with regex for flexible text matching
   - `container.querySelector()` for CSS class verification

### Files Created
- `/folio-work/portfolio/app/components/education.tsx` - Component
- `/folio-work/portfolio/app/components/education.test.tsx` - Tests

### Component Features
- Loads data from `@/data/education.json`
- Type-safe with `Education` type from `@/types/portfolio`
- Icons: graduation cap, location pin, checkmark
- Hover states on cards
- Staggered entrance animations
- Responsive layout

### Anti-Patterns Avoided
- No unnecessary comments (code is self-documenting)
- No complex animations beyond simple card layout
- No education editing functionality
- Strictly limited to max 3 items as specified


---

## Task 13: Contact Section (2026-03-04)

### Overall Status
✅ Contact section complete with TDD tests passing (16/16)
✅ Email link with mailto: protocol
✅ Social links (GitHub, LinkedIn) with target="_blank" and rel="noopener noreferrer"
✅ Resume link (conditional - hidden when resumeUrl is placeholder "/")
✅ Rose Pine color theme applied
✅ Japanese Ma principle (generous spacing) implemented
✅ All accessibility requirements met

### Key Technical Decisions

1. **Motion Library Integration**
   - Use `motion` package from `motion/react`
   - `whileInView` with `viewport={{ once: true }}` for scroll-triggered animations
   - Staggered fade-in effects: delay 0.2s (heading), 0.4s (description), 0.6s (links)
   - Fixed: Added IntersectionObserver mock to test-utils.tsx to resolve jsdom incompatibility

2. **IntersectionObserver Mock**
   - Issue: jsdom doesn't support IntersectionObserver by default
   - Solution: Added MockIntersectionObserver class to lib/test-utils.tsx
   - Required for Motion's `whileInView` feature in test environment
   - Pattern: mock observe, disconnect, unobserve methods with vi.fn()

3. **Rose Pine Color Variables**
   - Email CTA: --iris (accent color) with --base text
   - Social links: --surface background with --iris accent and --subtle border
   - Resume link: Transparent with --subtle border and text (when active)
   - Consistent focus ring: --tw-ring-color matches accent color

4. **Link Accessibility**
   - Email: mailto: protocol (no target/rel needed)
   - Socials: target="_blank" + rel="noopener noreferrer" (security best practice)
   - Resume: target="_blank" + rel="noopener noreferrer" (external link)
   - Aria labels: social links have proper aria-label attributes
   - Focus states: all links have focus:ring-2 focus:ring-offset-2

### Data Loading
- Email from: profile.json.email ("brianmalcolm.v@gmail.com")
- GitHub from: socials.json[0].url ("https://github.com/brimalval")
- LinkedIn from: socials.json[1].url ("https://www.linkedin.com/in/brian-malcolm-valencia-032752220")
- Resume: profile.json.resumeUrl (currently "/" - placeholder, so link hidden)

### Component Structure
```
app/components/
├── contact.tsx              # Main contact component
└── __tests__/
    └── contact.test.tsx     # 16 TDD tests
```

### Test Coverage
- Content rendering (heading, description, section container)
- Email link (mailto: protocol, email address display, icon present)
- Social links (GitHub & LinkedIn with proper attributes)
- Resume link (hidden when resumeUrl is placeholder "/")
- Accessibility (h2 heading, focus states, aria labels)
- Visual attributes (spacing, centered layout)

### Files Created/Modified
- `app/components/contact.tsx` - Contact component (164 lines)
- `app/components/__tests__/contact.test.tsx` - TDD tests (126 lines)
- `lib/test-utils.tsx` - Added IntersectionObserver mock

### Key Learnings

1. **Motion + jsdom Testing**
   - `whileInView` triggers IntersectionObserver in test environment
   - Must mock IntersectionObserver in test setup
   - Mock implementation minimal: observe, disconnect, unobserve methods
   - Works with Vitest's vi.fn() for method tracking

2. **Conditional Resume Link**
   - Respects resumeUrl placeholder "/" (link hidden)
   - Will automatically appear when user provides actual resume URL
   - No code changes needed after resume URL update

3. **Social Icons**
   - Inline SVG paths for GitHub and LinkedIn
   - No external icon library dependencies
   - Scalable via width/height props
   - Consistent visual style with Rose Pine colors

4. **Button Variants**
   - Email: Primary CTA (filled background, prominent)
   - Socials: Icon buttons (circular, hover scale)
   - Resume: Secondary link (outlined, subtle)
   - All share same focus ring behavior

### QA Verification
- ✅ Email link: mailto:brianmalcolm.v@gmail.com
- ✅ GitHub link: https://github.com/brimalval (target="_blank", rel="noopener noreferrer")
- ✅ LinkedIn link: https://www.linkedin.com/in/brian-malcolm-valencia-032752220 (target="_blank", rel="noopener noreferrer")
- ✅ All tests passing (16/16)
- ✅ Build succeeds with no TypeScript errors

### Issues Resolved
1. **IntersectionObserver not defined** - Added MockIntersectionObserver to test-utils.tsx
2. **Import typo** - Fixed 'viest' → 'vitest' in test-utils.tsx
3. **Direct tsc errors** - Not applicable; build process uses proper tsconfig.json

### Next Steps
- Contact section ready for integration
- Awaiting resume URL from user to activate resume download link

---

## Task 11: Experience Timeline (2026-03-04)

### Overall Status
✅ Experience Timeline component built with TDD approach
✅ All 14 tests passing
✅ Build succeeds

### Key Learnings

1. **Motion Library for Scroll Reveal**
   - Import: `import { motion } from 'motion/react'`
   - Use `whileInView` for scroll-triggered animations
   - `viewport={{ once: true, margin: '-100px' }}` triggers animation before element fully visible
   - Stagger delays: `delay: index * 0.1` for sequential reveal
   - Custom easing: `ease: [0.25, 0.46, 0.45, 0.94]`

2. **Vertical Timeline Layout**
   - Left border line using absolute positioning + gradient
   - Timeline dots: `absolute left-0 top-2 w-3 h-3 rounded-full`
   - Ring effect: `ring-4 ring-[var(--accent)]/20`
   - Gradient connector: `bg-gradient-to-b from-[var(--accent)]/50 to-transparent`

3. **JSON Data Import Pattern**
   - Direct import: `import data from '@/data/file.json'`
   - Type assertion: `const typed = data as Type[]`
   - Matches existing pattern in lib/async-data.ts

4. **Rose Pine CSS Variables**
   - `var(--fg)` - primary text
   - `var(--accent)` - accent/highlight color
   - `var(--muted)` - muted/secondary text
   - `var(--surface)` - background surface
   - `var(--border)` - border color
   - `var(--base)` - section background

5. **Responsive Design**
   - Mobile: Single column, stacked layout
   - Tablet+: `sm:flex-row` for date/location positioning
   - `sm:items-end` for right-aligned metadata

### Component Structure
```
Experience (section)
├── motion.h2 (title with fade-in)
└── Timeline container
    └── ExperienceItem[] (max 3)
        ├── Timeline dot + connector
        └── Content card
            ├── Position + Company
            ├── Date + Location
            ├── Description
            └── Technology tags
```

### Test Patterns
- 14 tests covering all requirements
- Uses `data-testid` for reliable selection
- `getAllByText` for elements that appear multiple times (technology tags)
- Tests verify: items render, dates show, scroll animation present

### Files Created
- `/folio-work/portfolio/app/components/experience.tsx` - Component (114 lines)
- `/folio-work/portfolio/app/components/experience.test.tsx` - Tests (99 lines)

### Anti-Patterns Avoided
- No unnecessary comments
- No complex animations beyond scroll reveal
- No timeline editing functionality
- Strictly limited to max 3 items

---

## Task 7: Hero Section with 3D Accent (2026-03-04)

### Overall Status
✅ Hero component completed with all required features
✅ All tests passing (10/10)
✅ Responsive design implemented
✅ 3D floating shape with WebGL fallback

### Key Learnings

1. **Vitest Configuration for Path Aliases**
   - Must add path alias resolution to `vitest.config.ts`
   - Use `path.resolve(__dirname, './')` for `@` alias
   - Without this, imports like `@/data/profile.json` fail

2. **Testing React Three Fiber Components**
   - jsdom doesn't support WebGL or ResizeObserver
   - Must mock both in `vitest.setup.ts`
   - ResizeObserver polyfill: Simple class with empty methods
   - WebGL mock: Extensive mock of canvas.getContext('webgl')

3. **Motion Library (formerly Framer Motion)**
   - Import from `motion/react` (not `framer-motion`)
   - React 19 compatible (no forwardRef needed)
   - Staggered animations with `delay` prop
   - Infinite animations with `transition: { repeat: Infinity }`

4. **React Three Fiber with Next.js**
   - Use dynamic import with `ssr: false` for Canvas (optional, but can help)
   - Canvas with `gl={{ antialias: true, alpha: true }}` for transparency
   - Float component from drei for floating animations
   - Wireframe materials with transparency work well

5. **Responsive Design Pattern**
   - Use Tailwind responsive prefixes: `md:`, `lg:`, `xl:`
   - Mobile-first approach (base styles for 320px)
   - Progressive enhancement with larger breakpoints
   - Japanese Ma principle: Generous spacing with `space-y-*` and padding

6. **Theme Integration**
   - Use CSS variables for all colors: `var(--color-text)`
   - Allows seamless theme switching
   - Rose Pine colors defined in `globals.css`
   - Both light (dawn) and dark (pine) themes supported

7. **WebGL Fallback Strategy**
   - Check WebGL support with `canvas.getContext('webgl')`
   - Use `useState` with `useEffect` for client-side detection
   - Render CSS gradient when WebGL unavailable
   - Provides graceful degradation

8. **Next.js Turbopack Configuration**
   - May need to set `turbopack.root` in `next.config.ts`
   - Use `__dirname` to reference project root
   - Fixes "Next.js package not found" errors

### Component Structure

```
app/components/
├── hero.tsx          # Main hero component
└── hero.test.tsx     # TDD tests (10 tests)
```

### Dependencies Used

- `motion` - Animation library (React 19 compatible)
- `@react-three/fiber` - React renderer for Three.js
- `@react-three/drei` - Useful helpers for R3F
- `three` - 3D library

### Test Infrastructure

```typescript
// vitest.setup.ts additions
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserverMock

HTMLCanvasElement.prototype.getContext = /* extensive WebGL mock */
```

### Animation Pattern

```typescript
// Staggered fade-in with delays
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
>
```

### 3D Component Pattern

```typescript
<Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
  <ambientLight intensity={0.5} />
  <pointLight position={[10, 10, 10]} />
  <Suspense fallback={null}>
    <Float speed={2} rotationIntensity={1}>
      <mesh>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#c4a7e7" wireframe transparent opacity={0.6} />
      </mesh>
    </Float>
  </Suspense>
</Canvas>
```

### Evidence File
`.sisyphus/evidence/task-7-hero-responsive-design.md` - Complete responsive design documentation

### Next Steps
- Hero component ready for integration
- All tests passing
- Responsive at all breakpoints
- 3D element working with fallback
