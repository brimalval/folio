# Graph Report - .  (2026-05-25)

## Corpus Check
- Corpus is ~20,072 words - fits in a single context window. You may not need a graph.

## Summary
- 500 nodes · 604 edges · 56 communities (30 shown, 26 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 48 edges (avg confidence: 0.85)
- Token cost: 17,600 input · 3,850 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Project & Experience Data|Project & Experience Data]]
- [[_COMMUNITY_AIAgentation Integration|AI/Agentation Integration]]
- [[_COMMUNITY_Hero & Visual Effects|Hero & Visual Effects]]
- [[_COMMUNITY_Experience Section|Experience Section]]
- [[_COMMUNITY_Dev Dependencies|Dev Dependencies]]
- [[_COMMUNITY_Navigation & Core UI|Navigation & Core UI]]
- [[_COMMUNITY_E2E Portfolio QA|E2E Portfolio QA]]
- [[_COMMUNITY_Component Unit Tests|Component Unit Tests]]
- [[_COMMUNITY_Animation Variants|Animation Variants]]
- [[_COMMUNITY_Active Section Tracking|Active Section Tracking]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_Section Orchestration|Section Orchestration]]
- [[_COMMUNITY_Projects Gallery|Projects Gallery]]
- [[_COMMUNITY_Profile Data|Profile Data]]
- [[_COMMUNITY_Test Suite Functions|Test Suite Functions]]
- [[_COMMUNITY_Runtime Dependencies|Runtime Dependencies]]
- [[_COMMUNITY_WebGL Performance Tests|WebGL Performance Tests]]
- [[_COMMUNITY_E2E Final QA|E2E Final QA]]
- [[_COMMUNITY_Experience About Data|Experience About Data]]
- [[_COMMUNITY_App Shell & Layout|App Shell & Layout]]
- [[_COMMUNITY_Skills Lock Config|Skills Lock Config]]
- [[_COMMUNITY_Project Cards E2E|Project Cards E2E]]
- [[_COMMUNITY_Build Configuration|Build Configuration]]
- [[_COMMUNITY_Skills Data|Skills Data]]
- [[_COMMUNITY_Scroll Control|Scroll Control]]
- [[_COMMUNITY_Scroll Observation Hooks|Scroll Observation Hooks]]
- [[_COMMUNITY_Next Config Internals|Next Config Internals]]
- [[_COMMUNITY_WebGL FPS Concept|WebGL FPS Concept]]
- [[_COMMUNITY_Full Flow E2E|Full Flow E2E]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]
- [[_COMMUNITY_Accessibility Motion|Accessibility Motion]]
- [[_COMMUNITY_Project Summaries Cache|Project Summaries Cache]]
- [[_COMMUNITY_Skills Homepage Cache|Skills Homepage Cache]]
- [[_COMMUNITY_Experience Cache|Experience Cache]]
- [[_COMMUNITY_Projects Cache|Projects Cache]]
- [[_COMMUNITY_Project Cache|Project Cache]]
- [[_COMMUNITY_ESLint Config Object|ESLint Config Object]]
- [[_COMMUNITY_Skills Lock Root|Skills Lock Root]]
- [[_COMMUNITY_Hero Animation Variants|Hero Animation Variants]]
- [[_COMMUNITY_About Animation Variants|About Animation Variants]]
- [[_COMMUNITY_Project Animation Variants|Project Animation Variants]]
- [[_COMMUNITY_Skills Animation Variants|Skills Animation Variants]]
- [[_COMMUNITY_Experience Animation Variants|Experience Animation Variants]]
- [[_COMMUNITY_Contact Animation Variants|Contact Animation Variants]]
- [[_COMMUNITY_Fade In Up Animation|Fade In Up Animation]]
- [[_COMMUNITY_Stagger Delay Utility|Stagger Delay Utility]]
- [[_COMMUNITY_Viewport Config|Viewport Config]]
- [[_COMMUNITY_Scroll Lock Check|Scroll Lock Check]]
- [[_COMMUNITY_Globe Icon|Globe Icon]]
- [[_COMMUNITY_File Icon|File Icon]]
- [[_COMMUNITY_Window Icon|Window Icon]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `Project` - 13 edges
3. `Projects()` - 9 edges
4. `Test Utilities (render/screen wrappers)` - 8 edges
5. `scripts` - 6 edges
6. `ProjectDetail()` - 6 edges
7. `Navigation()` - 6 edges
8. `viewportConfig` - 6 edges
9. `overview` - 5 edges
10. `ProjectsPage()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Agentation MCP Server for Annotation Syncing` --conceptually_related_to--> `Model Context Protocol (MCP)`  [INFERRED]
  .agents/skills/agentation/SKILL.md → data/projects.json
- `useScrollReveal Hook Test Suite` --conceptually_related_to--> `Next.js Application Framework`  [INFERRED]
  lib/hooks/__tests__/useScrollReveal.test.tsx → README.md
- `Projects Page E2E Tests` --references--> `Bunpro MCP Server`  [EXTRACTED]
  e2e/projects-page.spec.ts → content/projects/bunpro-mcp.mdx
- `Final QA E2E Tests` --references--> `Bunpro MCP Server`  [INFERRED]
  e2e/final-qa.spec.ts → content/projects/bunpro-mcp.mdx
- `Project Cards E2E Tests` --references--> `Bunpro MCP Server`  [EXTRACTED]
  e2e/project-cards.spec.ts → content/projects/bunpro-mcp.mdx

## Hyperedges (group relationships)
- **Portfolio Site Data Sources** — data_profile_brian_valencia, data_experience_focus_global, data_projects_omni_platform, data_skills_homepage, data_socials [INFERRED 0.95]
- **Testing Infrastructure (Vitest + Playwright + test-utils)** — folio_vitest_config, folio_playwright_config, folio_test_utils [INFERRED 0.95]
- **Next.js Build Toolchain (next.config + postcss + tsconfig + eslint)** — folio_next_config, folio_postcss_config, folio_tsconfig, folio_eslint_config [INFERRED 0.95]
- **Portfolio Page Sections (Hero, About, Projects, Skills, Experience, Contact)** — components_hero_hero, components_about_about, components_projects_projects, components_skills_skills, components_experience_experiencesection, components_contact_contact [INFERRED 0.95]
- **Components Using GlassSurface for Glassmorphism** — components_hero_hero, components_navigation_navigation, concept_glassmorphism_pattern [EXTRACTED 1.00]
- **Project Card + Modal Pattern (Projects page and standalone page)** — components_projects_projects, projects_page_projectspage, components_project_detail_projectdetail [EXTRACTED 1.00]
- **All Component Tests Use Shared Test Utilities** — app_components___tests___skills_test_skillstest, app_components___tests___hero_test_herotest, app_components___tests___about_test_abouttest, app_components___tests___contact_test_contacttest, app_components___tests___experience_test_experiencetest, app_components___tests___navigation_test_navigationtest, app_components___tests___project_detail_test_projectdetailtest [EXTRACTED 1.00]
- **React-Cached Data Loader Functions** — lib_async_data_getprojectsummaries, lib_async_data_getskillsforhomepage, lib_async_data_getexperienceforabout, lib_async_data_getprojects, lib_async_data_getproject [EXTRACTED 1.00]
- **Per-Section Framer Motion Variant Objects** — lib_animations_variants_herovariants, lib_animations_variants_aboutvariants, lib_animations_variants_projectvariants, lib_animations_variants_skillsvariants, lib_animations_variants_experiencevariants, lib_animations_variants_contactvariants [EXTRACTED 1.00]
- **Project Card Expand/Close Modal E2E Tests** — e2e_portfolio_qa_spec, e2e_final_qa_spec, e2e_full_flow_spec, e2e_project_cards_spec [EXTRACTED 1.00]
- **Theme Toggle Dark/Light Mode E2E Tests** — e2e_portfolio_qa_spec, e2e_final_qa_spec [EXTRACTED 1.00]
- **Bunpro MCP Project Card Tests Across Specs** — e2e_projects_page_spec, e2e_project_cards_spec [EXTRACTED 1.00]

## Communities (56 total, 26 thin omitted)

### Community 0 - "Project & Experience Data"
Cohesion: 0.08
Nodes (31): ProjectDetailProps, experienceData, getExperienceForAbout, getProject, getProjects, getProjectSummaries, getSkillsForHomepage, projectsData (+23 more)

### Community 1 - "AI/Agentation Integration"
Cohesion: 0.07
Nodes (35): Agentation Visual Feedback Toolbar Skill, Home(), Agentation MCP Server for Annotation Syncing, Intersection Observer API, Model Context Protocol (MCP), Next.js Application Framework, Personal Portfolio Website, Project Card Expandable Modal Pattern (+27 more)

### Community 2 - "Hero & Visual Effects"
Cohesion: 0.07
Nodes (25): heroVariants, GlassSurface, GlassSurfaceProps, Intensity, intensityConfig, GradientFallback(), Hero(), ThreeCanvas (+17 more)

### Community 3 - "Experience Section"
Cohesion: 0.09
Nodes (23): experienceVariants, companyAccents, rewrittenDescriptions, educationSchema, experienceSchema, getEducation(), getExperience(), getFeaturedProjects() (+15 more)

### Community 4 - "Dev Dependencies"
Cohesion: 0.07
Nodes (29): devDependencies, eslint, eslint-config-next, jsdom, lighthouse, @next/bundle-analyzer, playwright, tailwindcss (+21 more)

### Community 5 - "Navigation & Core UI"
Cohesion: 0.14
Nodes (14): Navigation(), navItems, ProjectDetail(), ThemeToggle(), useMediaQuery(), Scroll Lock Pattern, LenisInstanceContext, LenisProvider() (+6 more)

### Community 6 - "E2E Portfolio QA"
Cohesion: 0.08
Nodes (19): aboutSection, BREAKPOINTS, contactSection, EVIDENCE_DIR, experienceSection, githubLink, h1, hamburger (+11 more)

### Community 7 - "Component Unit Tests"
Cohesion: 0.08
Nodes (16): MockIntersectionObserver, grid, section, contactSection, emailLink, githubLink, heading, linkedinLink (+8 more)

### Community 8 - "Animation Variants"
Cohesion: 0.11
Nodes (16): aboutVariants, contactVariants, fadeIn, fadeInUp, projectVariants, reducedMotionVariants, scaleIn, skillsVariants (+8 more)

### Community 9 - "Active Section Tracking"
Cohesion: 0.12
Nodes (21): ActiveSectionState, cleanupObserver(), computeActiveState(), DEFAULT_SECTION_IDS, devGlobals, DevGlobalThis, handleEntries(), incrementDevObserverCount() (+13 more)

### Community 10 - "TypeScript Config"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 11 - "Section Orchestration"
Cohesion: 0.16
Nodes (15): ALL_SECTIONS, SectionBgManager(), Skills(), headerVariants, StickySectionHeader(), StickySectionHeaderProps, useActiveSection(), usePrefersReducedMotion() (+7 more)

### Community 12 - "Projects Gallery"
Cohesion: 0.17
Nodes (13): GitHubLink(), GitHubLinkProps, ExpandAffordance(), MetricBlock(), Projects(), Projects Test Suite, Shared Layout Modal Expand Pattern, bunproCard (+5 more)

### Community 13 - "Profile Data"
Cohesion: 0.12
Nodes (16): about, body, statements, avatar, bio, email, fullPhoto, github (+8 more)

### Community 14 - "Test Suite Functions"
Cohesion: 0.12
Nodes (15): About Component Test Suite, Contact Component Test Suite, Experience Component Test Suite, Hero Component Test Suite, Navigation Component Test Suite, ProjectDetail Component Test Suite, Skills Component Test Suite, Test Setup Verification Tests (+7 more)

### Community 15 - "Runtime Dependencies"
Cohesion: 0.12
Nodes (16): dependencies, agentation, lenis, lucide-react, motion, next, react, react-dom (+8 more)

### Community 16 - "WebGL Performance Tests"
Cohesion: 0.15
Nodes (9): baselineFps, evidence, EVIDENCE_PATH, fps, FrameStats, heroSection, interactiveMeasurementPromise, pointerMovementPromise (+1 more)

### Community 17 - "E2E Final QA"
Cohesion: 0.17
Nodes (10): aboutSection, EVIDENCE_DIR, h1, hamburger, navLink, projectCard, projectDetail, skillsSection (+2 more)

### Community 18 - "Experience About Data"
Cohesion: 0.18
Nodes (10): company, description, overview, brandPortfolio, businessModel, marketLeadership, scale, period (+2 more)

### Community 19 - "App Shell & Layout"
Cohesion: 0.25
Nodes (6): metadata, outfit, RootLayout(), AgentationWrapper(), AgentationLoader, DevAgentation()

### Community 20 - "Skills Lock Config"
Cohesion: 0.29
Nodes (6): computedHash, source, sourceType, skills, agentation, version

### Community 21 - "Project Cards E2E"
Cohesion: 0.40
Nodes (4): bunproCard, bunproTitle, detail, githubLink

### Community 22 - "Build Configuration"
Cohesion: 0.50
Nodes (4): Bundle Analyzer - Performance Monitoring, Optimized Package Imports for 3D/Animation Libraries, Next.js Configuration, TypeScript Configuration

### Community 23 - "Skills Data"
Cohesion: 0.50
Nodes (4): Backend Skills (Python, Flask, FastAPI, Hono.js), DevOps Skills (AWS, SST, CloudFormation), Frontend Skills (TypeScript, NextJS, React, Tailwind, ShadCN, Tanstack), Homepage Skills Display Data

### Community 24 - "Scroll Control"
Cohesion: 0.50
Nodes (4): LenisProvider Context Component, useLenis Hook, lockScroll Function, unlockScroll Function

### Community 25 - "Scroll Observation Hooks"
Cohesion: 0.67
Nodes (3): ActiveSectionState Type, useActiveSection Hook, useScrollReveal Hook

## Knowledge Gaps
- **286 isolated node(s):** `version`, `source`, `sourceType`, `computedHash`, `config` (+281 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Home()` connect `AI/Agentation Integration` to `Navigation & Core UI`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `dependencies` (e.g. with `PostCSS Configuration` and `Playwright E2E Test Configuration`) actually correct?**
  _`dependencies` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `Projects()` (e.g. with `SectionBgManager()` and `ProjectsPage()`) actually correct?**
  _`Projects()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `version`, `source`, `sourceType` to the rest of the system?**
  _289 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Project & Experience Data` be split into smaller, more focused modules?**
  _Cohesion score 0.07807807807807808 - nodes in this community are weakly interconnected._
- **Should `AI/Agentation Integration` be split into smaller, more focused modules?**
  _Cohesion score 0.06890756302521009 - nodes in this community are weakly interconnected._
- **Should `Hero & Visual Effects` be split into smaller, more focused modules?**
  _Cohesion score 0.06854838709677419 - nodes in this community are weakly interconnected._