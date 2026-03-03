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

