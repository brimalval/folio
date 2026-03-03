# Portfolio Website Build - Japanese-Inspired Design

## TL;DR

> **Quick Summary**: Build a single-page portfolio website with Japanese-inspired minimalist design, Rose Pine auto-switching color palette, moderate animations using Motion library, and subtle 3D accents with React Three Fiber.
>
> **Deliverables**:
> - Fully responsive single-page portfolio with 6 sections (Hero, Projects, Skills, Experience, Education, Contact)
> - Auto-switching Rose Pine theme (Dawn for light, Pine for dark) with manual toggle
> - Moderate scroll-triggered animations and hover effects
> - Subtle 3D floating geometric element in hero section
> - TDD implementation with unit tests for all interactive components
> - Lighthouse scores 90+ across all categories
>
> **Estimated Effort**: Medium
> **Parallel Execution**: YES - 5 waves
> **Critical Path**: Validation → Setup → Core Sections → Polish → QA

---

## Context

### Original Request
Build a portfolio website with:
- Japanese-inspired clean design (Ma, Wabi-Sabi, Shibui principles)
- Rose Pine color palette with auto light/dark switching
- At least minimal animations (3D or otherwise)
- Data from existing `data/` and `lib/` directories (can be modified)
- Simple, clean aesthetic

### Interview Summary

**Key Discussions**:
- **Color Theme**: Auto-switch between Rose Pine Dawn (light) and Rose Pine Pine (dark) + manual toggle
- **Animation Style**: Moderate & Engaging - scroll reveals, card lifts, staggered lists
- **3D Elements**: Subtle 3D accent using React Three Fiber (floating geometric shape in hero section)
- **Layout**: Single-page scroll with smooth navigation
- **Typography**: Inter (Latin) + Noto Sans JP (Japanese) - modern clean sans-serif
- **Sections**: Hero, Featured Projects (3), Skills Showcase, Experience Timeline, Education, Contact
- **Features**: Theme toggle, smooth scroll navigation, resume download (external link)
- **Performance**: Balanced approach (performance + visual appeal)
- **Testing**: TDD with Jest/Vitest + React Testing Library

**Research Findings**:
- **Rose Pine**: WCAG AAA accessible, excellent contrast ratios, three variants available
- **Motion Library**: Best for React portfolios (120fps, GPU-accelerated, declarative API)
- **Japanese Design**: Ma (generous space), Wabi-Sabi (organic imperfection), Shibui (understated elegance)
- **React Three Fiber**: Declarative Three.js for React, keep minimal for performance
- **Typography**: Inter + Noto Sans JP is perfect multilingual pairing for tech portfolios

### Metis Review

**Identified Gaps** (addressed):
1. **React 19 Compatibility**: Need to verify Motion library and R3F work with React 19 before implementation
2. **Content Assets**: Resume will use external link (user confirmed), project images accessible via S3
3. **3D Specifics**: Floating geometric shape in hero section next to title (user confirmed)
4. **Mobile Navigation**: Hamburger menu with slide-out drawer (standard for single-page scroll)
5. **Edge Cases**: Handle empty data states, WebGL fallback (CSS gradient), image load failures
6. **Performance Budgets**: Set explicit Lighthouse targets (90+ all categories)

**Guardrails Applied**:
- **MUST NOT**: Backend API, contact form with email sending, CMS, blog, project filtering, multiple 3D scenes, parallax scrolling, page transitions, E2E tests
- **MUST**: Single-page layout, exactly 6 sections, Rose Pine theme, theme toggle, prefers-reduced-motion respect, mobile responsive, 3 projects max, TDD approach, use appropriate skills such as ui-ux-pro-max, frontend-design, web-design-guidelines, among others

---

## Work Objectives

### Core Objective
Create a production-ready, visually striking portfolio website that showcases professional work through Japanese-inspired minimalist design with modern web technologies and optimal performance.

### Concrete Deliverables
- Single-page portfolio at `/` route
- 6 sections: Hero, Projects, Skills, Experience, Education, Contact
- Theme system with auto-switching + manual toggle
- Scroll-triggered animations on all sections
- 3D floating geometric element in hero
- Unit tests for all interactive components
- Mobile-responsive design (320px to 2560px+)
- Lighthouse scores 90+ (Performance, Accessibility, Best Practices, SEO)

### Definition of Done
- [ ] All 6 sections render with data from JSON files
- [ ] Theme auto-switches based on system preference
- [ ] Theme toggle persists preference in localStorage
- [ ] All animations respect prefers-reduced-motion
- [ ] All interactive components have unit tests
- [ ] No horizontal overflow at any viewport width
- [ ] All Lighthouse scores >= 90
- [ ] Bundle size < 200KB gzipped
- [ ] All navigation links scroll to correct sections

### Must Have
- ✅ Single-page scroll layout
- ✅ Rose Pine Dawn + Pine variants with auto-switch
- ✅ Manual theme toggle with localStorage persistence
- ✅ 6 sections with data from JSON files
- ✅ Scroll-triggered animations (scroll reveal, stagger)
- ✅ Hover animations (card lift, button scale)
- ✅ 3D floating geometric element in hero (with CSS fallback)
- ✅ Mobile-responsive navigation
- ✅ Resume download functionality
- ✅ prefers-reduced-motion support
- ✅ Unit tests for interactive components
- ✅ Lighthouse 90+ scores

### Must NOT Have (Guardrails)
- ❌ Backend API or serverless functions
- ❌ Contact form with email sending (mailto link only)
- ❌ CMS or admin dashboard
- ❌ Blog or writing section
- ❌ Project filtering/search functionality
- ❌ Multiple 3D scenes (ONE subtle accent only)
- ❌ Complex 3D interactions (no click/drag, just floating)
- ❌ Parallax scrolling effects
- ❌ Page transitions between sections
- ❌ E2E tests with Playwright/Cypress
- ❌ Visual regression tests
- ❌ Analytics integration
- ❌ More than 3 featured projects

---

