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
