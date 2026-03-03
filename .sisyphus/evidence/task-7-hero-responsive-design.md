# Hero Component - Responsive Design Evidence

## Date: 2026-03-04
## Task: Build Hero Section with 3D Accent

### Responsive Breakpoints

The hero component implements responsive design using Tailwind CSS classes across the following breakpoints:

#### 1. **320px - Mobile (Default)**
- Padding: `px-8 py-24` (horizontal: 2rem, vertical: 6rem)
- Typography: `text-5xl` for name, `text-2xl` for title, `text-lg` for bio
- Spacing: `space-y-8` between elements
- CTA buttons: Stack vertically (`flex-col`)
- Container: `max-w-4xl`

#### 2. **768px - Tablet (md:)**
- Padding: `md:px-16 md:py-32` (horizontal: 4rem, vertical: 8rem)
- Typography: `md:text-6xl` for name, `md:text-3xl` for title, `md:text-xl` for bio
- Spacing: `md:space-y-12` between elements
- CTA buttons: Row layout (`sm:flex-row` at 640px)

#### 3. **1024px - Desktop (lg:)**
- Padding: `lg:px-24 lg:py-40` (horizontal: 6rem, vertical: 10rem)
- Typography: `lg:text-7xl` for name, `lg:text-4xl` for title, `lg:text-2xl` for bio
- Spacing: `lg:space-y-16` between elements

#### 4. **1440px+ - Large Desktop (xl:)**
- Typography: `xl:text-8xl` for name
- All other settings inherit from lg: breakpoint

### Japanese Ma Principle Implementation

The component applies generous spacing using the Japanese Ma principle:

1. **Vertical Spacing (space-y)**
   - Mobile: `space-y-8` (2rem / 32px)
   - Tablet: `md:space-y-12` (3rem / 48px)
   - Desktop: `lg:space-y-16` (4rem / 64px)

2. **Section Padding**
   - Mobile: `px-8 py-24` (2rem horizontal, 6rem vertical)
   - Tablet: `md:px-16 md:py-32` (4rem horizontal, 8rem vertical)
   - Desktop: `lg:px-24 lg:py-40` (6rem horizontal, 10rem vertical)
   - Large: `xl:px-32` (8rem horizontal)

3. **Content Width**
   - Maximum width: `max-w-4xl` (896px)
   - Centered: `mx-auto`

### Rose Pine Color Scheme

Colors are applied via CSS variables for theme support:

- **Primary Text**: `var(--color-text)` - Rose Pine text color
- **Title Accent**: `var(--color-iris)` - Rose Pine iris accent
- **Subtle Text**: `var(--color-subtle)` - Rose Pine subtle
- **Background**: `var(--color-base)` - Applied via section background
- **CTA Buttons**: 
  - Primary: `var(--color-iris)` background with `var(--color-base)` text
  - Secondary: `var(--color-iris)` border and text

### 3D Element

- **WebGL Canvas**: Renders floating icosahedron when WebGL is supported
- **Fallback**: CSS gradient mesh when WebGL is disabled
- **Positioning**: Absolute positioned behind content with `-z-10`

### Motion/React Animations

All elements use staggered fade-in animations:

1. **Hero Content Container**
   - Initial: `opacity: 0, y: 30`
   - Animate: `opacity: 1, y: 0`
   - Duration: `0.8s`

2. **Name (h1)**
   - Delay: `0.2s`
   - Initial: `opacity: 0, y: 20`

3. **Title (h2)**
   - Delay: `0.4s`

4. **Bio (p)**
   - Delay: `0.6s`

5. **CTA Buttons**
   - Delay: `0.8s`

6. **Scroll Indicator**
   - Delay: `1s`
   - Additional bounce animation on scroll dot

### Scroll Indicator

- Position: Bottom center (`bottom-8 left-1/2 -translate-x-1/2`)
- Animation: Infinite bounce (`y: [0, 8, 0]`)
- Duration: `1.5s`
- Visual: Border circle with animated dot

### Test Coverage

All 10 tests passing:
✅ Renders hero section with correct data-testid
✅ Renders name from profile data
✅ Renders title from profile data
✅ Renders bio from profile data
✅ Renders CTA buttons
✅ Renders scroll indicator
✅ Renders 3D canvas element or gradient fallback
✅ Applies motion fade-in animation on load
✅ Uses Rose Pine color scheme
✅ Applies generous spacing (Japanese Ma principle)

### Build Status

- TypeScript: No errors
- Tests: 10/10 passing
- Dev Server: Running successfully
- Content: Verified rendering "Brian Valencia"

### Verification

```bash
curl -s http://localhost:3000 | grep -c "Brian Valencia"
# Output: 1 ✅

pnpm test app/components/hero.test.tsx
# Output: 10 passed ✅
```