## Verification Strategy (MANDATORY)

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.
> Acceptance criteria requiring "user manually tests/confirms" are FORBIDDEN.

### Test Decision
- **Infrastructure exists**: NO (needs setup)
- **Automated tests**: TDD (Tests-Driven Development)
- **Framework**: Vitest + React Testing Library
- **TDD Approach**: Each task follows RED (failing test) → GREEN (minimal impl) → REFACTOR

### QA Policy
Every task MUST include agent-executed QA scenarios (see TODO template below).
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Frontend/UI**: Use Playwright (playwright skill) — Navigate, interact, assert DOM, screenshot
- **API/Backend**: Use Bash (curl) — Send requests, assert status + response fields
- **Library/Module**: Use Bash (bun/node REPL) — Import, call functions, compare output

### Performance Budgets
- **Lighthouse Performance**: >= 90
- **Lighthouse Accessibility**: >= 90
- **Lighthouse Best Practices**: >= 90
- **Lighthouse SEO**: >= 90
- **Bundle Size**: < 200KB gzipped
- **First Contentful Paint (FCP)**: < 1.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 3.0s

---

## Execution Strategy

### Parallel Execution Waves

> Maximize throughput by grouping independent tasks into parallel waves.
> Each wave completes before the next begins.
> Target: 5-8 tasks per wave. Fewer than 3 per wave (except final) = under-splitting.

```
Wave 1 (Start Immediately — validation + confirmation):
├── Task 1: Validate React 19 + Motion/R3F compatibility [quick]
└── Task 2: Confirm content assets (resume, images) [quick]

Wave 2 (After Wave 1 — foundation setup):
├── Task 3: Project setup & configuration [quick]
├── Task 4: Define Rose Pine theme system [quick]
└── Task 5: Set up testing infrastructure [quick]

Wave 3 (After Wave 2 — core sections, MAX PARALLEL):
├── Task 6: Build Hero Section with 3D accent [visual-engineering]
├── Task 7: Build Navigation Component [visual-engineering]
├── Task 8: Build Theme Toggle Component [quick]
├── Task 9: Build Projects Section [visual-engineering]
├── Task 10: Build Skills Section [visual-engineering]
├── Task 11: Build Experience Timeline [visual-engineering]
├── Task 12: Build Education Section [visual-engineering]
└── Task 13: Build Contact Section [quick]

Wave 4 (After Wave 3 — polish + optimization):
├── Task 14: Implement scroll reveal animations [visual-engineering]
├── Task 15: Mobile responsive implementation [visual-engineering]
└── Task 16: Performance optimization [quick]

Wave 5 (After Wave 4 — final QA):
├── Task 17: Cross-browser testing [quick]
├── Task 18: Accessibility audit [quick]
└── Task 19: Final Lighthouse audit [quick]

Wave FINAL (After ALL tasks — independent review, 4 parallel):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA (unspecified-high)
└── Task F4: Scope fidelity check (deep)

Critical Path: Task 1 → Task 3 → Task 4 → Task 6 → Task 14 → Task 16 → Task 19 → F1-F4
Parallel Speedup: ~65% faster than sequential
Max Concurrent: 8 (Wave 3)
```

### Dependency Matrix

- **1-2**: — — 3, 0
- **3**: 1 — 4-5, 1
- **4**: 3 — 6-13, 2
- **5**: 3 — 6-13, 2
- **6-13**: 4, 5, (6:2) — 14-16, 3
- **14**: 6-13 — 17-19, 4
- **15**: 6-13 — 17-19, 4
- **16**: 6-13, 14 — 17-19, 5
- **17**: 14-16 — 19, 6
- **18**: 14-16 — 19, 6
- **19**: 16-18 — F1-F4, 7
- **F1-F4**: 19 — — 8

### Agent Dispatch Summary

- **1**: **2** — T1-T2 → `quick`
- **2**: **3** — T3 → `quick`, T4 → `quick`, T5 → `quick`
- **3**: **8** — T6 → `visual-engineering`, T7 → `visual-engineering`, T8 → `quick`, T9 → `visual-engineering`, T10 → `visual-engineering`, T11 → `visual-engineering`, T12 → `visual-engineering`, T13 → `quick`
- **4**: **3** — T14 → `visual-engineering`, T15 → `visual-engineering`, T16 → `quick`
- **5**: **3** — T17 → `quick`, T18 → `quick`, T19 → `quick`
- **FINAL**: **4** — F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high`, F4 → `deep`

---

## TODOs

> Implementation + Test = ONE Task. Never separate.
> EVERY task MUST have: Recommended Agent Profile + Parallelization info + QA Scenarios.
> **A task WITHOUT QA Scenarios is INCOMPLETE. No exceptions.**

### Wave 1: Validation & Confirmation (2 tasks, parallel)

- [x] 1. **Validate React 19 + Motion/R3F Compatibility**

  **What to do**:
  - Search GitHub for Motion library usage with React 19
  - Verify @react-three/fiber has React 19 support
  - Check Tailwind CSS v4 setup patterns
  - Document any compatibility issues or workarounds
  
  **Must NOT do**:
  - Install any packages (validation only)
  - Modify any files
  - Proceed if critical incompatibilities found

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Research and validation task, no implementation
  - **Skills**: []
    - No special skills needed for research
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: Not building UI, just researching

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Task 2)
  - **Blocks**: Task 3 (setup depends on compatibility confirmation)
  - **Blocked By**: None (can start immediately)

  **References** (CRITICAL - Be Exhaustive):
  **External References**:
    - Motion library: https://motion.dev/docs - Official documentation
    - React Three Fiber: https://docs.pmnd.rs/react-three-fiber - Official docs
    - GitHub search: Use `grep_app_searchGitHub` with query "motion react 19" and "@react-three/fiber react 19"
  
  **WHY Each Reference Matters**:
    - Motion docs: Verify React 19 is listed as supported
    - R3F docs: Check peer dependencies for React version
    - GitHub search: Find real-world usage examples with React 19

  **Acceptance Criteria**:
  - [x] Motion library confirmed compatible with React 19 (or workaround documented)
  - [x] React Three Fiber confirmed compatible with React 19 (or workaround documented)
  - [x] Tailwind CSS v4 setup patterns documented
  - [x] Report saved to `.sisyphus/evidence/task-1-compatibility-report.md`

  **QA Scenarios (MANDATORY)**:
  ```
  Scenario: Motion library React 19 compatibility verification
    Tool: grep_app_searchGitHub
    Preconditions: Access to GitHub search API
    Steps:
      1. Search for "motion react 19" with language=["TypeScript", "TSX"]
      2. Analyze package.json files for React 19 + Motion co-installation
      3. Check issues/discussions for React 19 compatibility mentions
    Expected Result: At least 3 working examples found, or documented workaround
    Failure Indicators: No examples found, open issues about React 19 incompatibility
    Evidence: .sisyphus/evidence/task-1-motion-compat.md
  
  Scenario: React Three Fiber React 19 compatibility verification
    Tool: grep_app_searchGitHub
    Preconditions: Access to GitHub search API
    Steps:
      1. Search for "@react-three/fiber react 19" with language=["TypeScript", "TSX"]
      2. Check package.json for peer dependency declarations
      3. Look for React 19 in @react-three/fiber changelog/issues
    Expected Result: React 19 listed in peerDependencies, or working examples found
    Failure Indicators: React 19 not in peerDeps, open compatibility issues
    Evidence: .sisyphus/evidence/task-1-r3f-compat.md
  ```

  **Commit**: NO (documentation only)

- [x] 2. **Confirm Content Assets**

  **What to do**:
  - Ask user about resume PDF availability
  - Confirm project images are ready in S3 or need preparation
  - Verify profile.json content is final (not placeholder)
  - Document asset status and any placeholders needed
  
  **Must NOT do**:
  - Proceed without user confirmation
  - Assume assets exist without verification
  - Create placeholder assets without user approval

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple confirmation task, requires user interaction
  - **Skills**: []
    - No special skills needed
  - **Skills Evaluated but Omitted**:
    - All skills: This is a user communication task

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Task 1)
  - **Blocks**: Tasks 6, 9, 13 (need assets for hero, projects, contact)
  - **Blocked By**: None (can start immediately)

  **References** (CRITICAL - Be Exhaustive):
  **Pattern References**:
    - `data/profile.json:1-14` - Current profile data structure
    - `data/projects.json:31-50` - Project gallery structure showing S3 URLs
  
  **WHY Each Reference Matters**:
    - profile.json: Verify which fields are populated vs placeholder
    - projects.json: Check if image URLs are working S3 links

  **Acceptance Criteria**:
  - [x] User confirms resume PDF status (exists/needs creation/external link)
  - [x] User confirms project images are accessible at S3 URLs
  - [x] User confirms profile.json content is final
  - [x] Asset status documented in `.sisyphus/evidence/task-2-assets-status.md`

  **QA Scenarios (MANDATORY)**:
  ```
  Scenario: Resume PDF availability confirmation
    Tool: Question tool
    Preconditions: User available to respond
    Steps:
      1. Ask user: "Do you have a resume PDF ready to include?"
      2. If yes: Confirm file location or upload process
      3. If no: Ask if should generate from profile.json or use external link
    Expected Result: Clear answer with specific action plan
    Failure Indicators: No response, ambiguous answer
    Evidence: .sisyphus/evidence/task-2-resume-status.md
  
  Scenario: Project images accessibility check
    Tool: Bash (curl)
    Preconditions: S3 URLs in projects.json
    Steps:
      1. curl -I https://brimalval-public-site-assets.s3.ap-southeast-1.amazonaws.com/folio/OMNI_Gallery/1.png
      2. Verify HTTP 200 status
      3. Repeat for all gallery images
    Expected Result: All URLs return HTTP 200
    Failure Indicators: HTTP 404 or 403 errors
    Evidence: .sisyphus/evidence/task-2-images-check.txt
  ```

  **Commit**: NO (documentation only)

### Wave 2: Foundation Setup (3 tasks, sequential then parallel)

- [ ] 3. **Project Setup & Configuration**

  **What to do**:
  - Initialize Next.js 16.1.6 with App Router, React 19, TypeScript
  - Install dependencies: motion, three, @react-three/fiber, @react-three/drei
  - Install dev dependencies: vitest, @testing-library/react, @testing-library/jest-dom
  - Configure Tailwind CSS v4 with PostCSS
  - Set up package.json scripts (dev, build, test, lint)
  - Create basic app structure (app/page.tsx, app/layout.tsx)
  - Set up Git hooks for pre-commit (lint + test)
  
  **Must NOT do**:
  - Install any packages not listed in requirements
  - Configure features beyond basic setup
  - Create any components (setup only)
  - Modify existing data files

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Standard project initialization, well-documented process
  - **Skills**: [`vercel-react-best-practices`]
    - `vercel-react-best-practices`: Ensures Next.js 16 + React 19 setup follows Vercel guidelines
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: No UI being built yet

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential (blocks Wave 2 tasks)
  - **Blocks**: Tasks 4, 5 (need project structure)
  - **Blocked By**: Task 1 (compatibility verification)

  **References** (CRITICAL - Be Exhaustive):
  **Pattern References**:
  - `package.json:1-34` - Current package structure, dependencies
  - `tsconfig.json` - TypeScript configuration
  - `app/layout.tsx:1-34` - Existing layout structure
  
  **API/Type References**:
  - `lib/data.ts:1-217` - Existing data loading patterns to preserve
  
  **External References**:
  - Next.js docs: https://nextjs.org/docs/app/building-your-application/upgrading
  - Motion installation: https://motion.dev/docs/installation
  - Vitest setup: https://vitest.dev/guide/
  
  **WHY Each Reference Matters**:
  - package.json: Preserve existing Next.js version, add new dependencies
  - tsconfig.json: Ensure TypeScript config works with React 19
  - app/layout.tsx: Preserve existing font setup (Geist)
  - lib/data.ts: Don't break existing data loading during setup

  **Acceptance Criteria**:
  - [ ] Next.js 16.1.6 with React 19 successfully installed
  - [ ] All dependencies installed: motion, three, @react-three/fiber, @react-three/drei
  - [ ] All dev dependencies installed: vitest, @testing-library/react, @testing-library/jest-dom
  - [ ] Tailwind CSS v4 configured with PostCSS
  - [ ] `npm run dev` starts development server successfully
  - [ ] `npm run test` runs Vitest successfully (even if no tests yet)
  - [ ] `npm run build` completes without errors
  - [ ] Git pre-commit hooks configured

  **QA Scenarios (MANDATORY)**:
  ```
  Scenario: Development server starts successfully
    Tool: Bash
    Preconditions: All dependencies installed
    Steps:
      1. npm run dev
      2. Wait 10 seconds for server startup
      3. curl -s http://localhost:3000 | grep -c "<!DOCTYPE html>"
    Expected Result: Count > 0, server responds with HTML
    Failure Indicators: Server fails to start, port conflicts, missing dependencies
    Evidence: .sisyphus/evidence/task-3-dev-server.txt
  
  Scenario: Test infrastructure works
    Tool: Bash
    Preconditions: Vitest installed
    Steps:
      1. Create temporary test file: echo 'test("example", () => expect(1).toBe(1))' > temp.test.ts
      2. npm run test
      3. rm temp.test.ts
    Expected Result: Test runs and passes, exit code 0
    Failure Indicators: Vitest fails to run, configuration errors
    Evidence: .sisyphus/evidence/task-3-test-infra.txt
  
  Scenario: Build completes successfully
    Tool: Bash
    Preconditions: All files present
    Steps:
      1. npm run build
      2. ls -la .next/
    Expected Result: .next directory created, no build errors
    Failure Indicators: TypeScript errors, missing dependencies, build failures
    Evidence: .sisyphus/evidence/task-3-build-success.txt
  ```

  **Commit**: YES
  - Message: `chore: initialize project with Next.js 16, React 19, Motion, R3F, Vitest`
  - Files: package.json, package-lock.json, vitest.config.ts, tsconfig.json
  - Pre-commit: `npm run lint && npm run test`

- [ ] 4. **Define Rose Pine Theme System**

  **What to do**:
  - Create Tailwind v4 config with Rose Pine Dawn and Pine palettes
  - Set up CSS custom properties for both variants
  - Implement theme detection with prefers-color-scheme
  - Create theme toggle logic with localStorage persistence
  - Add theme utility functions (getTheme, setTheme, detectSystemTheme)
  - Write unit tests for theme utilities (TDD: write tests first)
  
  **Must NOT do**:
  - Create theme toggle UI component (Task 8)
  - Add third variant (Moon) unless requested
  - Over-engineer theme system beyond basic toggle
  - Hardcode hex values (use CSS variables)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Configuration and utility functions, well-defined scope
  - **Skills**: [`tailwind-design-system`]
    - `tailwind-design-system`: Ensures proper Tailwind v4 + design token setup
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: No UI component yet

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 5)
  - **Parallel Group**: Wave 2 (with Task 5)
  - **Blocks**: Tasks 6-13 (all sections need theme)
  - **Blocked By**: Task 3 (project setup)

  **References** (CRITICAL - Be Exhaustive):
  **Pattern References**:
  - `app/globals.css:1-26` - Existing CSS structure with custom properties
  
  **External References**:
  - Rose Pine palette: https://rosepinetheme.com/palette/ingredients/
  - Rose Pine Tailwind: https://github.com/rose-pine/palette
  - Tailwind v4 docs: https://tailwindcss.com/docs/v4-beta
  
  **WHY Each Reference Matters**:
  - globals.css: Extend existing CSS custom properties pattern
  - Rose Pine palette: Official color hex values for Dawn and Pine variants
  - Rose Pine Tailwind: Integration examples for Tailwind
  - Tailwind v4 docs: Ensure correct v4 syntax (different from v3)

  **Acceptance Criteria**:
  - [ ] TDD: Tests for theme utilities written first (getTheme, setTheme, detectSystemTheme)
  - [ ] All theme utility tests pass
  - [ ] Tailwind config includes Rose Pine Dawn and Pine color palettes
  - [ ] CSS custom properties defined for both themes
  - [ ] prefers-color-scheme media query implemented
  - [ ] localStorage theme persistence works
  - [ ] getTheme() returns 'dawn' or 'pine' based on current theme
  - [ ] setTheme('dawn') switches to light theme
  - [ ] setTheme('pine') switches to dark theme
  - [ ] detectSystemTheme() returns system preference

  **QA Scenarios (MANDATORY)**:
  ```
  Scenario: Theme utilities work correctly (TDD)
    Tool: Bash (npm test)
    Preconditions: Vitest configured, test file created
    Steps:
      1. Write test: expect(getTheme()).toBe('pine') // default
      2. Write test: setTheme('dawn'); expect(getTheme()).toBe('dawn')
      3. Write test: localStorage.getItem('theme') === 'dawn' after setTheme
      4. npm run test
    Expected Result: All tests pass
    Failure Indicators: Tests fail, functions not working as expected
    Evidence: .sisyphus/evidence/task-4-theme-tests.txt
  
  Scenario: CSS custom properties applied correctly
    Tool: Bash (curl + grep)
    Preconditions: Dev server running
    Steps:
      1. curl -s http://localhost:3000 > page.html
      2. grep -c "rp-base" page.html
      3. grep -c "rp-dawn-base" page.html
      4. grep -c "rp-pine-base" page.html
    Expected Result: All counts > 0, variables defined
    Failure Indicators: Variables not found in CSS
    Evidence: .sisyphus/evidence/task-4-css-vars.txt
  
  Scenario: prefers-color-scheme detection works
    Tool: Bash (curl)
    Preconditions: Dev server running
    Steps:
      1. curl -s http://localhost:3000 | grep -c "prefers-color-scheme"
    Expected Result: Count > 0, media query present
    Failure Indicators: No media query found
    Evidence: .sisyphus/evidence/task-4-media-query.txt
  ```

  **Commit**: YES
  - Message: `feat: add Rose Pine theme system with auto-switching`
  - Files: tailwind.config.ts, app/globals.css, lib/theme.ts, lib/__tests__/theme.test.ts
  - Pre-commit: `npm run test`

- [ ] 5. **Set Up Testing Infrastructure**

  **What to do**:
  - Configure Vitest with React Testing Library
  - Create test utilities file (render, custom matchers)
  - Set up coverage reporting (target: 80%+)
  - Add test scripts to package.json
  - Create example component test to verify setup
  - Configure CI-friendly test output
  
  **Must NOT do**:
  - Write E2E tests (Playwright/Cypress)
  - Set up visual regression testing
  - Over-engineer test utilities beyond basic needs
  - Create tests for components not yet built

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Standard testing infrastructure setup
  - **Skills**: []
    - No special skills needed for basic Vitest setup
  - **Skills Evaluated but Omitted**:
    - `playwright`: E2E testing not in scope

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 4)
  - **Parallel Group**: Wave 2 (with Task 4)
  - **Blocks**: Tasks 6-13 (all components need tests)
  - **Blocked By**: Task 3 (project setup)

  **References** (CRICAL - Be Exhaustive):
  **External References**:
  - Vitest docs: https://vitest.dev/guide/
  - React Testing Library: https://testing-library.com/docs/react-testing-library/intro/
  - Vitest coverage: https://vitest.dev/guide/coverage.html
  
  **WHY Each Reference Matters**:
  - Vitest docs: Configuration options and best practices
  - RTL docs: Query methods and testing patterns
  - Coverage docs: Set up coverage thresholds

  **Acceptance Criteria**:
  - [ ] Vitest configured with jsdom environment
  - [ ] React Testing Library configured
  - [ ] Test utilities file created (lib/test-utils.tsx)
  - [ ] Coverage reporting configured with 80% threshold
  - [ ] Example test passes: echo 'test("example", () => expect(1).toBe(1))' | npm test
  - [ ] `npm run test:coverage` generates coverage report
  - [ ] CI-friendly test output configured

  **QA Scenarios (MANDATORY)**:
  ```
  Scenario: Vitest runs successfully
    Tool: Bash
    Preconditions: Vitest installed
    Steps:
      1. npm run test
    Expected Result: Exit code 0, tests run successfully
    Failure Indicators: Configuration errors, missing dependencies
    Evidence: .sisyphus/evidence/task-5-vitest-run.txt
  
  Scenario: React Testing Library works
    Tool: Bash
    Preconditions: RTL installed
    Steps:
      1. Create test: render(<div>Test</div>); screen.getByText('Test')
      2. npm run test
    Expected Result: Test passes, element found
    Failure Indicators: RTL not configured, jsdom not working
    Evidence: .sisyphus/evidence/task-5-rtl-works.txt
  
  Scenario: Coverage reporting works
    Tool: Bash
    Preconditions: Coverage configured
    Steps:
      1. npm run test:coverage
      2. ls -la coverage/
    Expected Result: Coverage directory created, report generated
    Failure Indicators: Coverage tool not configured
    Evidence: .sisyphus/evidence/task-5-coverage.txt
  ```

  **Commit**: YES
  - Message: `test: set up Vitest with React Testing Library and coverage`
  - Files: vitest.config.ts, lib/test-utils.tsx, package.json
  - Pre-commit: `npm run test`

### Wave 3: Core Sections (8 tasks, parallel after Wave 2)

- [ ] 6. **Build Hero Section with 3D Accent**

  **What to do**:
  - TDD: Write tests for hero component first (renders title, subtitle, CTA buttons)
  - Create Hero component with name, title, bio from profile.json
  - Add floating 3D geometric shape using React Three Fiber
  - Implement CSS gradient fallback for WebGL-disabled browsers
  - Add scroll indicator animation
  - Style with Rose Pine colors and Japanese design principles (generous spacing)
  
  **Must NOT do**:
  - Add multiple 3D elements (ONE floating shape only)
  - Create complex 3D interactions (no click/drag)
  - Add parallax effects
  - Over-engineer animations beyond fade-in

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Complex UI with 3D integration and animations
  - **Skills**: [`frontend-ui-ux`, `ui-ux-pro-max`]
    - `frontend-ui-ux`: Japanese-inspired design implementation
    - `ui-ux-pro-max`: High-quality UI component with proper spacing and typography
  - **Skills Evaluated but Omitted**:
    - `3d-web-experience`: Using minimal R3F, not full 3D scene

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 7-13)
  - **Blocks**: Task 14 (scroll reveal animations)
  - **Blocked By**: Tasks 2 (assets), 4 (theme system)

  **References** (CRITICAL - Be Exhaustive):
  **Pattern References**:
  - `data/profile.json:1-14` - Profile data structure (name, title, bio, avatar)
  - `app/layout.tsx:1-34` - Existing layout structure
  
  **External References**:
  - R3F docs: https://docs.pmnd.rs/react-three-fiber
  - Drei helpers: https://github.com/pmndrs/drei
  - Motion examples: https://motion.dev/docs
  
  **WHY Each Reference Matters**:
  - profile.json: Extract name, title, bio for hero content
  - layout.tsx: Ensure hero integrates with existing layout
  - R3F docs: Setup Canvas and 3D scene properly
  - Drei: Use Float component for floating animation
  - Motion: Fade-in animation on load

  **Acceptance Criteria**:
  - [ ] TDD: Tests written first and passing
  - [ ] Hero renders name, title, bio from profile.json
  - [ ] 3D floating shape renders in hero (or CSS fallback shows)
  - [ ] Scroll indicator animates
  - [ ] Responsive at 320px, 768px, 1024px, 1440px
  - [ ] Uses Rose Pine colors (text, subtle, iris for accents)
  - [ ] Generous spacing (Japanese Ma principle)

  **QA Scenarios (MANDATORY)**:
  ```
  Scenario: Hero section renders with all content
    Tool: Bash (curl + grep)
    Preconditions: Dev server running, profile.json populated
    Steps:
      1. curl -s http://localhost:3000 | grep -c "Brian Valencia"
      2. curl -s http://localhost:3000 | grep -c "Full-Stack Software Engineer"
      3. curl -s http://localhost:3000 | grep -c "hero-section"
    Expected Result: All counts > 0, content present
    Failure Indicators: Name or title missing, hero section not found
    Evidence: .sisyphus/evidence/task-6-hero-content.txt
  
  Scenario: 3D element renders or fallback shows
    Tool: Playwright
    Preconditions: Browser with WebGL enabled/disabled
    Steps:
      1. Navigate to http://localhost:3000
      2. Check for canvas element (WebGL) OR gradient div (fallback)
      3. Screenshot hero section
    Expected Result: Either 3D canvas or CSS gradient visible
    Failure Indicators: Neither 3D nor fallback present
    Evidence: .sisyphus/evidence/task-6-3d-or-fallback.png
  
  Scenario: Responsive at all breakpoints
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Set viewport to 320px, screenshot
      2. Set viewport to 768px, screenshot
      3. Set viewport to 1440px, screenshot
      4. Verify no horizontal overflow
    Expected Result: No overflow, content readable at all sizes
    Failure Indicators: Horizontal scroll, text cut off
    Evidence: .sisyphus/evidence/task-6-responsive-{size}.png
  ```

  **Commit**: YES
  - Message: `feat(hero): add hero section with floating 3D accent`
  - Files: app/components/hero.tsx, app/components/__tests__/hero.test.tsx, app/components/3d/floating-shape.tsx
  - Pre-commit: `npm run test`

- [ ] 7. **Build Navigation Component**

  **What to do**:
  - TDD: Write tests for navigation (renders links, mobile menu toggle)
  - Create sticky navigation with section links
  - Implement mobile hamburger menu with slide-out drawer
  - Add smooth scroll to sections on link click
  - Highlight active section based on scroll position
  - Style with Rose Pine colors
  
  **Must NOT do**:
  - Add page transitions
  - Create complex animations beyond smooth scroll
  - Add dropdown submenus

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Interactive navigation with scroll behavior
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Navigation UX patterns and accessibility
  - **Skills Evaluated but Omitted**:
    - `ui-ux-pro-max`: Standard navigation, not complex UI

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 6, 8-13)
  - **Blocks**: None (navigation is independent)
  - **Blocked By**: Task 4 (theme system)

  **References** (CRITICAL - Be Exhaustive):
  **Pattern References**:
  - `app/layout.tsx:1-34` - Where navigation will be added
  
  **External References**:
  - Smooth scroll: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
  - Intersection Observer: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
  
  **WHY Each Reference Matters**:
  - layout.tsx: Navigation placement in app structure
  - scrollIntoView: Smooth scroll implementation
  - Intersection Observer: Detect active section

  **Acceptance Criteria**:
  - [ ] TDD: Tests written first and passing
  - [ ] Navigation links to all 6 sections
  - [ ] Mobile hamburger menu toggles drawer
  - [ ] Smooth scroll on link click
  - [ ] Active section highlighted
  - [ ] Sticky positioning works
  - [ ] Keyboard accessible (Tab navigation)

  **QA Scenarios (MANDATORY)**:
  ```
  Scenario: Navigation links scroll to correct sections
    Tool: Playwright
    Preconditions: All sections built
    Steps:
      1. Click "Projects" nav link
      2. Verify window.scrollY changed
      3. Verify projects section visible in viewport
      4. Repeat for all sections
    Expected Result: Each link scrolls to correct section
    Failure Indicators: Wrong section, no scroll, link broken
    Evidence: .sisyphus/evidence/task-7-nav-scroll.txt
  
  Scenario: Mobile menu toggles correctly
    Tool: Playwright
    Preconditions: Viewport < 768px
    Steps:
      1. Set viewport to 375px
      2. Click hamburger button
      3. Verify drawer slides in
      4. Click nav link in drawer
      5. Verify drawer closes and scrolls
    Expected Result: Drawer opens/closes, navigation works
    Failure Indicators: Drawer doesn't open, doesn't close
    Evidence: .sisyphus/evidence/task-7-mobile-menu.png
  ```

  **Commit**: YES
  - Message: `feat(nav): add sticky navigation with mobile menu`
  - Files: app/components/navigation.tsx, app/components/__tests__/navigation.test.tsx
  - Pre-commit: `npm run test`

- [ ] 8. **Build Theme Toggle Component**

  **What to do**:
  - TDD: Write tests for toggle (renders, switches theme, persists)
  - Create toggle button with sun/moon icons
  - Integrate with theme utilities from Task 4
  - Add smooth transition animation between themes
  - Persist preference in localStorage
  - Position in navigation bar
  
  **Must NOT do**:
  - Add third theme option (Moon variant)
  - Create complex transition animations
  - Over-engineer beyond simple toggle

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple interactive component with clear requirements
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Accessible toggle button design
  - **Skills Evaluated but Omitted**:
    - None needed

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 6-7, 9-13)
  - **Blocks**: None
  - **Blocked By**: Task 4 (theme system)

  **References** (CRITICAL - Be Exhaustive):
  **Pattern References**:
  - `lib/theme.ts` - Theme utilities to integrate
  
  **External References**:
  - Accessible toggle: https://www.w3.org/WAI/tutorials/forms/switch/
  
  **WHY Each Reference Matters**:
  - theme.ts: getTheme(), setTheme() functions to use
  - WAI tutorial: Accessible button patterns

  **Acceptance Criteria**:
  - [ ] TDD: Tests written first and passing
  - [ ] Toggle button renders in navigation
  - [ ] Clicking toggles between dawn and pine themes
  - [ ] Theme persists in localStorage
  - [ ] Theme persists across page reloads
  - [ ] Sun icon shows in dark mode, moon in light mode
  - [ ] Keyboard accessible (Enter/Space)

  **QA Scenarios (MANDATORY)**:
  ```
  Scenario: Theme toggle switches themes correctly
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Get initial theme from localStorage
      2. Click toggle button
      3. Verify theme changed in localStorage
      4. Verify CSS custom properties changed
      5. Reload page
      6. Verify theme persisted
    Expected Result: Theme switches and persists
    Failure Indicators: Theme doesn't change, doesn't persist
    Evidence: .sisyphus/evidence/task-8-theme-toggle.txt
  
  Scenario: Toggle is keyboard accessible
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Focus toggle button with Tab
      2. Press Enter
      3. Verify theme changed
      4. Press Space
      5. Verify theme changed back
    Expected Result: Keyboard activation works
    Failure Indicators: Enter/Space don't trigger toggle
    Evidence: .sisyphus/evidence/task-8-keyboard.txt
  ```

  **Commit**: YES
  - Message: `feat(theme): add theme toggle component`
  - Files: app/components/theme-toggle.tsx, app/components/__tests__/theme-toggle.test.tsx
  - Pre-commit: `npm run test`

- [ ] 9. **Build Projects Section**

  **What to do**:
  - TDD: Write tests for project cards (renders 3 projects, shows metrics)
  - Load projects from projects.json
  - Create grid layout for 3 project cards
  - Display title, description, technologies, metrics
  - Add hover lift animation
  - Create gallery modal for project images
  - Style with Rose Pine colors
  
  **Must NOT do**:
  - Add project filtering
  - Show more than 3 projects
  - Add complex gallery carousel

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Complex component with data display and interactions
  - **Skills**: [`frontend-ui-ux`, `ui-ux-pro-max`]
    - `frontend-ui-ux`: Card layout and interactions
    - `ui-ux-pro-max`: High-quality project showcase
  - **Skills Evaluated but Omitted**:
    - None

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 6-8, 10-13)
  - **Blocks**: Task 14 (scroll reveal)
  - **Blocked By**: Tasks 2 (images), 4 (theme)

  **References** (CRITICAL - Be Exhaustive):
  **Pattern References**:
  - `data/projects.json:1-107` - Project data structure
  - `lib/data.ts:138-183` - getProjects() function
  
  **WHY Each Reference Matters**:
  - projects.json: Extract project data (title, description, technologies, metrics, gallery)
  - lib/data.ts: Use getProjects() to load data

  **Acceptance Criteria**:
  - [ ] TDD: Tests written first and passing
  - [ ] Exactly 3 project cards render
  - [ ] Each card shows title, description, tech stack, metrics
  - [ ] Hover animation lifts card
  - [ ] Gallery modal opens on click
  - [ ] Modal shows project images from S3
  - [ ] Responsive grid (1 col mobile, 2-3 col desktop)

  **QA Scenarios (MANDATORY)**:
  ```
  Scenario: Projects section renders 3 cards with correct data
    Tool: Bash (curl + grep)
    Preconditions: projects.json populated
    Steps:
      1. curl -s http://localhost:3000 | grep -c "project-card"
      2. curl -s http://localhost:3000 | grep -c "OMNI Platform Suite"
      3. curl -s http://localhost:3000 | grep -c "HRIS"
      4. curl -s http://localhost:3000 | grep -c "ChAI"
    Expected Result: Count of cards = 3, all projects present
    Failure Indicators: Wrong number of cards, missing projects
    Evidence: .sisyphus/evidence/task-9-projects-render.txt
  
  Scenario: Project card hover animation works
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Hover over first project card
      2. Verify transform: translateY applied
      3. Screenshot before and after hover
    Expected Result: Card lifts on hover
    Failure Indicators: No animation, wrong transform
    Evidence: .sisyphus/evidence/task-9-hover-animation.png
  
  Scenario: Gallery modal opens and shows images
    Tool: Playwright
    Preconditions: S3 images accessible
    Steps:
      1. Click first project card
      2. Verify modal opens
      3. Verify images load from S3
      4. Click close button
      5. Verify modal closes
    Expected Result: Modal opens with images, closes properly
    Failure Indicators: Modal doesn't open, images don't load
    Evidence: .sisyphus/evidence/task-9-gallery-modal.png
  ```

  **Commit**: YES
  - Message: `feat(projects): add projects section with gallery modal`
  - Files: app/components/projects.tsx, app/components/__tests__/projects.test.tsx, app/components/project-card.tsx, app/components/project-gallery-modal.tsx
  - Pre-commit: `npm run test`

- [ ] 10. **Build Skills Section** — [Category: visual-engineering] Skills by category from skills.json with staggered tag animations. Depends: Task 4. Blocks: Task 14. Pattern ref: data/skills.json:1-107, lib/data.ts:128-136. Acceptance: Skills grouped by category, stagger animation on scroll, responsive layout. QA: curl grep for skill tags, Playwright scroll test.

- [ ] 11. **Build Experience Timeline** — [Category: visual-engineering] Vertical timeline from experience.json with scroll reveal. Depends: Task 4. Blocks: Task 14. Pattern ref: data/experience.json:1-67. Acceptance: Timeline items render, dates show, scroll animation. QA: curl grep for experience items, Playwright scroll test.

- [ ] 12. **Build Education Section** — [Category: visual-engineering] Education cards from education.json. Depends: Task 4. Blocks: Task 14. Pattern ref: data/education.json:1-12. Acceptance: Degree, institution, highlights render. QA: curl grep for education content.

- [ ] 13. **Build Contact Section** — [Category: quick] Contact info with mailto link, social links, resume external link. Depends: Tasks 2 (resume link), 4. Pattern ref: data/profile.json:1-14, data/socials.json:1-14. Acceptance: Email mailto works, social links work, resume link opens. QA: Click mailto verify email client, click links verify URLs.

### Wave 4: Polish & Optimization (3 tasks, parallel)

- [ ] 14. **Implement Scroll Reveal Animations** — [Category: visual-engineering] Motion scroll animations for all sections with stagger delays, prefers-reduced-motion respect. Depends: Tasks 6-13. Pattern ref: Motion useInView hook. Acceptance: Sections animate on scroll, reduced motion disables. QA: Scroll test with reduced motion on/off.

- [ ] 15. **Mobile Responsive Implementation** — [Category: visual-engineering] Test all breakpoints (320px-2560px), fix layout issues, optimize mobile nav. Depends: Tasks 6-13. Skills: [frontend-ui-ux, ui-ux-pro-max]. Acceptance: No horizontal overflow, nav works on mobile. QA: Playwright viewport tests at all sizes.

- [ ] 16. **Performance Optimization** — [Category: quick] Image optimization, lazy loading, bundle analysis, animation performance audit. Depends: Tasks 6, 9, 14. Skills: [vercel-react-best-practices]. Acceptance: Lighthouse Performance >= 90, bundle < 200KB. QA: Lighthouse CLI audit.

### Wave 5: Final QA (3 tasks, parallel)

- [ ] 17. **Cross-Browser Testing** — [Category: quick] Test in Chrome, Firefox, Safari, Edge, Mobile Safari, Mobile Chrome. Depends: Tasks 14-16. Skills: [playwright]. Acceptance: All browsers pass visual and functional checks. QA: Playwright matrix test.

- [ ] 18. **Accessibility Audit** — [Category: quick] Keyboard navigation, screen reader test, color contrast check, ARIA labels. Depends: Tasks 14-15. Skills: [web-design-guidelines]. Acceptance: Lighthouse Accessibility >= 90, keyboard works. QA: Lighthouse a11y audit, manual keyboard test.

- [ ] 19. **Final Lighthouse Audit** — [Category: quick] Full Lighthouse audit (Performance, Accessibility, Best Practices, SEO). Depends: Tasks 16-18. Skills: [vercel-react-best-practices, web-design-guidelines]. Acceptance: All Lighthouse scores >= 90. QA: Lighthouse CLI full audit.

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Rejection → fix → re-run.

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, curl endpoint, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `tsc --noEmit` + linter + `bun test`. Review all changed files for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names (data/result/item/temp).
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Tests [N pass/N fail] | Files [N clean/N issues] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill if UI)
  Start from clean state. Execute EVERY QA scenario from EVERY task — follow exact steps, capture evidence. Test cross-task integration (features working together, not isolation). Test edge cases: empty state, invalid input, rapid actions. Save to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff (git log/diff). Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance. Detect cross-task contamination: Task N touching Task M's files. Flag unaccounted changes.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

- **Wave 1**: `chore: validate React 19 compatibility and confirm assets` — documentation only
- **Wave 2**: `feat: set up project foundation with theme system and testing` — package.json, tailwind.config, vitest.config, theme files
- **Wave 3**: Group commits by section:
  - `feat(hero): add hero section with 3D accent` — app/components/hero/, tests
  - `feat(nav): add navigation with smooth scroll` — app/components/nav/, tests
  - `feat(theme): add theme toggle component` — app/components/theme-toggle/, tests
  - `feat(projects): add projects section` — app/components/projects/, tests
  - `feat(skills): add skills showcase` — app/components/skills/, tests
  - `feat(experience): add experience timeline` — app/components/experience/, tests
  - `feat(education): add education section` — app/components/education/, tests
  - `feat(contact): add contact section` — app/components/contact/, tests
- **Wave 4**: `feat: add animations, mobile responsive, performance optimizations` — animation utilities, responsive styles
- **Wave 5**: `test: add cross-browser and accessibility testing` — test configurations, reports
- **Final**: `feat: complete portfolio with all sections and QA` — final integration, README update

**Pre-commit Hooks**: Run `npm run lint` and `npm run test` before each commit

---

## Success Criteria

### Verification Commands
```bash
# All sections render
curl -s http://localhost:3000 | grep -c "hero-section" # Returns 1
curl -s http://localhost:3000 | grep -c "projects-section" # Returns 1
curl -s http://localhost:3000 | grep -c "skills-section" # Returns 1
curl -s http://localhost:3000 | grep -c "experience-section" # Returns 1
curl -s http://localhost:3000 | grep -c "education-section" # Returns 1
curl -s http://localhost:3000 | grep -c "contact-section" # Returns 1

# Theme system works
localStorage.getItem('theme') # Returns 'dawn' or 'pine'

# Performance targets met
npx lighthouse http://localhost:3000 --output=json --quiet | jq '.categories.performance.score' # >= 0.9
npx lighthouse http://localhost:3000 --output=json --quiet | jq '.categories.accessibility.score' # >= 0.9
npx lighthouse http://localhost:3000 --output=json --quiet | jq '.categories["best-practices"].score' # >= 0.9
npx lighthouse http://localhost:3000 --output=json --quiet | jq '.categories.seo.score' # >= 0.9

# Bundle size within budget
npm run build && du -h .next/static/chunks/*.js | awk '{sum+=$1} END {print sum}' # < 200KB

# Tests pass
npm run test -- --coverage # All tests pass, coverage > 80%

# Accessibility
curl -s http://localhost:3000 | grep -c "prefers-reduced-motion" # Returns count > 0
```

### Final Checklist
- [ ] All "Must Have" features present and functional
- [ ] All "Must NOT Have" features absent from codebase
- [ ] All tests pass with >80% coverage
- [ ] All Lighthouse scores >= 90
- [ ] No TypeScript errors (`tsc --noEmit`)
- [ ] No linting errors (`npm run lint`)
- [ ] Mobile responsive at all breakpoints (320px, 768px, 1024px, 1440px, 2560px)
- [ ] Theme persists across page reloads
- [ ] All navigation links scroll to correct sections
- [ ] Resume download works
- [ ] prefers-reduced-motion respected
- [ ] 3D element renders or CSS fallback shows
- [ ] No console errors in browser
- [ ] All images have alt text
- [ ] Keyboard navigation works
